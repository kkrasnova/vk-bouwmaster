import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { translateText, detectSourceLanguage } from '@/lib/translate'
import { Language } from '@/lib/translations'

type Comment = {
  id: string
  projectId: string
  name: string
  surname?: string
  message: string
  createdAt: string
  approved: boolean
  photos?: string[]
  videos?: string[]
  rating?: number
  city?: string
  profileImage?: string
  translations?: Record<string, string> // Переводы сообщения на разные языки
}

const COMMENTS_FILE = join(process.cwd(), 'src/lib/comments-data.json')

function readComments(): Comment[] {
  try {
    if (!existsSync(COMMENTS_FILE)) return []
    const data = readFileSync(COMMENTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeComments(list: Comment[]) {
  writeFileSync(COMMENTS_FILE, JSON.stringify(list, null, 2), 'utf-8')
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const includeUnapproved = searchParams.get('includeUnapproved') === '1'

    let list = readComments()
    if (projectId) list = list.filter(c => c.projectId === projectId)
    if (!includeUnapproved) list = list.filter(c => c.approved)

    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return NextResponse.json(list)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to read comments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim()
    const surname = String(body.surname || '').trim()
    const message = String(body.message || '').trim()
    const projectId = String(body.projectId || 'general').trim() // Если projectId не указан, используем 'general'
    const city = String(body.city || '').trim()

    if (!name || !message) {
      return NextResponse.json({ error: 'name and message are required' }, { status: 400 })
    }

    const list = readComments()
    const rating = body.rating !== undefined ? Math.max(1, Math.min(5, Number(body.rating))) : undefined
    const profileImage = String(body.profileImage || '').trim()
    
    let translations: Record<string, string> | undefined
    try {
      const sourceLang = detectSourceLanguage(message)
      console.log(`[Comments API] Detected source language: ${sourceLang} for comment message`)
      
      const sourceLangCode = sourceLang === 'ru' ? 'RU' : sourceLang === 'nl' ? 'NL' : sourceLang === 'en' ? 'EN' : 'RU'
      const languages: Language[] = ['RU', 'EN', 'NL', 'DE', 'FR', 'ES', 'IT', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SL', 'ET', 'LV', 'LT', 'FI', 'SV', 'DA', 'NO', 'GR', 'UA']
      
      translations = { [sourceLangCode]: message } // Сохраняем оригинал
      
      for (const lang of languages) {
        if (lang === sourceLangCode) continue // Пропускаем исходный язык
        
        try {
          const translated = await translateText(message, lang, sourceLang)
          translations[lang] = translated
          await new Promise(resolve => setTimeout(resolve, 50))
        } catch (error) {
          console.error(`Error translating comment to ${lang}:`, error)
          translations[lang] = message // В случае ошибки используем оригинал
        }
      }
    } catch (translationError) {
      console.error('Translation error:', translationError)
    }
    
    const comment: Comment = {
      id: Date.now().toString(),
      projectId,
      name: name.slice(0, 60),
      surname: surname ? surname.slice(0, 80) : undefined,
      message: message.slice(0, 2000),
      createdAt: new Date().toISOString(),
      approved: false, // requires admin approval
      photos: Array.isArray(body.photos) ? body.photos : undefined,
      videos: Array.isArray(body.videos) ? body.videos : undefined,
      rating: rating,
      city: city ? city.slice(0, 100) : undefined,
      profileImage: profileImage || undefined,
      translations: translations || body.translations,
    }
    list.push(comment)
    writeComments(list)
    return NextResponse.json({ success: true, comment })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const body = await request.json()
    const list = readComments()
    const idx = list.findIndex(c => c.id === id)
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    let translations = body.translations || list[idx].translations
    if (body.message !== undefined && body.message !== list[idx].message) {
      try {
        const sourceLang = detectSourceLanguage(body.message)
        console.log(`[Comments API] Detected source language: ${sourceLang} for updated comment message`)
        
        const sourceLangCode = sourceLang === 'ru' ? 'RU' : sourceLang === 'nl' ? 'NL' : sourceLang === 'en' ? 'EN' : 'RU'
        const languages: Language[] = ['RU', 'EN', 'NL', 'DE', 'FR', 'ES', 'IT', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SL', 'ET', 'LV', 'LT', 'FI', 'SV', 'DA', 'NO', 'GR', 'UA']
        
        translations = { [sourceLangCode]: body.message }
        
        for (const lang of languages) {
          if (lang === sourceLangCode) continue
          
          try {
            const translated = await translateText(body.message, lang, sourceLang)
            translations[lang] = translated
            await new Promise(resolve => setTimeout(resolve, 50))
          } catch (error) {
            console.error(`Error translating comment to ${lang}:`, error)
            translations[lang] = body.message
          }
        }
      } catch (translationError) {
        console.error('Translation error:', translationError)
      }
    }
    
    list[idx] = {
      ...list[idx],
      name: body.name !== undefined ? String(body.name).slice(0, 60) : list[idx].name,
      surname: body.surname !== undefined ? String(body.surname).slice(0, 80) : list[idx].surname,
      message: body.message !== undefined ? String(body.message).slice(0, 2000) : list[idx].message,
      approved: body.approved !== undefined ? Boolean(body.approved) : list[idx].approved,
      photos: body.photos !== undefined ? (Array.isArray(body.photos) ? (body.photos.length > 0 ? body.photos : undefined) : list[idx].photos) : list[idx].photos,
      videos: body.videos !== undefined ? (Array.isArray(body.videos) ? (body.videos.length > 0 ? body.videos : undefined) : list[idx].videos) : list[idx].videos,
      rating: body.rating !== undefined ? Math.max(1, Math.min(5, Number(body.rating))) : list[idx].rating,
      city: body.city !== undefined ? (String(body.city).trim() ? String(body.city).slice(0, 100) : undefined) : list[idx].city,
      profileImage: body.profileImage !== undefined ? (String(body.profileImage).trim() ? String(body.profileImage) : undefined) : list[idx].profileImage,
      translations: translations || list[idx].translations,
    }
    writeComments(list)
    return NextResponse.json({ success: true, comment: list[idx] })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const list = readComments()
    const filtered = list.filter(c => c.id !== id)
    writeComments(filtered)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
  }
}



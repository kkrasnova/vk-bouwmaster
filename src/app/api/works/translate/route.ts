import { NextRequest, NextResponse } from 'next/server';
import { translateWork } from '@/lib/translate';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Путь к persistent-хранилищу
const RENDER_DISK_PATH = '/uploads';
const LOCAL_UPLOADS_PATH = join(process.cwd(), 'public', 'uploads');
const FALLBACK_REPO_FILE = join(process.cwd(), 'src', 'lib', 'works-data.json');

const getStorageDir = () => (existsSync(RENDER_DISK_PATH) ? RENDER_DISK_PATH : LOCAL_UPLOADS_PATH);
const getWorksFilePath = () => join(getStorageDir(), 'works-data.json');

function ensureStorageDir() {
  const dir = getStorageDir();
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export interface PortfolioWork {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  category: string;
  projectId?: string;
  images?: string[];
  videos?: string[];
  workDate?: string;
  city?: string;
  translations?: Record<string, {
    title: string;
    description: string;
    category: string;
    city?: string;
  }>;
}

async function readWorksData(): Promise<PortfolioWork[]> {
  try {
    const data = readFileSync(getWorksFilePath(), 'utf-8');
    return JSON.parse(data);
  } catch (primaryError) {
    try {
      const data = readFileSync(FALLBACK_REPO_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      try {
        ensureStorageDir();
        writeFileSync(getWorksFilePath(), JSON.stringify(parsed, null, 2), 'utf-8');
      } catch (seedError) {
        console.warn('Не удалось сохранить seed данных:', seedError);
      }
      return parsed;
    } catch (fallbackError) {
      console.error('Ошибка чтения данных работ:', primaryError, fallbackError);
      return [];
    }
  }
}

async function writeWorksData(data: PortfolioWork[]): Promise<void> {
  try {
    ensureStorageDir();
    writeFileSync(getWorksFilePath(), JSON.stringify(data, null, 2), 'utf-8');
  } catch (error: any) {
    console.error('Ошибка записи данных работ:', error);
    throw new Error(`Не удалось сохранить данные: ${error.message || 'Неизвестная ошибка'}`);
  }
}

// POST /api/works/translate - принудительный перевод всех работ или конкретной работы
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workId = searchParams.get('workId'); // Опционально: перевести только одну работу
    const force = searchParams.get('force') === 'true'; // Принудительно перевести даже если переводы есть
    
    const works = await readWorksData();
    
    if (workId) {
      // Переводим только одну работу
      const index = works.findIndex(w => w.id === workId);
      if (index === -1) {
        return NextResponse.json(
          { error: 'Работа не найдена' },
          { status: 404 }
        );
      }
      
      const work = works[index];
      console.log(`[Translate API] 🔄 Translating work ${workId}: "${work.title.substring(0, 30)}..."`);
      
      try {
        const translations = await translateWork({
          title: work.title,
          description: work.description || '',
          category: work.category,
          city: work.city
        });
        
        works[index] = { ...work, translations };
        await writeWorksData(works);
        
        console.log(`[Translate API] ✅ Successfully translated work ${workId}`);
        return NextResponse.json({ 
          success: true, 
          message: `Переводы для работы ${workId} обновлены`,
          work: works[index]
        });
      } catch (error: any) {
        console.error(`[Translate API] ❌ Error translating work ${workId}:`, error);
        return NextResponse.json(
          { error: `Ошибка перевода: ${error.message || 'Неизвестная ошибка'}` },
          { status: 500 }
        );
      }
    } else {
      // Переводим все работы
      let translatedCount = 0;
      let errorCount = 0;
      
      console.log(`[Translate API] 🔄 Starting translation of ${works.length} works (force=${force})...`);
      
      for (let i = 0; i < works.length; i++) {
        const work = works[i];
        
        // Если force=false, пропускаем работы с полными переводами
        if (!force && work.translations && Object.keys(work.translations).length >= 5) {
          const hasAllFields = Object.values(work.translations).every(
            t => t && t.title && t.description && t.category
          );
          if (hasAllFields) {
            console.log(`[Translate API] ⏭️ Skipping work ${work.id} (already translated)`);
            continue;
          }
        }
        
        try {
          console.log(`[Translate API] 🔄 Translating work ${i + 1}/${works.length}: "${work.title.substring(0, 30)}..."`);
          const translations = await translateWork({
            title: work.title,
            description: work.description || '',
            category: work.category,
            city: work.city
          });
          
          works[i] = { ...work, translations };
          translatedCount++;
          
          // Задержка между переводами
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error: any) {
          console.error(`[Translate API] ❌ Error translating work ${work.id}:`, error.message || error);
          errorCount++;
        }
      }
      
      if (translatedCount > 0) {
        await writeWorksData(works);
        console.log(`[Translate API] ✅ Saved ${translatedCount} translated works`);
      }
      
      return NextResponse.json({
        success: true,
        message: `Переведено работ: ${translatedCount}, ошибок: ${errorCount}`,
        translated: translatedCount,
        errors: errorCount,
        total: works.length
      });
    }
  } catch (error: any) {
    console.error('[Translate API] ❌ Fatal error:', error);
    return NextResponse.json(
      { error: `Критическая ошибка: ${error.message || 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}

// GET /api/works/translate - получить статус переводов
export async function GET(request: NextRequest) {
  try {
    const works = await readWorksData();
    
    const stats = {
      total: works.length,
      withTranslations: 0,
      withoutTranslations: 0,
      incompleteTranslations: 0,
      works: works.map(work => ({
        id: work.id,
        title: work.title.substring(0, 50),
        hasTranslations: !!work.translations,
        translationCount: work.translations ? Object.keys(work.translations).length : 0,
        languages: work.translations ? Object.keys(work.translations) : []
      }))
    };
    
    works.forEach(work => {
      if (!work.translations || Object.keys(work.translations).length === 0) {
        stats.withoutTranslations++;
      } else if (Object.keys(work.translations).length < 5) {
        stats.incompleteTranslations++;
      } else {
        stats.withTranslations++;
      }
    });
    
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('[Translate API] ❌ Error getting translation stats:', error);
    return NextResponse.json(
      { error: `Ошибка получения статистики: ${error.message || 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}


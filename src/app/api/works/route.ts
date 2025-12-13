import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { translateWork } from '@/lib/translate';

const RENDER_DISK_PATH = '/uploads';
const LOCAL_UPLOADS_PATH = join(process.cwd(), 'public', 'uploads');
const FALLBACK_REPO_FILE = join(process.cwd(), 'src', 'lib', 'works-data.json');

const getStorageDir = () => (existsSync(RENDER_DISK_PATH) ? RENDER_DISK_PATH : LOCAL_UPLOADS_PATH);
const getWorksFilePath = () => join(getStorageDir(), 'works-data.json');
const hasRenderDisk = () => existsSync(RENDER_DISK_PATH);

function ensureStorageDir() {
  const dir = getStorageDir();
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function normalizeFileUrl(url: string | undefined, renderDisk: boolean): string | undefined {
  if (!url) return url;
  if (renderDisk && url.startsWith('/uploads/')) {
    const fileName = url.split('/').pop();
    if (fileName) {
      return `/api/uploads/${fileName}`;
    }
  }
  return url;
}

function normalizeWorkFiles(work: PortfolioWork, renderDisk: boolean): PortfolioWork {
  const normalizedMain = normalizeFileUrl(work.mainImage, renderDisk) || work.mainImage;
  const normalizedImages = (work.images || []).map(img => normalizeFileUrl(img, renderDisk) || img);
  const normalizedVideos = (work.videos || []).map(vid => normalizeFileUrl(vid, renderDisk) || vid);
  return {
    ...work,
    mainImage: normalizedMain,
    images: normalizedImages,
    videos: normalizedVideos,
  };
}

const EXPECTED_LANGUAGES = ['RU', 'EN', 'NL', 'DE', 'FR', 'ES', 'IT', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SL', 'ET', 'LV', 'LT', 'FI', 'SV', 'DA', 'NO', 'GR', 'UA'];

function needsTranslation(work: PortfolioWork): boolean {
  const translations = work.translations;
  if (!translations || Object.keys(translations).length === 0) return true;
  
  const missingLanguages = EXPECTED_LANGUAGES.filter(lang => !translations[lang]);
  if (missingLanguages.length > 0) {
    console.log(`[needsTranslation] Work ${work.id} missing translations for: ${missingLanguages.join(', ')}`);
    return true;
  }
  
  const hasEmptyTranslations = Object.values(translations).some(
    (t) => !t || !t.title || !t.description || !t.category || t.title.trim() === '' || t.description.trim() === ''
  );
  if (hasEmptyTranslations) {
    console.log(`[needsTranslation] Work ${work.id} has empty translations`);
    return true;
  }
  
  return false;
}

export interface WorkTranslations {
  title: string;
  description: string;
  category: string;
  city?: string;
}

export interface PortfolioWork {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  category: string;
  projectId?: string;
  images?: string[];
  videos?: string[]; // optional list of video urls per work
  workDate?: string;
  city?: string; // Город, где была выполнена работа
  translations?: Record<string, WorkTranslations>;
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
        console.warn('Не удалось сохранить seed данных в основное хранилище:', seedError);
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
    console.error('Error writing works data:', error);
    if (error.code === 'EACCES' || error.code === 'EROFS' || error.message?.includes('read-only')) {
      throw new Error(
        'Файловая система доступна только для чтения. Для сохранения работ нужен Render Disk (mount: /uploads).'
      );
    }
    throw new Error(`Ошибка записи данных: ${error.message || 'Неизвестная ошибка'}`);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const category = searchParams.get('category');
    const translateAll = searchParams.get('translateAll') === 'true';
    const renderDisk = hasRenderDisk();

    let works = await readWorksData();
    works = works.map(w => ({ ...w, videos: [] }));
    let normalized = false;
    works = works.map(work => {
      const normalizedWork = normalizeWorkFiles(work, renderDisk);
      if (
        normalizedWork.mainImage !== work.mainImage ||
        normalizedWork.images !== work.images ||
        normalizedWork.videos !== work.videos
      ) {
        normalized = true;
      }
      return normalizedWork;
    });

    let translationsAdded = false;
    const worksNeedingTranslation = works.filter(w => needsTranslation(w));
    console.log(`[Works API] Found ${worksNeedingTranslation.length} works needing translation out of ${works.length} total`);
    
    if (worksNeedingTranslation.length > 0) {
      for (let i = 0; i < worksNeedingTranslation.length; i++) {
        const work = worksNeedingTranslation[i];
        const index = works.findIndex(w => w.id === work.id);
        if (index !== -1) {
        try {
            console.log(`[Works API] 🔄 Translating work ${i + 1}/${worksNeedingTranslation.length}: "${work.title.substring(0, 30)}..."`);
          const translations = await translateWork({
            title: work.title,
            description: work.description || '',
            category: work.category,
            city: work.city
          });
            works[index] = { ...work, translations };
          translationsAdded = true;
            console.log(`[Works API] ✅ Translation completed for work ${work.id}. Languages:`, Object.keys(translations || {}).length);
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error: any) {
          console.error(`[Works API] ❌ Error translating work ${work.id}:`, error.message || error);
          }
        }
      }
    }
    
    if (translationsAdded) {
      console.log(`[Works API] 💾 Saving ${works.length} works with new translations...`);
      await writeWorksData(works);
      console.log(`[Works API] ✅ Works saved successfully with translations`);
    }

    if (translateAll) {
      let updated = false;
      for (let i = 0; i < works.length; i++) {
        const work = works[i];
        if (needsTranslation(work)) {
          try {
            const translations = await translateWork({
              title: work.title,
              description: work.description || '',
              category: work.category,
              city: work.city
            });
            works[i] = { ...work, translations };
            updated = true;
            await new Promise(resolve => setTimeout(resolve, 50));
          } catch (error) {
            console.error(`Error translating work ${work.id}:`, error);
          }
        }
      }
      if (updated) {
        translationsAdded = true;
      }
    }

    if (projectId) {
      works = works.filter(work => work.projectId === projectId);
    }

    if (category) {
      works = works.filter(work => work.category === category);
    }

    if (translationsAdded) {
      console.log(`[Works API] 💾 Saving ${works.length} works with new translations`);
      await writeWorksData(works);
      console.log(`[Works API] ✅ Works saved successfully`);
    }

    return NextResponse.json(works);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при чтении данных' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const work: PortfolioWork = await request.json();
    const renderDisk = hasRenderDisk();
    work.videos = [];

    console.log('POST /api/works - получена работа:', {
      title: work.title,
      mainImage: work.mainImage,
      images: work.images?.length || 0,
      videos: work.videos?.length || 0,
      category: work.category
    });

    if (!work.title || !work.mainImage || !work.category) {
      return NextResponse.json(
        { error: 'Необходимы: title, mainImage, category' },
        { status: 400 }
      );
    }

    let translations: Record<string, WorkTranslations> | undefined;
    try {
      translations = await translateWork({
        title: work.title,
        description: work.description || '',
        category: work.category,
        city: work.city
      });
    } catch (translationError) {
      console.error('Translation error:', translationError);
    }

    const works = await readWorksData();

    const newWork: PortfolioWork = {
      ...normalizeWorkFiles(work, renderDisk),
      id: work.id || Date.now().toString(),
      projectId: work.projectId || `project-${Date.now()}`,
      workDate: work.workDate || new Date().toISOString().split('T')[0],
      translations: translations || work.translations,
      images: work.images || [],
      videos: []
    };

    console.log('Сохранение работы:', {
      id: newWork.id,
      title: newWork.title,
      images: newWork.images?.length || 0,
      videos: newWork.videos?.length || 0
    });

    works.push(newWork);
    await writeWorksData(works);

    console.log('Работа успешно сохранена. Всего работ:', works.length);

    return NextResponse.json({ success: true, work: newWork });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { error: 'Ошибка при сохранении' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const work: PortfolioWork = await request.json();
    const renderDisk = hasRenderDisk();
    work.videos = [];

    if (!id && !work.id) {
      return NextResponse.json(
        { error: 'Необходим id работы' },
        { status: 400 }
      );
    }

    const workId = id || work.id;
    const works = await readWorksData();
    const index = works.findIndex(w => w.id === workId);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Работа не найдена' },
        { status: 404 }
      );
    }

    const existingWork = works[index];
    const needsRetranslation = 
      work.title !== existingWork.title ||
      work.description !== existingWork.description ||
      work.category !== existingWork.category ||
      work.city !== existingWork.city;

    let translations = existingWork.translations;
    
    if (needsRetranslation && (work.title || work.description || work.category || work.city)) {
      try {
        translations = await translateWork({
          title: work.title || existingWork.title,
          description: work.description || existingWork.description || '',
          category: work.category || existingWork.category,
          city: work.city || existingWork.city
        });
        console.log('Translations updated automatically for work:', workId);
      } catch (translationError) {
        console.error('Translation error:', translationError);
        translations = existingWork.translations;
      }
    }

    works[index] = { 
      ...existingWork, 
      ...normalizeWorkFiles(work, renderDisk), 
      id: workId,
      translations: translations || existingWork.translations,
      videos: [] // отключаем видео
    };
    await writeWorksData(works);

    return NextResponse.json({ success: true, work: works[index] });
  } catch (error: any) {
    console.error('Error in PUT:', error);
    const errorMessage = error.message || 'Ошибка при обновлении';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Необходим id работы' },
        { status: 400 }
      );
    }

    const works = await readWorksData();
    const filteredWorks = works.filter(work => work.id !== id);
    await writeWorksData(filteredWorks);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при удалении' },
      { status: 500 }
    );
  }
}




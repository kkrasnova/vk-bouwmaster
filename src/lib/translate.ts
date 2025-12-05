// Функция для перевода текста через бесплатный API
export async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || text.trim() === '') return text;
  
  // Если уже целевой язык - не переводим
  const langMap: Record<string, string> = {
    'RU': 'ru',
    'EN': 'en',
    'NL': 'nl',
    'DE': 'de',
    'FR': 'fr',
    'ES': 'es',
    'IT': 'it',
    'PT': 'pt',
    'PL': 'pl',
    'CZ': 'cs',
    'HU': 'hu',
    'RO': 'ro',
    'BG': 'bg',
    'HR': 'hr',
    'SK': 'sk',
    'SL': 'sl',
    'ET': 'et',
    'LV': 'lv',
    'LT': 'lt',
    'FI': 'fi',
    'SV': 'sv',
    'DA': 'da',
    'NO': 'no',
    'GR': 'el',
    'UA': 'uk'
  };

  const targetCode = langMap[targetLang] || 'en';
  if (targetCode === 'ru') return text; // Оригинал на русском

  // Ограничение длины для бесплатного API (500 символов за раз)
  const maxLength = 500;
  if (text.length <= maxLength) {
    return await translateChunk(text, targetCode);
  }

  // Разбиваем длинный текст на части
  const chunks: string[] = [];
  let currentChunk = '';
  
  // Разбиваем по предложениям, если возможно
  const sentences = text.split(/(?<=[.!?]\s)/);
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (sentence.length <= maxLength) {
        currentChunk = sentence;
      } else {
        // Если предложение слишком длинное, разбиваем по словам
        const words = sentence.split(' ');
        for (const word of words) {
          if ((currentChunk + word + ' ').length <= maxLength) {
            currentChunk += word + ' ';
          } else {
            if (currentChunk) chunks.push(currentChunk.trim());
            currentChunk = word + ' ';
          }
        }
      }
    }
  }
  
  if (currentChunk) chunks.push(currentChunk.trim());

  // Переводим каждый чанк с небольшой задержкой
  const translatedChunks: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const translated = await translateChunk(chunks[i], targetCode);
    translatedChunks.push(translated);
    // Небольшая задержка между запросами (100ms)
    if (i < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return translatedChunks.join(' ');
}

async function translateChunk(text: string, targetCode: string): Promise<string> {
  try {
    // Используем MyMemory Translation API (бесплатный, до 10000 символов в день)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ru|${targetCode}`
    );

    if (!response.ok) {
      console.warn(`Translation failed for ${targetCode}, returning original text`);
      return text;
    }

    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }

    return text;
  } catch (error) {
    console.error(`Translation error for ${targetCode}:`, error);
    return text;
  }
}

// Функция для перевода всех полей поста на все языки
export async function translateBlogPost(post: {
  title: string;
  excerpt: string;
  content?: string;
  category: string;
}): Promise<Record<string, {
  title: string;
  excerpt: string;
  content?: string;
  category: string;
}>> {
  const languages = ['EN', 'NL', 'DE', 'FR', 'ES', 'IT', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SL', 'ET', 'LV', 'LT', 'FI', 'SV', 'DA', 'NO', 'GR', 'UA'];
  
  const translations: Record<string, {
    title: string;
    excerpt: string;
    content?: string;
    category: string;
  }> = {
    RU: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category
    }
  };

  // Переводим последовательно, чтобы не перегружать API (с задержкой между языками)
  for (const lang of languages) {
    try {
      const [title, excerpt, content, category] = await Promise.all([
        translateText(post.title, lang),
        translateText(post.excerpt, lang),
        post.content ? translateText(post.content, lang) : Promise.resolve(undefined),
        post.category ? translateText(post.category, lang) : Promise.resolve(post.category)
      ]);

      translations[lang] = {
        title,
        excerpt,
        content,
        category: category || post.category
      };
      
      // Небольшая задержка между языками (50ms)
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      console.error(`Error translating to ${lang}:`, error);
      // В случае ошибки используем оригинальный текст
      translations[lang] = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category
      };
    }
  }

  return translations;
}

// Функция для перевода FAQ категории на все языки
export async function translateFAQCategory(category: {
  title: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}): Promise<Record<string, {
  title: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}>> {
  const languages = ['EN', 'NL', 'DE', 'FR', 'ES', 'IT', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SL', 'ET', 'LV', 'LT', 'FI', 'SV', 'DA', 'NO', 'GR', 'UA'];
  
  const translations: Record<string, {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  }> = {
    RU: {
      title: category.title,
      questions: category.questions
    }
  };

  // Переводим последовательно, чтобы не перегружать API
  for (const lang of languages) {
    try {
      const translatedTitle = await translateText(category.title, lang);
      const translatedQuestions = await Promise.all(
        category.questions.map(async (q) => ({
          question: await translateText(q.question, lang),
          answer: await translateText(q.answer, lang)
        }))
      );

      translations[lang] = {
        title: translatedTitle,
        questions: translatedQuestions
      };
      
      // Небольшая задержка между языками (50ms)
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      console.error(`Error translating FAQ category to ${lang}:`, error);
      // В случае ошибки используем оригинал
      translations[lang] = {
        title: category.title,
        questions: category.questions
      };
    }
  }

  return translations;
}

// Функция для перевода работы портфолио на все языки
export async function translateWork(work: {
  title: string;
  description: string;
  category: string;
  city?: string;
}): Promise<Record<string, {
  title: string;
  description: string;
  category: string;
  city?: string;
}>> {
  const languages = ['EN', 'NL', 'DE', 'FR', 'ES', 'IT', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SL', 'ET', 'LV', 'LT', 'FI', 'SV', 'DA', 'NO', 'GR', 'UA'];
  
  const translations: Record<string, {
    title: string;
    description: string;
    category: string;
    city?: string;
  }> = {
    RU: {
      title: work.title,
      description: work.description,
      category: work.category,
      city: work.city
    }
  };

  // Переводим последовательно, чтобы не перегружать API (с задержкой между языками)
  for (const lang of languages) {
    try {
      const [title, description, category, city] = await Promise.all([
        translateText(work.title, lang),
        translateText(work.description, lang),
        work.category ? translateText(work.category, lang) : Promise.resolve(work.category),
        work.city ? translateText(work.city, lang) : Promise.resolve(work.city)
      ]);

      translations[lang] = {
        title,
        description,
        category: category || work.category,
        city: city || work.city
      };
      
      // Небольшая задержка между языками (50ms)
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      console.error(`Error translating work to ${lang}:`, error);
      // В случае ошибки используем оригинальный текст
      translations[lang] = {
        title: work.title,
        description: work.description,
        category: work.category,
        city: work.city
      };
    }
  }

  return translations;
}


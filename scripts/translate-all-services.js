/**
 * Скрипт для перевода всех услуг на все языки
 * Запуск: node scripts/translate-all-services.js
 * 
 * Этот скрипт можно запустить на продакшене через Render.com Shell
 * или локально, если сервер запущен
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'https://vkbouwmaster.com';
const USE_HTTPS = BASE_URL.startsWith('https');

function makeRequest(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const client = USE_HTTPS ? https : http;
    const req = client.request(url, { method }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

async function translateAllServices() {
  console.log('🚀 Начинаю перевод всех услуг на все языки...\n');
  console.log(`📍 URL: ${BASE_URL}\n`);
  
  try {
    // Запускаем принудительный перевод всех услуг
    const translateUrl = `${BASE_URL}/api/services/translate?force=true`;
    console.log(`📡 Отправляю запрос на: ${translateUrl}`);
    
    const result = await makeRequest(translateUrl, 'POST');
    
    if (result.status === 200) {
      console.log('✅ Перевод успешно запущен!\n');
      console.log('📊 Результат:', JSON.stringify(result.data, null, 2));
      
      // Проверяем, что услуги переведены
      console.log('\n🔍 Проверяю переводы...\n');
      const servicesUrl = `${BASE_URL}/api/services`;
      const servicesResult = await makeRequest(servicesUrl);
      
      if (servicesResult.status === 200 && Array.isArray(servicesResult.data)) {
        console.log(`📦 Найдено услуг: ${servicesResult.data.length}\n`);
        
        servicesResult.data.forEach((service) => {
          const translationCount = service.translations 
            ? Object.keys(service.translations).length 
            : 0;
          const status = translationCount >= 25 ? '✅' : '⚠️';
          console.log(`${status} ${service.id}: ${translationCount}/25 языков`);
        });
      }
    } else {
      console.error('❌ Ошибка при переводе:', result.status, result.data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

// Запускаем перевод
translateAllServices();


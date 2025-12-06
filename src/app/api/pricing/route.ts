import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { translatePricingData } from '@/lib/translate';

const PRICING_FILE = join(process.cwd(), 'src/lib/pricing-data.json');

interface PricingDataTranslations {
  packages: Array<{
    name: string;
    description: string;
    price: string;
    features: string[];
  }>;
  services: Array<{
    service: string;
    priceRange: string;
    description: string;
    includes: string[];
  }>;
}

interface PricingData {
  packages: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    features: string[];
    popular: boolean;
  }>;
  services: Array<{
    id: string;
    service: string;
    priceRange: string;
    description: string;
    includes: string[];
  }>;
  translations?: Record<string, PricingDataTranslations>;
}

function readPricingData(): PricingData {
  try {
    const data = readFileSync(PRICING_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { packages: [], services: [] };
  }
}

function writePricingData(data: PricingData) {
  writeFileSync(PRICING_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'NL';
    
    const data = readPricingData();
    
    // Если запрашивается исходный язык, возвращаем оригинальные данные
    if (lang === 'RU' || lang === 'EN') {
      return NextResponse.json(data);
    }
    
    // Для всех остальных языков возвращаем переводы
    const translation = data.translations?.[lang];
    if (translation) {
      return NextResponse.json({
        ...data,
        packages: data.packages.map((pkg, idx) => ({
          ...pkg,
          name: translation.packages[idx]?.name || pkg.name,
          description: translation.packages[idx]?.description || pkg.description,
          features: translation.packages[idx]?.features || pkg.features
        })),
        services: data.services.map((service, idx) => ({
          ...service,
          service: translation.services[idx]?.service || service.service,
          description: translation.services[idx]?.description || service.description,
          includes: translation.services[idx]?.includes || service.includes
        }))
      });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при чтении данных' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data: PricingData = await request.json();
    
    // Автоматически переводим на все языки, если переводов еще нет
    if (!data.translations) {
      try {
        const translations = await translatePricingData({
          packages: data.packages.map(pkg => ({
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            features: pkg.features
          })),
          services: data.services.map(service => ({
            service: service.service,
            priceRange: service.priceRange,
            description: service.description,
            includes: service.includes
          }))
        });
        data.translations = translations;
      } catch (translationError) {
        console.error('Translation error:', translationError);
        // Продолжаем без переводов, если произошла ошибка
      }
    }
    
    writePricingData(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при сохранении' },
      { status: 500 }
    );
  }
}


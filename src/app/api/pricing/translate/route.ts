import { NextRequest, NextResponse } from 'next/server';
import { translatePricingData } from '@/lib/translate';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PRICING_FILE = join(process.cwd(), 'src/lib/pricing-data.json');

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
  translations?: Record<string, {
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
  }>;
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

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';
    
    const data = readPricingData();
    
    if (!force && data.translations && Object.keys(data.translations).length >= 5) {
      const hasAllFields = Object.values(data.translations).every(
        t => t && t.packages && t.services
      );
      if (hasAllFields) {
        return NextResponse.json({
          success: true,
          message: 'Переводы уже существуют. Используйте force=true для принудительного перевода.',
          translated: 0,
          errors: 0
        });
      }
    }
    
    console.log(`[Translate Pricing API] 🔄 Starting translation (force=${force})...`);
    
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
      writePricingData(data);
      
      console.log(`[Translate Pricing API] ✅ Successfully translated pricing data`);
      return NextResponse.json({
        success: true,
        message: 'Переводы данных о ценах обновлены',
        translated: Object.keys(translations).length
      });
    } catch (error: any) {
      console.error(`[Translate Pricing API] ❌ Error translating pricing data:`, error);
      return NextResponse.json(
        { error: `Ошибка перевода: ${error.message || 'Неизвестная ошибка'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[Translate Pricing API] ❌ Fatal error:', error);
    return NextResponse.json(
      { error: `Критическая ошибка: ${error.message || 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}


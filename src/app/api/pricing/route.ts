import { NextRequest, NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const data = readPricingData();
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
    writePricingData(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при сохранении' },
      { status: 500 }
    );
  }
}


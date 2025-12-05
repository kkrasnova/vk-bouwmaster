import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PORTFOLIO_FILE = join(process.cwd(), 'src/lib/portfolio-data.json');

interface PortfolioItem {
  id: string;
  service: string;
  title: string;
  description?: string;
  image: string;
  date?: string;
}

function readPortfolioData() {
  try {
    const data = readFileSync(PORTFOLIO_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function writePortfolioData(data: any) {
  writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');

    const data = readPortfolioData();

    if (service) {
      return NextResponse.json({ items: data[service] || [] });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при чтении данных' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const item: PortfolioItem = await request.json();

    if (!item.service || !item.title || !item.image) {
      return NextResponse.json(
        { error: 'Необходимы: service, title, image' },
        { status: 400 }
      );
    }

    const data = readPortfolioData();
    
    if (!data[item.service]) {
      data[item.service] = [];
    }

    const newItem = {
      ...item,
      id: item.id || Date.now().toString(),
      date: item.date || new Date().toISOString(),
    };

    data[item.service].push(newItem);
    writePortfolioData(data);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при сохранении' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    const id = searchParams.get('id');

    if (!service || !id) {
      return NextResponse.json(
        { error: 'Необходимы: service и id' },
        { status: 400 }
      );
    }

    const data = readPortfolioData();
    
    if (data[service]) {
      data[service] = data[service].filter((item: PortfolioItem) => item.id !== id);
      writePortfolioData(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при удалении' },
      { status: 500 }
    );
  }
}


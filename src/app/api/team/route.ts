import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const TEAM_FILE = join(process.cwd(), 'src/lib/team-data.json');

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: string;
}

function readTeamData(): TeamMember[] {
  try {
    const data = readFileSync(TEAM_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeTeamData(data: TeamMember[]) {
  writeFileSync(TEAM_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = readTeamData();
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
    const item: TeamMember = await request.json();

    if (!item.name || !item.position || !item.image) {
      return NextResponse.json(
        { error: 'Необходимы: name, position, image' },
        { status: 400 }
      );
    }

    const data = readTeamData();
    const newItem = {
      ...item,
      id: item.id || Date.now().toString(),
    };

    data.push(newItem);
    writeTeamData(data);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при сохранении' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const item: TeamMember = await request.json();

    if (!item.id) {
      return NextResponse.json(
        { error: 'Необходим id' },
        { status: 400 }
      );
    }

    const data = readTeamData();
    const index = data.findIndex(p => p.id === item.id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Запись не найдена' },
        { status: 404 }
      );
    }

    data[index] = { ...data[index], ...item };
    writeTeamData(data);

    return NextResponse.json({ success: true, item: data[index] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при обновлении' },
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
        { error: 'Необходим id' },
        { status: 400 }
      );
    }

    const data = readTeamData();
    const filtered = data.filter(item => item.id !== id);
    writeTeamData(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при удалении' },
      { status: 500 }
    );
  }
}


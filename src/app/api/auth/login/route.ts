import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    if (verifyCredentials(email, password)) {
      return NextResponse.json(
        { success: true, message: 'Авторизация успешна' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}


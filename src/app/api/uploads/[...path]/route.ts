import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// API route для отдачи файлов из /uploads (Render Disk) или public/uploads
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const filePath = params.path.join('/');
    
    // Проверяем наличие Render Disk
    const renderDiskPath = '/uploads';
    const hasRenderDisk = existsSync(renderDiskPath);
    
    let fullPath: string;
    if (hasRenderDisk) {
      // Используем Render Disk
      fullPath = join(renderDiskPath, filePath);
    } else {
      // Используем локальное хранилище
      fullPath = join(process.cwd(), 'public', 'uploads', filePath);
    }

    // Проверяем, что файл существует
    if (!existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 404 }
      );
    }

    // Читаем файл
    const fileBuffer = await readFile(fullPath);
    
    // Определяем MIME тип
    const ext = filePath.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'mp4': 'video/mp4',
      'mov': 'video/quicktime',
      'avi': 'video/x-msvideo',
      'webm': 'video/webm',
    };
    
    const contentType = mimeTypes[ext || ''] || 'application/octet-stream';

    // Возвращаем файл (Buffer можно использовать напрямую в NextResponse)
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Ошибка чтения файла:', error);
    return NextResponse.json(
      { error: 'Ошибка при чтении файла', details: error.message },
      { status: 500 }
    );
  }
}


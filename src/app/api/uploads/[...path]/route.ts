import { NextRequest, NextResponse } from 'next/server';
import { stat, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, createReadStream } from 'fs';

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
      return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
    }

    const fileStat = await stat(fullPath);

    // Определяем MIME тип
    const ext = filePath.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      mp4: 'video/mp4',
      mov: 'video/quicktime',
      avi: 'video/x-msvideo',
      webm: 'video/webm',
    };

    const contentType = mimeTypes[ext || ''] || 'application/octet-stream';

    // Поддержка Range для видео
    const range = request.headers.get('range');
    if (range && (ext === 'mp4' || ext === 'mov' || ext === 'avi' || ext === 'webm')) {
      const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB
      const bytesPrefix = 'bytes=';
      if (range.startsWith(bytesPrefix)) {
        const parts = range.replace(bytesPrefix, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = Math.min(start + CHUNK_SIZE, fileStat.size - 1);
        const chunkSize = end - start + 1;

        const stream = createReadStream(fullPath, { start, end });
        return new NextResponse(stream as any, {
          status: 206,
          headers: {
            'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': `${chunkSize}`,
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }

    // Без Range — отдаем целиком (подойдёт для изображений)
    const fileBuffer = await readFile(fullPath);
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': `${fileStat.size}`,
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


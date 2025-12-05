#!/bin/bash

echo "🌐 Настройка кастомного домена vkbouwmaster.com для Cloudflare Tunnel"
echo ""

# Проверяем, авторизован ли пользователь в Cloudflare
if [ ! -f ~/.cloudflared/cert.pem ]; then
    echo "📝 Шаг 1: Авторизация в Cloudflare"
    echo "Откроется браузер для авторизации..."
    cloudflared tunnel login
    echo ""
fi

# Создаем именованный туннель
echo "📝 Шаг 2: Создание именованного туннеля 'vkbouwmaster'"
cloudflared tunnel create vkbouwmaster 2>&1 | grep -v "already exists" || echo "Туннель уже существует"

# Создаем конфигурационный файл
echo ""
echo "📝 Шаг 3: Создание конфигурации туннеля"
mkdir -p ~/.cloudflared

cat > ~/.cloudflared/config.yml << EOF
tunnel: vkbouwmaster
credentials-file: ~/.cloudflared/$(cloudflared tunnel list 2>/dev/null | grep vkbouwmaster | awk '{print $1}' | head -1).json

ingress:
  - hostname: vkbouwmaster.com
    service: http://127.0.0.1:3457
  - hostname: www.vkbouwmaster.com
    service: http://127.0.0.1:3457
  - service: http_status:404
EOF

echo "✅ Конфигурация создана в ~/.cloudflared/config.yml"
echo ""

# Настраиваем DNS
echo "📝 Шаг 4: Настройка DNS записей"
echo "Выполните команду для настройки DNS:"
echo ""
echo "cloudflared tunnel route dns vkbouwmaster vkbouwmaster.com"
echo "cloudflared tunnel route dns vkbouwmaster www.vkbouwmaster.com"
echo ""

echo "🚀 Шаг 5: Запуск туннеля"
echo "После настройки DNS запустите:"
echo "cloudflared tunnel run vkbouwmaster"
echo ""


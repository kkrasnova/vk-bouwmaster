#!/bin/bash

# Запуск сервера в фоне, если еще не запущен
if ! lsof -ti:3456 > /dev/null 2>&1; then
    echo "Запуск HTTPS сервера на порту 3456..."
    PORT=3456 npm run dev:https > /dev/null 2>&1 &
    SERVER_PID=$!
    echo "Сервер запущен (PID: $SERVER_PID)"
    sleep 5
else
    echo "Сервер уже запущен на порту 3456"
fi

# Попытка использовать ngrok
if command -v ngrok &> /dev/null; then
    echo "Запуск ngrok туннеля..."
    ngrok http 3456 > /tmp/ngrok.log 2>&1 &
    NGROK_PID=$!
    sleep 3
    URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o '"public_url":"https://[^"]*"' | head -1 | cut -d'"' -f4)
    if [ ! -z "$URL" ]; then
        echo ""
        echo "✅ Туннель создан!"
        echo "🌐 Публичный URL: $URL"
        echo ""
        echo "Откройте этот URL на телефоне в любом браузере!"
        echo ""
        echo "Для остановки нажмите Ctrl+C"
        wait $NGROK_PID
        exit 0
    fi
    kill $NGROK_PID 2>/dev/null
fi

# Если ngrok не сработал, используем localtunnel
echo "Запуск localtunnel..."
npx --yes localtunnel --port 3456 2>&1 | while read line; do
    echo "$line"
    if echo "$line" | grep -q "your url is"; then
        URL=$(echo "$line" | grep -o "https://[^ ]*")
        echo ""
        echo "✅ Туннель создан!"
        echo "🌐 Публичный URL: $URL"
        echo ""
        echo "Откройте этот URL на телефоне в любом браузере!"
    fi
done


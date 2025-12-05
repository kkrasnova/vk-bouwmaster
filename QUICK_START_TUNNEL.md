# 🚀 Быстрый старт: Настройка туннеля для vkbouwmaster.com

## ✅ Текущий статус:
- Домен `vkbouwmaster.com` активен в Cloudflare
- Можно настраивать туннель!

## Шаг 1: Авторизация в Cloudflare через cloudflared

Откройте терминал и выполните:

```bash
cloudflared tunnel login
```

- Откроется браузер
- Выберите аккаунт Cloudflare (Krasnovaanastasiia@knu.ua)
- Разрешите доступ
- Вернетесь в терминал - авторизация завершена

## Шаг 2: Создание туннеля

```bash
cloudflared tunnel create vkbouwmaster
```

Вы увидите сообщение о создании туннеля и его UUID.

## Шаг 3: Настройка DNS записей

```bash
cloudflared tunnel route dns vkbouwmaster vkbouwmaster.com
cloudflared tunnel route dns vkbouwmaster www.vkbouwmaster.com
```

Эти команды автоматически создадут DNS записи в Cloudflare.

## Шаг 4: Создание конфигурации

1. **Узнайте UUID туннеля:**
   ```bash
   cloudflared tunnel list
   ```
   Найдите строку с `vkbouwmaster` и скопируйте UUID (длинная строка вида `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

2. **Создайте конфигурационный файл:**
   ```bash
   mkdir -p ~/.cloudflared
   ```

3. **Создайте файл `~/.cloudflared/config.yml`:**
   
   Откройте файл в редакторе:
   ```bash
   nano ~/.cloudflared/config.yml
   ```
   
   Или в VS Code:
   ```bash
   code ~/.cloudflared/config.yml
   ```
   
   Вставьте следующее (замените `[UUID]` на реальный UUID из шага 1):
   
   ```yaml
   tunnel: vkbouwmaster
   credentials-file: ~/.cloudflared/[UUID].json

   ingress:
     - hostname: vkbouwmaster.com
       service: http://127.0.0.1:3457
     - hostname: www.vkbouwmaster.com
       service: http://127.0.0.1:3457
     - service: http_status:404
   ```
   
   **Пример с реальным UUID:**
   ```yaml
   tunnel: vkbouwmaster
   credentials-file: ~/.cloudflared/a1b2c3d4-e5f6-7890-abcd-ef1234567890.json

   ingress:
     - hostname: vkbouwmaster.com
       service: http://127.0.0.1:3457
     - hostname: www.vkbouwmaster.com
       service: http://127.0.0.1:3457
     - service: http_status:404
   ```
   
   Сохраните файл (в nano: Ctrl+O, Enter, Ctrl+X)

## Шаг 5: Запуск

1. **Убедитесь, что HTTP сервер запущен:**
   ```bash
   cd "/Users/anastasiia.krasnova/Desktop/Все мои проекты/VK BOUWMASTER/VK BOUWMASTER"
   PORT=3457 npm run dev
   ```

2. **В другом терминале запустите туннель:**
   ```bash
   cd "/Users/anastasiia.krasnova/Desktop/Все мои проекты/VK BOUWMASTER/VK BOUWMASTER"
   npm run tunnel:custom
   ```
   
   Или:
   ```bash
   cloudflared tunnel run vkbouwmaster
   ```

## 🎉 Готово!

После запуска туннеля ваш сайт будет доступен по адресу:
- **https://vkbouwmaster.com**
- **https://www.vkbouwmaster.com**

## ⚠️ Важно:

- **HTTP сервер должен работать** на порту 3457
- **Туннель должен работать постоянно** для доступности сайта
- Если туннель остановится - сайт станет недоступен

## 🔄 Автозапуск туннеля (опционально)

Для автоматического запуска туннеля при загрузке системы:

```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

## 📝 Проверка статуса

- Список туннелей: `cloudflared tunnel list`
- Информация о туннеле: `cloudflared tunnel info vkbouwmaster`
- DNS записи: `cloudflared tunnel route dns list`


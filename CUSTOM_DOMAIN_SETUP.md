# 🌐 Настройка кастомного домена vkbouwmaster.com

## Требования

1. **Домен должен быть зарегистрирован** (vkbouwmaster.com)
2. **Домен должен быть добавлен в Cloudflare** (бесплатный аккаунт)
3. **Nameservers домена должны указывать на Cloudflare**

## Пошаговая инструкция

### Шаг 1: Добавьте домен в Cloudflare

1. Зайдите на https://dash.cloudflare.com
2. Нажмите "Add a Site"
3. Введите `vkbouwmaster.com`
4. Выберите бесплатный план (Free)
5. Обновите nameservers у регистратора домена на те, что указал Cloudflare

### Шаг 2: Авторизация в Cloudflare через cloudflared

```bash
cloudflared tunnel login
```

Откроется браузер - авторизуйтесь в Cloudflare.

### Шаг 3: Создание именованного туннеля

```bash
cloudflared tunnel create vkbouwmaster
```

### Шаг 4: Настройка DNS записей

```bash
cloudflared tunnel route dns vkbouwmaster vkbouwmaster.com
cloudflared tunnel route dns vkbouwmaster www.vkbouwmaster.com
```

### Шаг 5: Создание конфигурации

Создайте файл `~/.cloudflared/config.yml`:

```yaml
tunnel: vkbouwmaster
credentials-file: ~/.cloudflared/[UUID-туннеля].json

ingress:
  - hostname: vkbouwmaster.com
    service: http://127.0.0.1:3457
  - hostname: www.vkbouwmaster.com
    service: http://127.0.0.1:3457
  - service: http_status:404
```

**Важно:** Замените `[UUID-туннеля]` на реальный UUID, который можно узнать командой:
```bash
cloudflared tunnel list
```

### Шаг 6: Запуск туннеля

```bash
cloudflared tunnel run vkbouwmaster
```

Или используйте скрипт:
```bash
./setup-custom-domain.sh
```

## Автозапуск туннеля (опционально)

Для автоматического запуска при загрузке системы:

```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

## Проверка

После настройки ваш сайт будет доступен по адресу:
- https://vkbouwmaster.com
- https://www.vkbouwmaster.com

## Важно

- Убедитесь, что HTTP сервер запущен на порту 3457: `PORT=3457 npm run dev`
- Туннель должен работать постоянно для доступности сайта
- Для продакшена рекомендуется использовать постоянный туннель с автозапуском


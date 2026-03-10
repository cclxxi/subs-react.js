# Subscriptions Tracker Frontend

Frontend-приложение на React + Vite для управления подписками и картами.

## Быстрый старт

```bash
npm install
cp .env.example .env
npm run dev
```

## Конфигурация API

Используется переменная окружения `VITE_API_BASE_URL`.

Пример для локальной разработки:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Пример для Railway backend:

```env
VITE_API_BASE_URL=https://your-backend.railway.app/api
```

Важно: значение должно включать суффикс `/api`.

## Скрипты

```bash
npm run dev
npm run lint
npm run build
npm run preview
npm run start
```

- `start` запускает production-сборку на порту из `PORT` (под Railway).

## Деплой на Railway (frontend)

1. Создай новый проект на Railway и подключи этот репозиторий.
2. Railway автоматически подхватит `railway.toml`.
3. В Variables добавь:
   - `VITE_API_BASE_URL=https://<backend-service>.railway.app/api`
4. Запусти Deploy.

Что происходит при деплое:
- build: `npm ci && npm run build`
- start: `npm run start`

## Подключение к backend на Railway

1. Задеплой backend сервис.
2. Скопируй public URL backend.
3. Убедись, что backend CORS разрешает домен frontend-сервиса.
4. В frontend-сервисе обнови `VITE_API_BASE_URL` и перезапусти деплой.

## Локальная проверка production-режима

```bash
npm run build
PORT=3000 npm run start
```

После этого открой `http://localhost:3000`.

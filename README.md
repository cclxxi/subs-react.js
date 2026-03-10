# Subscriptions Tracker Frontend

Frontend-приложение на React + Vite для управления подписками и банковскими картами.

## Что реализовано

- Регистрация и логин с JWT-токеном
- Дашборд с загрузкой:
  - карт пользователя
  - активных подписок
  - ближайших списаний
- Добавление карты
- Добавление подписки с привязкой к карте
- Удаление подписки
- UI на Tailwind CSS + анимации через Framer Motion

## API

По умолчанию фронтенд ходит в:

`http://localhost:3000/api`

Можно переопределить через `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Установка и запуск

```bash
npm install
npm run dev
```

## Проверка качества

```bash
npm run lint
npm run build
```

## Структура

- `src/api.js` - API-слой и обработка ответов
- `src/Dashboard.jsx` - основной экран после логина
- `src/AddCardModal.jsx` - модалка добавления карты
- `src/AddSubModal.jsx` - модалка добавления подписки
- `src/Login.jsx` - логин
- `src/Register.jsx` - регистрация

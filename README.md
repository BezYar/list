
# Virtualized Drag and Drop List Project

![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-yellow.svg)
![DnD Kit](https://img.shields.io/badge/DnD_Kit-6.3.1-green.svg)

Производительный виртуализированный список с возможностью перетаскивания, выбором элементов и поиском, построенный на React, TypeScript и Vite.

## Особенности

- 🚀 **Виртуализированная прокрутка** с использованием `react-window` для оптимальной производительности
- 🖱️ **Перетаскивание элементов** с помощью `@dnd-kit`
- 🔍 **Функция поиска** с мгновенной фильтрацией
- ✅ **Выбор элементов** с сохранением состояния
- ♻️ **Бесконечная загрузка** при прокрутке
- 📱 **Адаптивный дизайн** с компонентами Material UI
- 🐳 **Поддержка Docker** для удобной разработки и развертывания

## Структура проекта

- **web/** - Фронтенд приложение
  - src/ - React компоненты и логика
  - public/ - Статические файлы
  - Dockerfile - Production Dockerfile
  - Dockerfile.dev - Development Dockerfile
  - vite.config.ts - Конфигурация Vite
- **server/** - Бэкенд API
  - index.ts - Express сервер
  - Dockerfile - Dockerfile сервера
- docker-compose.yml - Конфигурация Docker Compose
- docker-compose.dev.yml - Development Docker Compose

## Начало работы

### Необходимые компоненты

- Node.js (v18+)
- Docker (опционально)
- Yarn или npm

### Разработка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/BezYar/list.git
   cd list
   ```
2. **Установите зависимости**

   ```bash
   # Для фронтенда
   cd web
   yarn install

   # Для бэкенда
   cd ../server
   yarn install
   ```
3. **Запустите с Docker (рекомендуется)**

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```
   Или вручную:

   ```bash
   # В одном терминале (бэкенд)
   cd server
   yarn dev

   # В другом терминале (фронтенд)
   cd web
   yarn dev
   ```
4. **Откройте приложение**

   - Фронтенд: http://localhost:5173
   - Бэкенд: http://localhost:3001

### Сборка для production

```bash
docker-compose -f docker-compose.prod.yml up --build
```

## Технологии

### Фронтенд

- React 19 - Библиотека UI
- TypeScript - Проверка типов
- Vite - Инструмент сборки
- @dnd-kit - Функциональность перетаскивания
- Material UI - UI компоненты
- react-window - Виртуализированные списки
- react-infinite-scroll - Бесконечная загрузка

### Бэкенд

- Express - Веб-фреймворк
- Node.js - Среда выполнения

## API endpoints

| Метод | Эндпоинт | Описание                                    |
|-------|----------|---------------------------------------------|
| GET   | /items   | Получить элементы с пагинацией и фильтрацией |
| POST  | /swap    | Обновить позиции элементов после перетаскивания |
| POST  | /select  | Изменить состояние выбора элемента           |

## Переменные окружения

### Фронтенд:

- `VITE_SERVER_URL` - URL бэкенд сервера (по умолчанию: http://localhost:3001)

## Настройка

Вы можете настроить следующие аспекты:

- Отрисовка элементов списка - Измените компонент `SortableRow`
- Внешний вид при перетаскивании - Редактируйте компонент `DragOverlayRow`
- Размер пагинации - Измените `PAGE_SIZE` в компоненте `List`
- Начальный размер данных - Измените длину `sortedList` на сервере

## Производительность

- Виртуализация обеспечивает плавную прокрутку с большими наборами данных
- Поиск с задержкой предотвращает избыточные запросы к API
- Оптимизированное перетаскивание с минимальными перерисовками

## Лицензия

MIT License

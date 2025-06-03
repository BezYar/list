
# Virtualized Drag and Drop List Project

![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-yellow.svg)
![DnD Kit](https://img.shields.io/badge/DnD_Kit-6.3.1-green.svg)

A high-performance virtualized list with drag-and-drop, item selection, and search functionality built with React, TypeScript, and Vite.

## About

This project was built according to the [technical specification](https://docs.google.com/document/d/1glcxpTMw3yhU4rGYFPoaB0XDca2tHcdbkI3jZo_oxWY/mobilebasic).

## Features

- 🚀 **Virtualized scrolling** using `react-window` for optimal performance
- 🖱️ **Drag and drop** support with `@dnd-kit`
- 🔍 **Search function** with instant filtering
- ✅ **Item selection** with state persistence
- ♻️ **Infinite loading** on scroll
- 📱 **Responsive design** using Material UI components
- 🐳 **Docker support** for easy development and deployment

## Project Structure

- **web/** - Frontend application
  - src/ - React components and logic
  - public/ - Static files
  - Dockerfile - Production Dockerfile
  - Dockerfile.dev - Development Dockerfile
  - vite.config.ts - Vite configuration
- **server/** - Backend API
  - index.ts - Express server
  - Dockerfile - Server Dockerfile
- docker-compose.yml - Docker Compose configuration
- docker-compose.dev.yml - Development Docker Compose

## Getting Started

### Requirements

- Node.js (v18+)
- Docker (optional)
- Yarn or npm

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/BezYar/list.git
   cd list
   ```
2. **Install dependencies**

   ```bash
   # Frontend
   cd web
   yarn install

   # Backend
   cd ../server
   yarn install
   ```
3. **Create `.env` file**

   Create a `.env` file in the `web` directory with the following content:

   ```env
   VITE_SERVER_URL=http://localhost:3001
   ```

4. **Run with Docker (recommended)**

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

   Or manually:

   ```bash
   # In one terminal (backend)
   cd server
   yarn dev

   # In another terminal (frontend)
   cd web
   yarn dev
   ```
5. **Open the app**

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### Production Build

```bash
docker-compose -f docker-compose.prod.yml up --build
```

## Technologies

### Frontend

- React 19 - UI library
- TypeScript - Type checking
- Vite - Build tool
- @dnd-kit - Drag and drop functionality
- Material UI - UI components
- react-window - Virtualized lists
- react-infinite-scroll - Infinite loading

### Backend

- Express - Web framework
- Node.js - Runtime environment

## API Endpoints

| Method | Endpoint | Description                                      |
|--------|----------|------------------------------------------------|
| GET    | /items   | Get items with pagination and filtering         |
| POST   | /swap    | Update item positions after drag and drop       |
| POST   | /select  | Change item selection state                       |

## Environment Variables

### Frontend:

- `VITE_SERVER_URL` - Backend server URL (default: http://localhost:3001)

## Configuration

You can customize the following:

- List item rendering — edit the `SortableRow` component
- Drag overlay appearance — edit the `DragOverlayRow` component
- Page size — change `PAGE_SIZE` in the `List` component
- Initial data size — modify the length of `sortedList` on the server

## Performance

- Virtualization ensures smooth scrolling with large datasets
- Debounced search prevents excessive API requests
- Optimized drag-and-drop with minimal re-renders

## License

MIT License

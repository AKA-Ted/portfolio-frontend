# Portfolio Frontend

Personal portfolio web application built with **Vue 3**, **TypeScript**, and **Vite**. Features a dynamic, multi-language UI that consumes a REST API backend.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Language | TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS v4 |
| State Management | Pinia |
| Routing | Vue Router 4 |
| HTTP Client | Axios |
| i18n | Custom composable |
| Containerization | Docker + Nginx |

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, icons)
├── components/      # Reusable UI components
├── composables/     # Shared composition functions (useI18n, etc.)
├── i18n/            # Translation files
├── interfaces/      # TypeScript interfaces & types
├── router/          # Vue Router configuration
├── services/        # Axios API service layer
├── store/           # Pinia stores
└── views/           # Page-level components
```

## ⚙️ Getting Started

### Prerequisites

- Node.js 22+
- npm

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 🐳 Docker

Build and run the app in a containerized Nginx server:

```bash
# Build and start
docker compose up -d --build

# Stop
docker compose down
```

The app is served on port **80**.

> **Note:** The compose file expects an external Docker network called `portfolio-network`. Create it once with:
> ```bash
> docker network create portfolio-network
> ```

## 🌐 Environment Variables

Create a `.env.local` file at the project root for local development:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

For production, configure `.env.production` accordingly.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

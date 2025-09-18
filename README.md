# Tintly - Backend-Heavy Theme Generator

A web-based theme generator that lets developers and designers create, preview, and export UI themes. Built with a **backend-first approach** to showcase strong backend/system design skills.

## 🎯 Project Overview

Tintly is a smaller working replica of [tweakcn.com](https://tweakcn.com/) with focus on backend architecture. The frontend acts as a consumer of backend APIs, making the project modular and extensible.

### Core Features
- **Theme Management API** - Create, update, store, and retrieve themes
- **Export Engine** - Generate tailwind.config.js, theme.css, and tokens.json
- **AI Palette Generator** (Optional) - Suggest palettes from images/logos
- **Component Preview** - Live previews of buttons, cards, forms

## 🏗️ System Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend       │
│   (Client App)  │     │   (Core Service)│
│                 │     │                 │
│ - Theme Editor  │     │ - Theme API     │
│ - Live Preview  │     │ - Export API    │
│ - Export UI     │     │ - AI Palette    │
└─────────────────┘     └─────────────────┘
```

## 🛠️ Tech Stack

### Backend (Priority)
- **Framework**: Node.js + Express (REST API)
- **Database**: SQLite / JSON-based storage
- **Export Engine**: Custom JS functions
- **AI Palette**: Colorthief / Colormind API (Optional)

### Frontend (Phase 2)
- **Framework**: Next.js (React-based)
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Preview Components**: Buttons, Inputs, Cards

## 🗺️ Development Roadmap

### ✅ Phase 1 - Backend First (Current)
- [x] Create project structure
- [x] Add README.md with roadmap
- [ ] Setup backend project structure (/server)
- [ ] Create server.js with Express setup
- [ ] Implement routes: /themes, /export
- [ ] Setup data model: theme.json or SQLite
- [ ] Build services: Export service (Tailwind, CSS, JSON)
- [ ] Write unit tests for export functions
- [ ] **Goal**: Backend fully works (independent of frontend)

### 🔄 Phase 2 - Frontend (Basic Clone)
- [ ] Create frontend project (/client)
- [ ] Build simple clone of tweakcn.com UI
- [ ] Connect frontend to backend APIs
- [ ] Show live previews with tokens from backend
- [ ] Add "Export" button with file downloads

### 🚀 Phase 3 - Enhancements (Optional)
- [ ] Add AI palette generator (image → palette)
- [ ] Add save/load multiple themes
- [ ] Add theme comparison tool

## 🎨 API Endpoints

### Theme Management
- `POST /api/themes` - Create new theme
- `GET /api/themes/:id` - Get theme by ID
- `PUT /api/themes/:id` - Update theme
- `DELETE /api/themes/:id` - Delete theme
- `GET /api/themes` - List all themes

### Export
- `POST /api/export/tailwind` - Generate tailwind.config.js
- `POST /api/export/css` - Generate theme.css
- `POST /api/export/json` - Generate tokens.json

### AI Palette (Optional)
- `POST /api/palette/generate` - Generate palette from image/prompt

## 🏁 Success Criteria

**Phase 1 Complete When:**
- ✅ Backend API can create themes
- ✅ Backend API can edit themes
- ✅ Backend API can export theme files
- ✅ All endpoints tested and working
- ✅ Export service generates valid configs

## 🚀 Getting Started

### Backend Development
```bash
cd server
npm install
npm run dev
```

### Testing
```bash
npm run test
```

## 📁 Project Structure
```
tintly/
├── server/           # Backend API (Phase 1)
├── client/           # Frontend App (Phase 2)
├── docs/            # Documentation
└── README.md        # This file
```

---

**Note**: This project follows a backend-first development approach to demonstrate strong system design and API architecture skills.

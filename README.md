# 🎨 Tintly - Complete Theme Generator

A full-stack theme generator that creates beautiful, customizable themes for shadcn/ui components. Built with a **backend-first approach** to showcase strong system design and API development skills.

## ✨ Features

- 🎨 **Advanced Theme Editor** - Complete color, typography, and spacing customization
- 🔄 **Real-time Preview** - Live preview with shadcn/ui components
- 📤 **Multiple Export Formats** - Tailwind config, CSS variables, and JSON tokens
- 🚀 **Theme Presets** - Quick-start themes for common use cases
- 🐳 **Docker Support** - Easy deployment with Docker Compose
- 🧪 **Comprehensive Testing** - Full test coverage for backend API
- 📱 **Responsive Design** - Works perfectly on desktop and mobile

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd tintly

# Start both services with one command
./start.sh

# Or use Docker Compose directly
docker-compose up --build -d
```

**Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Option 2: Manual Setup

```bash
# Install dependencies for both services
npm run install:all

# Start both services in development
npm run dev

# Or start individually
npm run dev:backend    # Backend on port 3001
npm run dev:frontend   # Frontend on port 3000
```

## 🏗️ Architecture

### Backend-First Design

- **Express.js API** with comprehensive REST endpoints
- **SQLite database** for persistent theme storage
- **Export service** generating multiple file formats
- **Joi validation** for robust data validation
- **Comprehensive testing** with Jest and Supertest

### Frontend Consumer

- **Next.js 15** with App Router
- **shadcn/ui** components for consistent design
- **Real-time preview** with live theme updates
- **Advanced color picker** with HSL/HSV support
- **Typography editor** with font selection
- **Spacing controls** for precise customization

## 📁 Project Structure

```
tintly/
├── 📦 package.json              # Root package with scripts
├── 🐳 docker-compose.yml        # Docker orchestration
├── 🚀 start.sh                  # Startup script
├── 📖 README-Docker.md          # Docker documentation
├── 🖥️ server/                   # Backend API
│   ├── 📁 src/
│   │   ├── 🗄️ models/          # Database models
│   │   ├── 🛣️ routes/          # API routes
│   │   ├── ⚙️ services/        # Business logic
│   │   └── 🖥️ server.js        # Express server
│   ├── 🧪 tests/               # Unit tests
│   ├── 🗃️ data/                # SQLite database
│   └── 🐳 Dockerfile           # Backend container
└── 🎨 tintly-client/           # Frontend UI
    ├── 📁 src/
    │   ├── 📱 app/             # Next.js app
    │   ├── 🧩 components/      # React components
    │   └── 🔧 lib/             # Utilities
    ├── 🐳 Dockerfile           # Frontend container
    └── 📦 package.json         # Frontend dependencies
```

## 🎯 Core Features

### 🎨 Theme Editor

- **Color Customization** - Primary, secondary, accent, and semantic colors
- **Advanced Color Picker** - HSL/HSV sliders with hex input
- **Typography Control** - Font family, size, and weight selection
- **Spacing & Radius** - Precise control over padding and border radius
- **Live Preview** - Real-time updates as you edit

### 📤 Export System

- **Tailwind Config** - Ready-to-use `tailwind.config.js`
- **CSS Variables** - HSL-based CSS custom properties
- **JSON Tokens** - Design tokens for other tools
- **Multiple Formats** - Download in your preferred format

### 🚀 Theme Presets

- **Default** - Clean shadcn/ui theme
- **Dark Mode** - High contrast dark theme
- **Ocean Blue** - Calming blue color scheme
- **Forest Green** - Natural green palette
- **Royal Purple** - Elegant purple theme
- **Sunset Orange** - Warm orange scheme

## 🔧 API Reference

### Theme Management

```http
GET    /api/themes                    # List all themes
POST   /api/themes                    # Create new theme
GET    /api/themes/:id                # Get specific theme
PUT    /api/themes/:id                # Update theme
DELETE /api/themes/:id                # Delete theme
GET    /api/themes/default/template   # Get default template
```

### Export System

```http
POST   /api/export                    # Export theme (format: tailwind|css|json)
POST   /api/export/tailwind           # Export Tailwind config
POST   /api/export/css                # Export CSS variables
POST   /api/export/json               # Export JSON tokens
```

### Health Check

```http
GET    /health                        # Service health status
```

## 🧪 Testing

```bash
# Run all backend tests
npm run test

# Run specific test file
cd server && bun run test themes.test.js

# Run tests in watch mode
cd server && bun run test:watch
```

## 🐳 Docker Deployment

### Development

```bash
# Start with Docker Compose
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production

```bash
# Build and start in production mode
docker-compose up --build -d

# Check service health
curl http://localhost:3001/health
curl http://localhost:3000
```

## 📊 Monitoring

### Health Checks

- Backend: `http://localhost:3001/health`
- Frontend: `http://localhost:3000`

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- Docker (for containerized development)

### Available Scripts

```bash
npm run dev              # Start both services
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm run build            # Build both services
npm run test             # Run backend tests
npm run docker:up        # Start with Docker
npm run docker:down      # Stop Docker services
npm run clean            # Clean Docker resources
```

## 🎨 Usage Examples

### Creating a Theme

1. Open the theme editor
2. Customize colors using the advanced color picker
3. Adjust typography with font selection
4. Fine-tune spacing and border radius
5. Preview your changes in real-time
6. Save your theme
7. Export in your preferred format

### Exporting Themes

- **Tailwind**: Download `tailwind.config.js` for your project
- **CSS**: Get CSS variables for custom styling
- **JSON**: Use design tokens in other tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework
- [Express.js](https://expressjs.com/) for the Node.js web framework

---

**Built with ❤️ to showcase backend-first development and system design skills**

# Tintly - Docker Setup

This document explains how to run Tintly using Docker for easy deployment and development.

## 🐳 Quick Start

### Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)

### Option 1: Using the Startup Script (Recommended)

```bash
# Make the script executable (if not already)
chmod +x start.sh

# Start both services
./start.sh
```

### Option 2: Using Docker Compose Directly

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📁 Project Structure

```
tintly/
├── docker-compose.yml          # Orchestrates both services
├── start.sh                    # Startup script
├── server/                     # Backend service
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── tintly-client/              # Frontend service
    ├── Dockerfile
    ├── package.json
    └── src/
```

## 🔧 Services

### Backend Service

- **Port**: 3001
- **Technology**: Node.js + Express
- **Database**: SQLite (persisted in `./server/data/`)
- **Health Check**: `/health`

### Frontend Service

- **Port**: 3000
- **Technology**: Next.js + React
- **Build**: Standalone output for Docker
- **Health Check**: Root path

## 🚀 Development

### Running in Development Mode

```bash
# Backend only
cd server && bun run dev

# Frontend only
cd tintly-client && bun run dev
```

### Building for Production

```bash
# Build all services
docker-compose build

# Start in production mode
docker-compose up -d
```

## 📊 Monitoring

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Check Service Status

```bash
# List running containers
docker-compose ps

# Check service health
curl http://localhost:3001/health
curl http://localhost:3000
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   # Stop existing services
   docker-compose down

   # Or change ports in docker-compose.yml
   ```

2. **Database Issues**

   ```bash
   # Remove database and restart
   rm -rf server/data/themes.db
   docker-compose up --build -d
   ```

3. **Build Failures**
   ```bash
   # Clean build
   docker-compose down
   docker system prune -f
   docker-compose up --build -d
   ```

### Debug Mode

```bash
# Run with verbose logging
docker-compose up --build

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 🔒 Environment Variables

### Backend

- `NODE_ENV`: production
- `PORT`: 3001

### Frontend

- `NEXT_PUBLIC_API_URL`: http://localhost:3001
- `NODE_ENV`: production

## 📦 Production Deployment

### Using Docker Compose

1. Clone the repository
2. Run `./start.sh`
3. Access at http://localhost:3000

### Using Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml tintly
```

### Using Kubernetes

Convert docker-compose.yml to Kubernetes manifests:

```bash
# Install kompose
pip install kompose

# Convert
kompose convert
```

## 🎯 Features

- ✅ **Backend API** with theme CRUD operations
- ✅ **Export System** (Tailwind, CSS, JSON)
- ✅ **Real-time Preview** with live theme updates
- ✅ **Advanced Color Picker** with HSL support
- ✅ **Typography Editor** with font selection
- ✅ **Spacing & Radius** customization
- ✅ **Theme Presets** for quick start
- ✅ **Docker Support** for easy deployment
- ✅ **Health Checks** for monitoring
- ✅ **Persistent Storage** for themes

## 📝 API Endpoints

- `GET /health` - Health check
- `GET /api/themes` - List all themes
- `POST /api/themes` - Create theme
- `GET /api/themes/:id` - Get theme
- `PUT /api/themes/:id` - Update theme
- `DELETE /api/themes/:id` - Delete theme
- `GET /api/themes/default/template` - Get default template
- `POST /api/export` - Export theme (Tailwind/CSS/JSON)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

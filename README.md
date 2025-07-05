# Lucidra - Business Planning & AI Strategy Platform

**Future of Integrated Organizational Strategy**

Lucidra is a comprehensive business planning platform that leverages AI (Claude) to provide strategic insights and scenario analysis for organizational planning.

## 🚀 Features

- **AI-Powered Scenario Analysis**: Analyze business scenarios with Claude AI
- **Strategic Planning**: Comprehensive organizational strategy tools
- **Real-time Insights**: Get instant AI-generated recommendations
- **Modern Architecture**: React frontend, Node.js backend, Python AI service

## 🏗️ Architecture

```
lucidra/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── modules/
│   │   │   └── scenario/    # Scenario management
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Main server file
│   ├── package.json
│   └── Dockerfile
├── frontend/                # React application
│   ├── src/
│   │   ├── components/
│   │   │   └── Scenario/    # Scenario components
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── Dockerfile
├── python-ai/               # Python AI service
│   ├── ai_services/
│   │   └── scenario_ai.py   # Claude AI integration
│   ├── requirements.txt
│   └── Dockerfile
└── docker-compose.yml       # Multi-container orchestration
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- Anthropic API Key

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/shawn-kelly/lucidra.git
   cd lucidra
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Build and run with Docker**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - AI Service: http://localhost:5000

### Local Development Setup

1. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   
   # Python AI
   cd ../python-ai
   pip install -r requirements.txt
   ```

2. **Set up environment files**
   ```bash
   # Copy and configure environment files
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   cp python-ai/.env.example python-ai/.env
   
   # Add your Anthropic API key to the .env files
   ```

3. **Run services individually**
   ```bash
   # Terminal 1 - Python AI Service
   cd python-ai
   python -m ai_services.scenario_ai
   
   # Terminal 2 - Backend API
   cd backend
   npm run dev
   
   # Terminal 3 - Frontend
   cd frontend
   npm start
   ```

## 🔧 Configuration

### Environment Variables

**Root `.env` file:**
```env
# Database
POSTGRES_USER=lucidra
POSTGRES_PASSWORD=your_password
POSTGRES_DB=lucidra

# Backend
AI_SERVICE_URL=http://ai:5000
JWT_SECRET=your_jwt_secret

# AI Service
ANTHROPIC_API_KEY=your_anthropic_api_key
```

**Backend `.env` file:**
```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
AI_SERVICE_URL=http://localhost:5000
```

**Frontend `.env` file:**
```env
REACT_APP_API_URL=http://localhost:4000/api
```

### GitHub Secrets

For CI/CD, add these secrets to your GitHub repository:

- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `JWT_SECRET`: JWT secret for authentication

## 🤖 AI Integration

This project uses **Claude AI** (Anthropic) instead of OpenAI for:

- Strategic scenario analysis
- Business impact predictions
- Organizational planning recommendations
- Risk assessment and mitigation strategies

## 📊 API Endpoints

### Scenario Analysis
- `POST /api/scenario/suggest` - Analyze business scenarios

### Health Check
- `GET /health` - Service health status

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Python tests
cd python-ai
python -m unittest discover
```

## 📦 Deployment

### Docker Deployment
```bash
docker-compose up --build -d
```

### Manual Deployment
1. Build frontend: `cd frontend && npm run build`
2. Build backend: `cd backend && npm run build`
3. Deploy Python service with proper environment variables

## 🔄 CI/CD

The project includes GitHub Actions workflows for:

- **Backend CI**: Node.js testing and building
- **Frontend CI**: React building and testing
- **Python AI CI**: Python linting and testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please create an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ by the Lucidra Team**

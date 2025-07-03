# lucidra
Future of Integrated Org Strategy
/lucidra
  /backend
      /src
          /modules
              scenario/
              upgrade/
              ai/
          /models
          /middleware
          /routes
          /utils
          index.ts
      Dockerfile
      .env.example
  /frontend
      /src
          /components
              Scenario/
              Upgrade/
              AI/
          /pages
          App.tsx
      Dockerfile
      .env.example # Database
POSTGRES_USER=lucidra
POSTGRES_PASSWORD=change_this_password
POSTGRES_DB=lucidra

# Backend
DB_HOST=db
DB_PORT=5432
DB_USER=lucidra
DB_PASS=change_this_password
DB_NAME=lucidra
JWT_SECRET=change_this_jwt_secret
AI_SERVICE_URL=http://ai:5000

# Python AI Service
OPENAI_API_KEY=your_openai_api_key
  /python-ai
      /ai_services
          scenario_ai.py
          upgrade_ai.py
      requirements.txt
      README.md
  docker-compose.yml version: '3.8'
services:
  db:
    image: postgres:15
    restart: always
    env_file:
      - .env
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
  backend:
    build: ./backend
    env_file:
      - .env
      - ./backend/.env
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
    depends_on:
      - db
      - ai
  frontend:
    build: ./frontend
    env_file:
      - .env
      - ./frontend/.env
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    depends_on:
      - backend
  ai:
    build: ./python-ai
    env_file:
      - .env
      - ./python-ai/.env
    volumes:
      - ./python-ai:/app
    ports:
      - "5000:5000"
volumes:
  db-data:
  README.md

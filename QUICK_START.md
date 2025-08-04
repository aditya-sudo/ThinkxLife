# ThinkxLife Quick Start Guide

For experienced developers who want to run ThinkxLife locally quickly.

## Prerequisites
- Node.js 18+ and npm
- Python 3.8+ and pip
- Git

## Quick Setup Commands

```bash
# 1. Clone and enter project
git clone <repository-url>
cd ThinkxLife

# 2. Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 3. Create backend/.env
touch .env  # Windows: echo. > .env
```

Add to `backend/.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=8000
DEBUG=True
CORS_ORIGINS=http://localhost:3000
```

```bash
# 4. Frontend setup
cd ../frontend
npm install

# 5. Create frontend/.env.local
touch .env.local  # Windows: echo. > .env.local
```

Add to `frontend/.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_32_character_secret_here
DATABASE_URL="your_database_connection_string"
NEXT_PUBLIC_API_URL=http://localhost:8000
NODE_ENV=development
```

```bash
# 6. Generate NextAuth secret
node scripts/generate-auth-secret.js

# 7. Database setup
npx prisma generate
npx prisma db push
# Optional: npx prisma studio
```

## Run Application

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Access Points
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Prisma Studio: http://localhost:5555

## Common Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall frontend deps
rm -rf node_modules && npm install

# Reset database
npx prisma migrate reset

# Fix Python deps
pip install -r requirements.txt --force-reinstall
```

---
**See LOCAL_SETUP_GUIDE.md for detailed instructions** 
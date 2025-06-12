#!/bin/bash

# Test CI workflow locally
# This script mimics what happens in GitHub Actions

set -e  # Exit on any error

echo "🚀 Starting local CI test..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1 passed${NC}"
    else
        echo -e "${RED}❌ $1 failed${NC}"
        exit 1
    fi
}

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ] || [ ! -f "backend/requirements.txt" ]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
python -m pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt > /dev/null 2>&1
pip install pytest > /dev/null 2>&1
cd ..
print_status "Backend dependencies"

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm ci --legacy-peer-deps > /dev/null 2>&1
cd ..
print_status "Frontend dependencies"

# Generate Prisma client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
cd frontend
export DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
npx prisma generate > /dev/null 2>&1
cd ..
print_status "Prisma client generation"

# Run pre-commit hooks
echo -e "${YELLOW}🔍 Running pre-commit hooks...${NC}"
pre-commit run --all-files
print_status "Pre-commit hooks"

# TypeScript check
echo -e "${YELLOW}📝 Running TypeScript check...${NC}"
cd frontend
npx tsc --noEmit --skipLibCheck
cd ..
print_status "TypeScript check"

# Build check
echo -e "${YELLOW}🏗️  Running build check...${NC}"
cd frontend
export NEXTAUTH_SECRET="dummy-secret-for-build"
export NEXTAUTH_URL="http://localhost:3000"
npm run build > /dev/null 2>&1
cd ..
print_status "Build check"

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"

# Backend tests
echo "Running backend tests..."
cd backend
export OPENAI_API_KEY="test"
pytest --maxfail=1 --disable-warnings -q
cd ..
print_status "Backend tests"

# Frontend tests
echo "Running frontend tests..."
cd frontend
npm test -- --watchAll=false --bail --passWithNoTests > /dev/null 2>&1
cd ..
print_status "Frontend tests"

# Success message
echo -e "${GREEN}"
echo "🎉 All CI checks passed!"
echo "✅ Dependencies installed"
echo "✅ Prisma client generated"
echo "✅ Pre-commit hooks passed"
echo "✅ TypeScript check passed"
echo "✅ Build check passed"
echo "✅ Tests passed"
echo ""
echo "Your code is ready to be pushed! ��"
echo -e "${NC}" 
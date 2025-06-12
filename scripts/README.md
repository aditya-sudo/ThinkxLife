# Scripts Directory

This directory contains utility scripts for development and CI/CD workflows.

## Available Scripts

### `test-ci.sh`

A comprehensive script that mimics the GitHub Actions CI workflow locally. This allows you to test your changes before pushing to ensure they'll pass CI.

**Usage:**
```bash
# From the project root directory
./scripts/test-ci.sh
```

**What it does:**
- ✅ Installs backend and frontend dependencies
- ✅ Generates Prisma client
- ✅ Runs pre-commit hooks (linting, formatting, type checking)
- ✅ Performs TypeScript type checking
- ✅ Tests the build process
- ✅ Runs backend and frontend tests

**Requirements:**
- Python 3.11+
- Node.js 22+
- pre-commit installed (`pip install pre-commit`)

**Example output:**
```
🚀 Starting local CI test...
📦 Installing dependencies...
✅ Backend dependencies passed
✅ Frontend dependencies passed
🔧 Generating Prisma client...
✅ Prisma client generation passed
🔍 Running pre-commit hooks...
✅ Pre-commit hooks passed
📝 Running TypeScript check...
✅ TypeScript check passed
🏗️ Running build check...
✅ Build check passed
🧪 Running tests...
✅ Backend tests passed
✅ Frontend tests passed

🎉 All CI checks passed!
Your code is ready to be pushed! 🚀
```

## Tips

- Run `./scripts/test-ci.sh` before committing to catch issues early
- The script will exit on the first failure to help you identify problems quickly
- All output is colored for easy reading (green = success, red = error, yellow = info)
- The script sets the same environment variables as the GitHub Actions workflow 
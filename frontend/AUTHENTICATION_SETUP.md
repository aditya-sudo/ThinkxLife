# Authentication Setup Guide

This guide will help you set up the complete authentication system for ThinkxLife using NextAuth.js, Prisma, and PostgreSQL.

## Prerequisites

- Node.js 20+ installed
- PostgreSQL database (local or cloud)
- Git

## 1. Environment Setup

Create a `.env.local` file in the `frontend` directory:

```env
# Database Configuration - USE SESSION MODE for serverless environments
# Direct Connection (current - causes prepared statement issues):
# DATABASE_URL="postgresql://postgres:YOUR_SUPABASE_PASSWORD_HERE@db.olldtnzbrmjzxavxivvd.supabase.co:5432/postgres"
# 
# Session Mode (recommended for Vercel/serverless - prevents prepared statement conflicts):
DATABASE_URL="postgresql://postgres.xxxx:YOUR_SUPABASE_PASSWORD_HERE@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="HdUkaFQEo44VYu2M9dPfxRmeUY3sx6GUAfmBcl0S+9U="

# API Configuration (keeping your existing setting)
NEXT_PUBLIC_API_URL=http://localhost:8000

# OAuth Providers (Optional)
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"
# GITHUB_ID="your-github-client-id"
# GITHUB_SECRET="your-github-client-secret"
```

### Generate NextAuth Secret

```bash
openssl rand -base64 32
```

## 2. Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a database:
```sql
CREATE DATABASE thinkxlife_db;
```

### Option B: Cloud Database (Recommended)

Use services like:
- **Supabase** (free tier available)
- **Railway** (free tier available)
- **PlanetScale** (free tier available)
- **Neon** (free tier available)

## 3. Prisma Setup

Generate Prisma client and run migrations:

```bash
cd frontend
npx prisma generate
npx prisma db push
```

## 4. OAuth Setup (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://yourdomain.com/api/auth/callback/github` (production)

## 5. Run the Application

```bash
cd frontend
npm run dev
```

## 6. Test Authentication

1. Visit `http://localhost:3000`
2. Click "Sign Up" to create a new account
3. Try signing in with email/password
4. Test OAuth providers (if configured)
5. Visit `/profile` to view and edit profile

## Features Included

### Authentication Methods
- ✅ Email/Password registration and login
- ✅ Google OAuth (optional)
- ✅ GitHub OAuth (optional)
- ✅ Session management with JWT

### User Management
- ✅ User registration with validation
- ✅ Secure password hashing (bcrypt)
- ✅ Profile management (view/edit)
- ✅ User preferences and settings

### UI Components
- ✅ Modern sign-in/sign-up pages
- ✅ Comprehensive profile page
- ✅ Authentication-aware navigation
- ✅ Responsive design
- ✅ Loading states and error handling

### Security Features
- ✅ CSRF protection
- ✅ Secure session handling
- ✅ Password validation
- ✅ Input sanitization
- ✅ Protected API routes

## API Routes

- `POST /api/auth/signup` - User registration
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handlers

## Database Schema

The Prisma schema includes:
- **User** - Core user information
- **Account** - OAuth account linking
- **Session** - User sessions
- **Profile** - Extended user profile data
- **VerificationToken** - Email verification

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check DATABASE_URL format
   - Ensure database is running
   - Verify credentials

2. **NextAuth Secret Missing**
   - Set NEXTAUTH_SECRET in .env.local
   - Use a secure random string

3. **OAuth Not Working**
   - Check client IDs and secrets
   - Verify redirect URIs
   - Ensure OAuth apps are configured correctly

4. **Prisma Errors**
   - Run `npx prisma generate`
   - Check database schema with `npx prisma studio`

### Development Commands

```bash
# View database in browser
npx prisma studio

# Reset database (careful!)
npx prisma db push --force-reset

# Generate Prisma client
npx prisma generate

# Check database status
npx prisma db pull
```

## Production Deployment

1. Set production environment variables
2. Use a production database
3. Set NEXTAUTH_URL to your domain
4. Update OAuth redirect URIs
5. Use a secure NEXTAUTH_SECRET

## Security Considerations

- Always use HTTPS in production
- Keep OAuth secrets secure
- Regularly update dependencies
- Monitor for security vulnerabilities
- Implement rate limiting for auth endpoints
- Consider adding 2FA for enhanced security

## Next Steps

- Add email verification
- Implement password reset
- Add social profile linking
- Implement role-based access control
- Add audit logging
- Set up monitoring and analytics

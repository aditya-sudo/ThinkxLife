# Vercel Deployment Guide

## Required Environment Variables

Set these environment variables in your Vercel project settings:

### Database
```
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### NextAuth Configuration
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key-here
```

### Email Service (Resend)
```
RESEND_API_KEY=re_your_resend_api_key_here
```

## Deployment Steps

1. **Connect Repository**: Connect your GitHub repository to Vercel
2. **Set Environment Variables**: Add all the above environment variables in Vercel dashboard
3. **Configure Build Settings**: 
   - Build Command: `prisma generate && next build` (already configured in package.json)
   - Output Directory: `.next`
   - Install Command: `npm install`

## Database Setup

1. Create a PostgreSQL database (recommended: Neon, Supabase, or Railway)
2. Run database migrations: `npx prisma db push`
3. Generate Prisma client: `npx prisma generate`

## Important Notes

- The build process automatically generates the Prisma client
- Make sure your database is accessible from Vercel's servers
- Test your environment variables before deploying
- The `postinstall` script ensures Prisma client is generated after dependency installation

## Troubleshooting

If you encounter "Module not found" errors:
1. Ensure `DATABASE_URL` is set in Vercel environment variables
2. Check that Prisma generation is working: `npx prisma generate`
3. Verify all required environment variables are configured
4. Clear Vercel build cache and redeploy 
# OAuth Authentication Setup Guide

This guide will help you set up Google and GitHub OAuth authentication for your ThinkxLife application.

## Prerequisites

Your application already has:
- ✅ NextAuth.js configured
- ✅ Google and GitHub providers set up
- ✅ Prisma database adapter
- ✅ UI components for OAuth sign-in
- ✅ Error handling and loading states

## Environment Variables Setup

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Database
DATABASE_URL="your-database-url-here"

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# GitHub OAuth
GITHUB_ID=your-github-client-id-here
GITHUB_SECRET=your-github-client-secret-here

# Email Configuration (if using email features)
RESEND_API_KEY=your-resend-api-key-here
```

## 1. Setting up Google OAuth

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API or Google Identity Services

### Step 2: Configure OAuth Consent Screen

1. Navigate to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in the required information:
   - App name: `ThinkxLife`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users if needed

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - Name: `ThinkxLife Web Client`
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy the **Client ID** and **Client Secret**

### Step 4: Update Environment Variables

```env
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
```

## 2. Setting up GitHub OAuth

### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** > **New OAuth App**
3. Fill in the application details:
   - Application name: `ThinkxLife`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**

### Step 2: Get Client Credentials

1. Copy the **Client ID**
2. Generate a **Client Secret** and copy it

### Step 3: Update Environment Variables

```env
GITHUB_ID=your-actual-github-client-id
GITHUB_SECRET=your-actual-github-client-secret
```

## 3. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Update your environment variable:
```env
NEXTAUTH_SECRET=your-generated-secret
```

## 4. Production Setup

### For Production Deployment:

1. **Update OAuth App Settings:**
   - Google: Add your production domain to authorized origins and redirect URIs
   - GitHub: Update the homepage URL and callback URL to your production domain

2. **Environment Variables:**
   ```env
   NEXTAUTH_URL=https://your-production-domain.com
   ```

3. **Security Considerations:**
   - Use strong, unique secrets
   - Regularly rotate OAuth credentials
   - Monitor OAuth usage in provider dashboards
   - Set up proper CORS policies

## 5. Testing the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/signin`

3. Test OAuth sign-in:
   - Click "Google" button - should redirect to Google OAuth
   - Click "GitHub" button - should redirect to GitHub OAuth
   - Complete the OAuth flow and verify you're signed in

## 6. Troubleshooting

### Common Issues:

1. **"OAuth Error: invalid_client"**
   - Check your client ID and secret are correct
   - Verify the redirect URI matches exactly

2. **"OAuth Error: unauthorized_client"**
   - Ensure your domain is added to authorized origins
   - Check that the OAuth consent screen is properly configured

3. **"OAuth Error: access_denied"**
   - User canceled the OAuth flow
   - Check OAuth consent screen configuration

4. **NextAuth Error: "No secret provided"**
   - Ensure NEXTAUTH_SECRET is set in your environment

### Debug Mode:

Enable NextAuth debug mode by adding to your environment:
```env
NEXTAUTH_DEBUG=true
```

## 7. Database Schema

Ensure your Prisma schema includes the necessary OAuth tables:

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
  sessions      Session[]
}
```

## 8. Next Steps

Once OAuth is working:

1. **User Profile Enhancement:** Add more user fields and profile management
2. **Role-based Access:** Implement user roles and permissions
3. **Social Features:** Add user connections and social interactions
4. **Analytics:** Track OAuth usage and user engagement
5. **Security:** Implement rate limiting and security headers

## Support

If you encounter issues:
1. Check the NextAuth.js documentation: https://next-auth.js.org/
2. Review provider-specific documentation (Google, GitHub)
3. Check the browser console and server logs for errors
4. Verify all environment variables are set correctly 
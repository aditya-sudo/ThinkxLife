# OAuth Quick Start Guide

Get your Google and GitHub OAuth authentication up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Generate NextAuth Secret
```bash
npm run generate-auth-secret
```
Copy the generated secret for your `.env.local` file.

### 2. Create Environment File
Create `frontend/.env.local`:
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# Database (use your existing database URL)
DATABASE_URL="your-database-url-here"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (get from GitHub Settings)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 3. Set up Google OAuth (2 minutes)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → APIs & Services → OAuth consent screen
3. Fill basic info (app name: "ThinkxLife")
4. Credentials → Create OAuth client ID → Web application
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

### 4. Set up GitHub OAuth (1 minute)
1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. New OAuth App:
   - App name: "ThinkxLife"
   - Homepage: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy Client ID and generate Client Secret
4. Add to `.env.local`

### 5. Test It Out!
```bash
npm run dev
```
Visit `http://localhost:3000/auth/signin` and test both OAuth providers!

## ✅ What's Already Built

Your ThinkxLife app already includes:
- ✅ NextAuth.js configuration
- ✅ Beautiful OAuth buttons with Google/GitHub branding
- ✅ Error handling and loading states
- ✅ Automatic account linking
- ✅ Session management
- ✅ Database integration with Prisma
- ✅ Responsive design

## 🎨 Features

- **Seamless OAuth Flow**: One-click sign-in with Google or GitHub
- **Account Linking**: Users can link multiple OAuth providers
- **Secure Sessions**: JWT-based sessions with automatic refresh
- **Beautiful UI**: Custom-designed OAuth buttons with proper branding
- **Error Handling**: Graceful error handling with user feedback
- **Loading States**: Visual feedback during authentication

## 🔧 Customization

### Change Callback URL
Update the `callbackUrl` in `AuthButtons` component:
```tsx
<AuthButtons callbackUrl="/dashboard" />
```

### Add More Providers
Add to `lib/auth.ts`:
```typescript
import TwitterProvider from "next-auth/providers/twitter"

// In providers array:
TwitterProvider({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
})
```

### Customize Button Styling
Edit `components/auth-buttons.tsx` to match your design system.

## 🚨 Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets in production
- Regularly rotate OAuth credentials
- Monitor OAuth usage in provider dashboards

## 📚 Need Help?

- Check the full setup guide: `OAUTH_SETUP.md`
- NextAuth.js docs: https://next-auth.js.org/
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- GitHub OAuth: https://docs.github.com/en/developers/apps/building-oauth-apps

Happy coding! 🎉 
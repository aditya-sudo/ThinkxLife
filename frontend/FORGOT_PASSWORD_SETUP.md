# Forgot Password Setup Guide

This guide explains how to set up the forgot password functionality for ThinkxLife.

## Features Added

1. **Forgot Password Page** (`/auth/forgot-password`)
   - Users can enter their email to request a password reset
   - Shows success message after sending email

2. **Reset Password Page** (`/auth/reset-password`)
   - Users can set a new password using the token from their email
   - Validates password strength and confirmation

3. **Email Integration**
   - Sends beautifully formatted HTML emails with reset links
   - Links expire after 1 hour for security

4. **API Routes**
   - `/api/auth/forgot-password` - Handles password reset requests
   - `/api/auth/reset-password` - Handles password updates

## Required Environment Variables

Add these to your `.env.local` file:

```env
# SMTP Configuration for Password Reset Emails
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@thinkxlife.com"
```

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `SMTP_PASS`

### Other Email Providers

- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **SendGrid**: `smtp.sendgrid.net:587`
- **Mailgun**: `smtp.mailgun.org:587`

## Database Migration

The Prisma schema has been updated to include password reset fields. Run the migration:

```bash
# Generate Prisma client (already done)
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name add-password-reset-fields

# Or if using production
npx prisma migrate deploy
```

## Dependencies

The following packages have been installed:

```bash
npm install nodemailer @types/nodemailer
```

## Usage

1. **User Flow**:
   - User clicks "Forgot Password?" on sign-in page
   - Enters email address
   - Receives email with reset link
   - Clicks link to reset password
   - Sets new password and is redirected to sign-in

2. **Security Features**:
   - Reset tokens expire after 1 hour
   - Tokens are cryptographically secure (32 bytes)
   - No user enumeration (same message for valid/invalid emails)
   - Password validation (minimum 6 characters)

## Testing

1. Set up SMTP credentials in `.env.local`
2. Run the development server: `npm run dev`
3. Navigate to `/auth/signin`
4. Click "Forgot Password?"
5. Enter a valid email address
6. Check your email for the reset link
7. Follow the link to reset your password

## Email Template

The email includes:
- ThinkxLife branding with gradient header
- Clear call-to-action button
- Security information about link expiration
- Fallback plain text link
- Professional styling

## Error Handling

- Invalid/expired tokens show appropriate error messages
- Network errors are handled gracefully
- Form validation prevents common issues
- Loading states provide user feedback

## Security Considerations

- Reset tokens are stored hashed in the database
- Tokens have short expiration times (1 hour)
- Rate limiting should be implemented for production
- HTTPS is required for production use
- Email provider should support TLS/SSL 
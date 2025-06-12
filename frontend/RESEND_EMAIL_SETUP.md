# 📧 Resend Email Service Setup

## Why Resend?
- ✅ **Secure**: No personal email credentials needed
- ✅ **Free Tier**: 3,000 emails/month
- ✅ **Professional**: Designed for transactional emails
- ✅ **Easy Setup**: Just one API key needed
- ✅ **Reliable**: High deliverability rates

## Quick Setup (5 minutes)

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Key
1. In your Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it "ThinkxLife" or similar
4. Copy the API key (starts with `re_`)

### Step 3: Add to Environment Variables
Add this to your `.env.local` file:

```bash
# Resend Email Service
RESEND_API_KEY="re_your_api_key_here"

# Other required variables
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
DATABASE_URL="file:./dev.db"
```

### Step 4: Domain Setup (Optional but Recommended)
For production, you can:
1. Add your domain in Resend dashboard
2. Verify DNS records
3. Use `noreply@yourdomain.com` instead of the default

## Alternative Email Services

### 1. **SendGrid** (Popular choice)
```bash
npm install @sendgrid/mail
SENDGRID_API_KEY="your_sendgrid_api_key"
```

### 2. **Mailgun** (Reliable)
```bash
npm install mailgun.js
MAILGUN_API_KEY="your_mailgun_api_key"
MAILGUN_DOMAIN="your_domain"
```

### 3. **Amazon SES** (AWS)
```bash
npm install @aws-sdk/client-ses
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_REGION="us-east-1"
```

## Testing the Setup

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test forgot password**:
   - Go to sign-in page
   - Click "Forgot Password?"
   - Enter an email address
   - Check if email is sent successfully

## Troubleshooting

### Common Issues:
- **"API key not found"**: Make sure `RESEND_API_KEY` is in `.env.local`
- **"Domain not verified"**: Use the default domain for testing
- **"Rate limit exceeded"**: You've hit the free tier limit (3,000/month)

### Environment Variables Check:
```bash
# In your terminal, check if variables are loaded:
echo $RESEND_API_KEY
```

## Production Considerations

1. **Domain Verification**: Add your own domain for better deliverability
2. **Email Templates**: Consider using Resend's template system
3. **Analytics**: Monitor email delivery rates in Resend dashboard
4. **Scaling**: Upgrade plan if you need more than 3,000 emails/month

## Security Benefits

✅ **No personal credentials exposed**
✅ **API key can be revoked anytime**
✅ **Professional email infrastructure**
✅ **Built-in spam protection**
✅ **Delivery tracking and analytics**

---

**Need help?** Check the [Resend documentation](https://resend.com/docs) or contact support.

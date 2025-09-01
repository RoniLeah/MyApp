# Server URL Configuration Guide

## 🚀 Your Current Server Setup

### Production Server URLs ✅
Your app is already configured with production-ready Supabase URLs:

**Supabase Production URL**: `https://bwfqsfqtvmfjobuspsvq.supabase.co`
**Edge Functions Base URL**: `https://bwfqsfqtvmfjobuspsvq.supabase.co/functions/v1/`

### Available Edge Functions:
- `stripe-subscription` - Payment processing
- `analytics-tracker` - User analytics
- `admin-dashboard` - Admin functionality
- `email-marketing` - Email campaigns
- `karaoke-generator` - AI music generation
- `stripe-webhooks` - Payment webhooks

## 🔧 Environment Configuration

### For App Store Submission:
```
PRODUCTION_SERVER_URL=https://bwfqsfqtvmfjobuspsvq.supabase.co
SUPABASE_URL=https://bwfqsfqtvmfjobuspsvq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### For Development/Testing:
```
SANDBOX_SERVER_URL=https://bwfqsfqtvmfjobuspsvq.supabase.co
DEVELOPMENT_MODE=true
```

## 📱 App Store Connect Server URLs

**Production Server URL**: `https://bwfqsfqtvmfjobuspsvq.supabase.co`
**Sandbox Server URL**: `https://bwfqsfqtvmfjobuspsvq.supabase.co`

*Note: You're using the same Supabase instance for both environments with different configurations*

## ✅ Ready to Use
Your server configuration is complete and production-ready!
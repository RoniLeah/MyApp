# App Store Submission Fix Guide

## Required Actions in App Store Connect

### 1. Choose a Build ✅
- Go to App Store Connect > Your App > App Store tab
- Select the build you uploaded from Xcode/EAS Build

### 2. Select Primary Category
- Go to App Information > General Information
- Choose: **Music** or **Productivity** (recommended for audio apps)

### 3. Age Rating Content Descriptions
- Go to App Information > Age Rating
- Set frequency levels for all Apple content descriptions:
  - Most should be "None" for a music production app
  - Set "Unrestricted Web Access" if your app has web features

### 4. Privacy Policy URL ⚠️
**REQUIRED**: You need to host your privacy policy online
- Host the privacy policy at a public URL (e.g., your website)
- Enter URL in App Privacy section
- **Temporary solution**: Use GitHub Pages or similar free hosting

### 5. App Privacy Information
- Go to App Privacy section
- Answer questions about data collection:
  - Contact Info: If you collect email addresses
  - Usage Data: If you track analytics
  - User Content: If users create/save audio files

### 6. Content Rights Information
- Go to App Information > Content Rights
- Declare if your app contains third-party content
- For music app: likely "Yes" if you use samples/loops

### 7. Pricing
- Go to Pricing and Availability
- Set price tier (Free or paid)
- Configure In-App Purchases if applicable

### 8. Required Metadata
Fill in these required fields:
- **Support URL**: Create a support page or use mailto:support@yourdomain.com
- **Keywords**: "music production, audio editing, AI music, sound design"
- **Description**: Write compelling app description

## Privacy Policy Hosting Options

### Option 1: GitHub Pages (Free)
1. Create GitHub repo with privacy-policy.html
2. Enable GitHub Pages
3. Use URL: https://yourusername.github.io/repo-name/privacy-policy.html

### Option 2: Simple Website
Host on Netlify, Vercel, or similar free service

### Option 3: App Store Connect Privacy Policy
Some developers create a simple webpage just for this purpose

## Quick Privacy Policy Template URL
Your app already has privacy policy content in the code. You need to:
1. Copy content from components/PrivacyPolicy.tsx
2. Create HTML version
3. Host it publicly
4. Enter URL in App Store Connect

## Support URL Options
- Create simple contact page
- Use mailto:support@yourdomain.com
- Create GitHub Issues page for support

## Recommended App Category
**Music** - Primary category for audio/music production apps

## Keywords Suggestions
"music production, audio editing, AI music, sound design, recording studio, music creation, audio mixing, music maker"
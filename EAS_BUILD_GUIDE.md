# EAS Build Guide - Create iOS Binary for App Store

## Prerequisites
1. Install EAS CLI: `npm install -g @expo/eas-cli`
2. Login to Expo: `eas login`
3. Apple Developer Program membership
4. Xcode installed (for iOS builds)

## Step 1: Configure EAS Build
Your `eas.json` is already configured. Update these values:
- Replace `your-apple-id@email.com` with your Apple ID
- Replace `your-app-store-connect-app-id` with your App Store Connect app ID
- Replace `your-team-id` with your Apple Developer Team ID

## Step 2: Build for App Store
Run this command in your project directory:
```bash
eas build --platform ios --profile production
```

This will:
- Create a production iOS build
- Generate an .ipa file
- Automatically upload to App Store Connect (if configured)
## 2. Configure Your Apple Team ID

Your `eas.json` file is already configured with your Apple Team ID: **82ANM9C8XT**

If you need to verify or change other settings, update the `eas.json` file in your project root.
Then upload the .ipa file manually through:
- Xcode Organizer, or
- Application Loader, or
- Transporter app

## Step 4: Monitor Build
- Check build status at: https://expo.dev/builds
- Build typically takes 10-15 minutes
- You'll get email notification when complete

## Step 5: Verify in App Store Connect
1. Go to App Store Connect
2. Select your app
3. Go to TestFlight or App Store tab
4. Your build should appear in "iOS Builds" section

## Troubleshooting
- **Build fails?** Check your Apple Developer certificates
- **Upload fails?** Verify your Apple ID and Team ID in eas.json
- **Missing provisioning profile?** EAS will create one automatically

## Quick Commands
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login
eas login

# Build for App Store
eas build --platform ios --profile production

# Check build status
eas build:list
```

Your iOS binary will be ready for App Store submission once the build completes!
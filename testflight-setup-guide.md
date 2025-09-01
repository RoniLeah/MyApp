# TestFlight Setup Guide for SoundForge AI

## Prerequisites
- Your app must be successfully built and uploaded to App Store Connect
- Apple Developer Program membership required
- App Store Connect access

## Step-by-Step TestFlight Setup

### 1. Access TestFlight in App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Sign in with your Apple Developer account
3. Select your SoundForge AI app
4. Click on the "TestFlight" tab

### 2. Select Your Build
1. Under "iOS Builds" section, you'll see your uploaded build
2. Click on the build number you want to test
3. If this is your first TestFlight build, you'll need to complete compliance info

### 3. Export Compliance (Required)
Answer these questions for SoundForge AI:
- **Does your app use encryption?** → YES (HTTPS networking)
- **Does your app qualify for exemption?** → YES (Standard cryptography)
- **Select exemption reason:** → "(a) The app uses standard encryption"

### 4. Add Test Information
- **What to Test:** "Test all music creation features, AI generation, and subscription flow"
- **Test Notes:** "Focus on audio quality, AI responsiveness, and user interface"

### 5. Add Internal Testers
1. Click "Internal Testing" 
2. Click the "+" to add testers
3. Add email addresses of your team members
4. They'll receive TestFlight invitation emails

### 6. Add External Testers (Optional)
1. Click "External Testing"
2. Create a test group
3. Add up to 10,000 external testers
4. Requires App Review (takes 24-48 hours)

### 7. Distribute Build
1. Select your test groups
2. Click "Save"
3. Testers will receive email invitations
4. They can install via TestFlight app

## TestFlight App Requirements
Testers need to:
1. Install TestFlight app from App Store
2. Accept email invitation
3. Install your app through TestFlight

## Testing Checklist for SoundForge AI
- [ ] Audio recording functionality
- [ ] AI music generation
- [ ] Subscription purchase flow
- [ ] Project saving/loading
- [ ] Export features
- [ ] Social sharing
- [ ] Performance on different devices

## Troubleshooting
- **Build not showing?** Check upload status in Xcode Organizer
- **Compliance stuck?** Contact Apple Developer Support
- **Testers can't install?** Verify their Apple ID email matches invitation

Your TestFlight build will be ready for testing once these steps are complete!
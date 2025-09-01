# iOS/macOS Build Error Fix

## Error: Icon.png Missing

The build error `'/Volumes/workspace/repository/StudioForgeAI/StudioForgeAI/Resources/Icon.png'. Did you forget to declare this file as an output of a script phase or custom build rule which produces it?` occurs because Xcode expects actual icon files.

## Quick Fix Options:

### Option 1: Use Expo Prebuild (Recommended)
```bash
# Clean and regenerate native projects
rm -rf ios android
expo prebuild --clean

# This will generate proper native icon files from app.json config
```

### Option 2: Manual Icon Setup
1. Download generated icons from:
   - Main: https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756582542527_13cda323.webp
   - Convert to PNG and place in proper iOS project structure

### Option 3: Temporary Placeholder
Create a simple 1024x1024 PNG file at the expected path:
```bash
# Create Resources directory if it doesn't exist
mkdir -p ios/StudioForgeAI/Resources/

# Copy your icon file there
cp assets/images/icon.png ios/StudioForgeAI/Resources/Icon.png
```

### Option 4: Update Xcode Project
1. Open project in Xcode
2. Select StudioForgeAI target
3. Go to General tab > App Icons and Launch Screen
4. Set App Icon Source to use AppIcon asset catalog instead of individual files

## Root Cause
The error happens when the native iOS project references icon files that don't exist in the expected location. Expo prebuild should resolve this automatically.
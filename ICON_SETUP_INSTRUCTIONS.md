# StudioForgeAI Icon Setup Instructions

## Build Error Fix

The build error occurs because Xcode expects actual PNG image files, but we have placeholder text files.

## Required Actions:

1. **Download the generated icons:**
   - Main icon: https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756582542527_13cda323.webp
   - Adaptive icon: https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756582546682_0b31474f.webp
   - Favicon: https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756582551638_61e79202.webp
   - Splash icon: https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756582555128_232a002a.webp

2. **Convert and replace:**
   - Download each image from the URLs above
   - Convert from WebP to PNG format
   - Replace the placeholder files in assets/images/ with actual PNG files
   - Ensure proper dimensions (1024x1024 for main icon)

3. **Alternative Solution:**
   - Use `expo prebuild` to regenerate native projects with proper icon handling
   - Or use Expo's icon generation service

## Files Created:
- assets/images/icon.png (placeholder)
- assets/images/adaptive-icon.png (placeholder)
- assets/images/favicon.png (placeholder)
- assets/images/splash-icon.png (placeholder)

The .gitignore has been updated to include these assets in version control.
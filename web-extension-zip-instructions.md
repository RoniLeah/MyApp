# StudioForgeAI Safari Web Extension for iOS/macOS

## Overview
This Safari web extension is specifically configured for iOS/macOS integration with Xcode. It provides seamless audio detection and analysis capabilities that connect to your main StudioForgeAI app.

## Xcode Integration
See `XCODE_INTEGRATION.md` for detailed setup instructions.

## Files Included
```
web-extension/
├── manifest.json          # Safari-compatible manifest (v2)
├── popup.html             # iOS/macOS optimized popup UI
├── popup.js               # Safari-specific popup logic
├── content.js             # Audio detection and integration
├── background.js          # Safari background script
├── XCODE_INTEGRATION.md   # Detailed Xcode setup guide
├── REPOSITORY.md          # iOS/macOS app repository info
└── icons/                 # Extension icons (generate these)
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    └── icon-128.png
```

## Key Features for iOS/macOS
- **Safari Compatibility**: Uses manifest v2 for Safari support
- **Native App Integration**: Custom URL scheme support (studioforgeai://)
- **Audio Detection**: Automatically finds audio/video elements on web pages
- **Cross-Platform UI**: Optimized for both iOS and macOS Safari
- **Repository Integration**: Direct links to iOS/macOS app repository

## Building the Extension Package

### 1. Generate Icons
Create the required icon sizes:
- 16x16px for toolbar
- 32x32px for retina toolbar
- 48x48px for extension management
- 128x128px for App Store

### 2. Create Xcode Safari Extension Target
```bash
# In Xcode:
File → New → Target → Safari Extension
# Choose iOS or macOS platform
```

### 3. Copy Extension Files
Copy all web-extension files to your Safari Extension target's Resources folder.

### 4. Configure Bundle Identifier
Set extension bundle ID: `com.yourcompany.studioforgeai.extension`

### 5. Update Manifest
Replace placeholder URLs in manifest.json with your actual repository URL.

## Testing
1. Build your Xcode project
2. Open Safari on iOS/macOS
3. Go to Safari Settings/Preferences → Extensions
4. Enable StudioForgeAI extension
5. Visit a webpage with audio/video content
6. Click extension icon to test functionality

## Distribution
- Include extension with main app submission to App Store
- Extension will be available in Safari after app installation
- Users can enable/disable in Safari settings
2. Select all files EXCEPT `icons/README.md`
3. Create zip archive named `studioforgeai-extension.zip`

### 4. Chrome Web Store Submission Checklist

- [ ] Icons generated and placed in correct directory
- [ ] All files use "StudioForgeAI" branding consistently
- [ ] Zip file is under 10MB
- [ ] No unnecessary files included (only icons/README.md excluded)
- [ ] Extension tested locally before submission

### 5. Testing Before Submission

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `web-extension` folder
4. Test all functionality:
   - Extension icon appears in toolbar
   - Popup opens with StudioForgeAI branding
   - Content script functions work on web pages

## Chrome Web Store Listing Details

- **Name**: StudioForgeAI
- **Description**: AI-powered music creation and customization platform
- **Category**: Productivity
- **Version**: 1.0.0

The extension is ready for Chrome Web Store submission once icons are added!
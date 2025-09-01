# Xcode Safari Extension Integration Guide

## Overview
This guide explains how to integrate the StudioForgeAI web extension into your iOS/macOS Xcode project using Safari App Extensions.

## Prerequisites
- Xcode 12.0 or later
- iOS 14.0+ / macOS 11.0+ deployment target
- Valid Apple Developer Account
- Safari App Extension template

## Integration Steps

### 1. Create Safari App Extension Target
```bash
# In Xcode, add new target:
File → New → Target → Safari Extension (iOS/macOS)
```

### 2. Copy Web Extension Files
Copy these files to your Safari Extension target:
```
YourApp Safari Extension/
├── Resources/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── content.js
│   ├── background.js
│   └── icons/
│       ├── icon-16.png
│       ├── icon-32.png
│       ├── icon-48.png
│       └── icon-128.png
```

### 3. Update Info.plist
Add to your Safari Extension's Info.plist:
```xml
<key>NSExtension</key>
<dict>
    <key>NSExtensionPointIdentifier</key>
    <string>com.apple.Safari.web-extension</string>
    <key>NSExtensionPrincipalClass</key>
    <string>$(PRODUCT_MODULE_NAME).SafariWebExtensionHandler</string>
</dict>
```

### 4. Configure App Groups (Optional)
For data sharing between main app and extension:
```xml
<key>com.apple.security.application-groups</key>
<array>
    <string>group.com.yourcompany.studioforgeai</string>
</array>
```

### 5. Update Main App
Add extension management to your main app:
```swift
import SafariServices

// Enable extension
SFSafariExtensionManager.getStateOfSafariExtension(
    withIdentifier: "com.yourcompany.studioforgeai.extension"
) { state, error in
    // Handle extension state
}
```

## Build Configuration

### Deployment Targets
- iOS: 14.0+
- macOS: 11.0+

### Capabilities Required
- App Groups (for data sharing)
- Safari Extensions

### Code Signing
Ensure both main app and extension have proper provisioning profiles.

## Testing

### iOS Simulator
1. Build and run your app
2. Open Safari → Settings → Extensions
3. Enable StudioForgeAI extension
4. Test on web pages with audio content

### macOS
1. Build and run your app
2. Open Safari → Preferences → Extensions
3. Enable StudioForgeAI extension
4. Test functionality

## Distribution

### App Store Requirements
- Both main app and extension must be signed
- Extension capabilities must match main app
- Follow Safari Extension guidelines

### TestFlight
Extensions work in TestFlight builds for testing.

## Troubleshooting

### Common Issues
1. **Extension not appearing**: Check bundle identifier and Info.plist
2. **Content script not loading**: Verify manifest permissions
3. **Communication failing**: Check message passing implementation

### Debug Console
Use Safari's Web Inspector to debug extension:
Safari → Develop → [Your Extension] → Background Page/Content Script

## Custom URL Scheme Integration
Add to main app's Info.plist for deep linking:
```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>StudioForgeAI</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>studioforgeai</string>
        </array>
    </dict>
</array>
```

## Next Steps
1. Customize extension UI to match your app design
2. Implement native message passing
3. Add audio analysis features
4. Test across different websites
5. Submit to App Store with extension enabled
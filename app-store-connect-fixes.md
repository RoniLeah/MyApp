# Fix App Store Connect Issues

## Immediate Actions Required

### 1. Choose a Build ✅
- In App Store Connect, go to your app
- Click "App Store" tab
- Under "Build", select your uploaded build

### 2. Select Primary Category ✅
- Go to "App Information" > "General Information"
- **Primary Category**: Music
- **Secondary Category**: Productivity (optional)

### 3. Age Rating Setup ✅
- Go to "App Information" > "Age Rating"
- Answer questionnaire - for StudioForgeAI:
  - Simulated Gambling: None
  - Medical/Treatment Info: None
  - Alcohol/Tobacco/Drug Use: None
  - Sexual Content/Nudity: None
  - Profanity/Crude Humor: None
  - Horror/Fear Themes: None
  - Mature/Suggestive Themes: None
  - Violence: None
  - Unrestricted Web Access: Yes (if app has web features)
  - Gambling/Contests: None

### 4. Privacy Policy URL ⚠️ CRITICAL
**You MUST host your privacy policy online**

**Quick Solution - GitHub Pages:**
1. Go to GitHub.com
2. Create new repository: "studioforgeai-privacy"
3. Upload the privacy-policy.html file (already in your project)
4. Enable GitHub Pages in Settings
5. Use URL: `https://yourusername.github.io/studioforgeai-privacy/privacy-policy.html`

**Alternative - Netlify (5 min setup):**
1. Go to netlify.com
2. Drag & drop your privacy-policy.html file
3. Get instant URL like: `https://amazing-name-123456.netlify.app/privacy-policy.html`

### 5. Support URL ⚠️ REQUIRED
**Current Error**: Support URL field is required

**Quick Fix Options:**
- Use: `mailto:support@studioforgeai.com`
- Or create simple contact page and host it
- Or use: `https://github.com/yourusername/studioforgeai/issues`

### 6. App Privacy Information ✅
- Go to "App Privacy" section
- Answer data collection questions:
  - **Contact Info**: No (unless you collect emails)
  - **User Content**: Yes (users create audio files)
  - **Usage Data**: Yes (if you use analytics)
  - **Diagnostics**: No

### 7. Content Rights Information ✅
- Go to "App Information" > "Content Rights"
- **Question**: Does your app contain third-party content?
- **Answer**: Yes (if using AI models/samples) or No
- If Yes, specify you have rights to use the content

## Priority Order (Do These First):

1. **Host Privacy Policy** - Upload privacy-policy.html to GitHub Pages
2. **Add Support URL** - Use mailto:support@studioforgeai.com
3. **Set App Category** - Music (primary)
4. **Complete Age Rating** - Answer all questions (mostly "None")
5. **Choose Build** - Select your uploaded build

## Ready-to-Use Content:

**Support URL**: `mailto:support@studioforgeai.com`
**Category**: Music
**Keywords**: `music production,audio editing,AI music,sound design,recording studio,music creation,audio mixing,music maker,beats,songs`

Once these are complete, the "Add for Review" button will be enabled!
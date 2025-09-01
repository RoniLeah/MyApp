// Safari Web Extension Background Script for iOS/macOS
console.log('StudioForgeAI Safari Extension loaded');

// Handle browser action clicks (Safari compatibility)
if (typeof browser !== 'undefined' && browser.browserAction) {
  browser.browserAction.onClicked.addListener((tab) => {
    console.log('Extension clicked on tab:', tab.id);
  });
} else if (typeof chrome !== 'undefined' && chrome.browserAction) {
  chrome.browserAction.onClicked.addListener((tab) => {
    console.log('Extension clicked on tab:', tab.id);
  });
}

// Message handling for content scripts
const handleMessage = (message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  switch (message.type) {
    case 'ANALYZE_AUDIO':
      // Handle audio analysis requests
      sendResponse({ success: true, data: 'Audio analysis started' });
      break;
    case 'OPEN_APP':
      // Open iOS/macOS app if available
      if (typeof browser !== 'undefined') {
        browser.tabs.create({ url: 'https://github.com/your-username/studioforgeai-ios' });
      }
      break;
    default:
      sendResponse({ success: false, error: 'Unknown message type' });
  }
  
  return true; // Keep message channel open for async response
};

// Set up message listeners (Safari compatibility)
if (typeof browser !== 'undefined' && browser.runtime) {
  browser.runtime.onMessage.addListener(handleMessage);
} else if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener(handleMessage);
}
// Safari Extension Popup Script for iOS/macOS
console.log('StudioForgeAI Safari popup loaded');

// Safari-compatible API wrapper
const getAPI = () => {
  if (typeof browser !== 'undefined') {
    return browser;
  } else if (typeof chrome !== 'undefined') {
    return chrome;
  }
  return null;
};

// Send message to background script
const sendMessage = (message) => {
  const api = getAPI();
  if (api && api.runtime) {
    return api.runtime.sendMessage(message);
  }
  return Promise.reject('No API available');
};

// Get current active tab
const getCurrentTab = () => {
  const api = getAPI();
  if (api && api.tabs) {
    return new Promise((resolve, reject) => {
      api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
          resolve(tabs[0]);
        } else {
          reject('No active tab found');
        }
      });
    });
  }
  return Promise.reject('No tabs API available');
};

// Initialize popup functionality
document.addEventListener('DOMContentLoaded', () => {
  // Open iOS/macOS App button
  const openAppBtn = document.getElementById('openApp');
  if (openAppBtn) {
    openAppBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Try to open native app first, fallback to repository
      const appScheme = 'studioforgeai://';
      const fallbackUrl = 'https://github.com/your-username/studioforgeai-ios';
      
      // For iOS Safari, try custom URL scheme
      if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        window.location.href = appScheme;
        setTimeout(() => {
          window.open(fallbackUrl, '_blank');
        }, 1000);
      } else {
        // For macOS, open repository
        window.open(fallbackUrl, '_blank');
      }
      
      sendMessage({ type: 'OPEN_APP' }).catch(console.error);
    });
  }
  
  // Analyze Audio button
  const analyzeBtn = document.getElementById('analyzeAudio');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      getCurrentTab().then((tab) => {
        const api = getAPI();
        if (api && api.tabs) {
          // Execute content script to analyze audio
          api.tabs.executeScript(tab.id, {
            code: `
              const audioElements = document.querySelectorAll('audio, video');
              const count = audioElements.length;
              console.log('Found ' + count + ' audio elements');
              count;
            `
          }, (results) => {
            if (results && results[0]) {
              alert(\`Found \${results[0]} audio elements on this page\`);
            } else {
              alert('No audio elements found on this page');
            }
          });
        }
      }).catch((error) => {
        console.error('Error analyzing page:', error);
        alert('Could not analyze current page');
      });
    });
  }
  
  // Repository link (already handled by href)
  console.log('Popup initialized for Safari on iOS/macOS');
});
// Safari Web Extension Content Script for iOS/macOS
console.log('StudioForgeAI Safari content script loaded');

// Safari-compatible message sending
const sendMessage = (message) => {
  if (typeof browser !== 'undefined' && browser.runtime) {
    return browser.runtime.sendMessage(message);
  } else if (typeof chrome !== 'undefined' && chrome.runtime) {
    return chrome.runtime.sendMessage(message);
  }
  return Promise.reject('No runtime available');
};

// Detect audio elements on the page
const detectAudioElements = () => {
  const audioElements = document.querySelectorAll('audio, video');
  const audioData = Array.from(audioElements).map(el => ({
    src: el.src || el.currentSrc,
    duration: el.duration,
    type: el.tagName.toLowerCase()
  }));
  
  if (audioData.length > 0) {
    console.log('Found audio elements:', audioData);
    sendMessage({
      type: 'AUDIO_DETECTED',
      data: audioData
    }).catch(console.error);
  }
};

// Add StudioForgeAI integration button to audio players
const addIntegrationButton = (audioElement) => {
  if (audioElement.dataset.studioForgeAdded) return;
  
  const button = document.createElement('button');
  button.textContent = '🎵 StudioForge';
  button.style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 9999;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 12px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  
  button.onclick = () => {
    sendMessage({
      type: 'ANALYZE_AUDIO',
      data: { src: audioElement.src || audioElement.currentSrc }
    }).catch(console.error);
  };
  
  const container = audioElement.parentElement;
  if (container) {
    container.style.position = 'relative';
    container.appendChild(button);
    audioElement.dataset.studioForgeAdded = 'true';
  }
};

// Initialize on page load
const init = () => {
  detectAudioElements();
  
  // Add buttons to existing audio elements
  document.querySelectorAll('audio, video').forEach(addIntegrationButton);
  
  // Watch for new audio elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const audioElements = node.querySelectorAll ? 
            node.querySelectorAll('audio, video') : [];
          audioElements.forEach(addIntegrationButton);
        }
      });
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
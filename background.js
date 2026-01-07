/**
 * Background Service Worker
 * Handles extension lifecycle and messaging
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log('WCAG Color Contrast Checker installed');
});

// Listen for tab updates to trigger analysis
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    // Page loaded, content script will auto-analyze
  }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getActiveTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] });
    });
    return true;
  }
});

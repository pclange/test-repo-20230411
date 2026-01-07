/**
 * Content Script - Analyzes page colors and contrast ratios
 * Runs on all web pages to detect text and color combinations
 */

(function() {
  'use strict';

  const colorPairs = [];
  const processedElements = new Set();

  /**
   * Gets the effective background color of an element
   * Traverses up the DOM tree to find first non-transparent background
   */
  function getEffectiveBackgroundColor(element) {
    let current = element;
    while (current && current !== document.body.parentElement) {
      const style = window.getComputedStyle(current);
      const bgColor = style.backgroundColor;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return bgColor;
      }
      current = current.parentElement;
    }
    // Default to white if no background found
    return 'rgb(255, 255, 255)';
  }

  /**
   * Determines if an element is visible
   */
  function isElementVisible(element) {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' 
      && style.visibility !== 'hidden' 
      && style.opacity !== '0'
      && element.offsetWidth > 0 
      && element.offsetHeight > 0;
  }

  /**
   * Gets font size in pixels
   */
  function getFontSize(element) {
    const style = window.getComputedStyle(element);
    return parseFloat(style.fontSize);
  }

  /**
   * Checks if text is bold
   */
  function isBold(element) {
    const style = window.getComputedStyle(element);
    const weight = parseInt(style.fontWeight);
    return weight >= 700;
  }

  /**
   * Analyzes a single text element
   */
  function analyzeElement(element) {
    if (!isElementVisible(element)) return;
    if (processedElements.has(element)) return;
    
    // Only process elements with actual text content
    const text = element.textContent.trim();
    if (!text) return;

    processedElements.add(element);

    const style = window.getComputedStyle(element);
    const fgColor = style.color;
    const bgColor = getEffectiveBackgroundColor(element);
    
    const fgRgb = ContrastCalculator.parseColor(fgColor);
    const bgRgb = ContrastCalculator.parseColor(bgColor);

    if (!fgRgb || !bgRgb) return;

    const fontSize = getFontSize(element);
    const bold = isBold(element);
    const ratio = ContrastCalculator.getContrastRatio(fgRgb, bgRgb);
    const compliance = ContrastCalculator.evaluateCompliance(ratio, fontSize, bold);

    const colorPairKey = `${ContrastCalculator.rgbToHex(fgRgb)}-${ContrastCalculator.rgbToHex(bgRgb)}`;
    
    // Check if this color pair already exists
    const existing = colorPairs.find(pair => pair.key === colorPairKey);
    
    if (existing) {
      existing.count++;
      // Track different font sizes for this pair
      if (!existing.fontSizes.includes(fontSize)) {
        existing.fontSizes.push(fontSize);
      }
    } else {
      colorPairs.push({
        key: colorPairKey,
        foreground: {
          rgb: fgRgb,
          hex: ContrastCalculator.rgbToHex(fgRgb),
          css: fgColor
        },
        background: {
          rgb: bgRgb,
          hex: ContrastCalculator.rgbToHex(bgRgb),
          css: bgColor
        },
        ratio: ratio,
        compliance: compliance,
        fontSize: fontSize,
        isBold: bold,
        fontSizes: [fontSize],
        count: 1,
        sampleText: text.substring(0, 50) + (text.length > 50 ? '...' : '')
      });
    }
  }

  /**
   * Analyzes all text elements on the page
   */
  function analyzePage() {
    processedElements.clear();
    colorPairs.length = 0;

    // Find all text-containing elements
    const textElements = document.querySelectorAll('p, span, div, a, button, h1, h2, h3, h4, h5, h6, li, td, th, label, input, textarea');
    
    textElements.forEach(element => {
      try {
        analyzeElement(element);
      } catch (e) {
        console.warn('Error analyzing element:', e);
      }
    });

    // Store results
    chrome.storage.local.set({
      colorPairs: colorPairs,
      url: window.location.href,
      timestamp: Date.now()
    });

    return colorPairs;
  }

  /**
   * Listen for messages from popup
   */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyze') {
      const results = analyzePage();
      sendResponse({
        success: true,
        colorPairs: results,
        url: window.location.href
      });
    }
    return true;
  });

  // Auto-analyze on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', analyzePage);
  } else {
    analyzePage();
  }

})();

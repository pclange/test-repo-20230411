/**
 * WCAG Color Contrast Calculator
 * Implements WCAG 2.1 contrast ratio calculations
 */

class ContrastCalculator {
  /**
   * Converts a color value to relative luminance
   * @param {number} val - RGB color value (0-255)
   * @returns {number} Linearized color value
   */
  static linearizeColorValue(val) {
    const sRGB = val / 255;
    return sRGB <= 0.03928 
      ? sRGB / 12.92 
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  }

  /**
   * Calculates relative luminance for an RGB color
   * @param {Object} rgb - Object with r, g, b properties (0-255)
   * @returns {number} Relative luminance (0-1)
   */
  static getRelativeLuminance(rgb) {
    const R = this.linearizeColorValue(rgb.r);
    const G = this.linearizeColorValue(rgb.g);
    const B = this.linearizeColorValue(rgb.b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  /**
   * Calculates contrast ratio between two colors
   * @param {Object} color1 - First RGB color {r, g, b}
   * @param {Object} color2 - Second RGB color {r, g, b}
   * @returns {number} Contrast ratio (1-21)
   */
  static getContrastRatio(color1, color2) {
    const L1 = this.getRelativeLuminance(color1);
    const L2 = this.getRelativeLuminance(color2);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Evaluates WCAG compliance for a contrast ratio
   * @param {number} ratio - Contrast ratio
   * @param {number} fontSize - Font size in pixels
   * @param {boolean} isBold - Whether text is bold
   * @param {string} type - Element type: 'text' or 'ui'
   * @returns {Object} Compliance results
   */
  static evaluateCompliance(ratio, fontSize, isBold, type = 'text') {
    if (type === 'ui') {
      return {
        type: 'ui',
        ratio: ratio,
        AA: ratio >= 3.0,
        AAA: ratio >= 3.0,
        isLargeText: false,
        requirements: {
          AA: 3.0,
          AAA: 3.0
        }
      };
    }

    // Determine if text is "large" according to WCAG
    const isLargeText = (fontSize >= 24) || (fontSize >= 18.66 && isBold);
    
    let aaRequired, aaaRequired;
    if (isLargeText) {
      aaRequired = 3.0;
      aaaRequired = 4.5;
    } else {
      aaRequired = 4.5;
      aaaRequired = 7.0;
    }

    return {
      type: 'text',
      ratio: ratio,
      AA: ratio >= aaRequired,
      AAA: ratio >= aaaRequired,
      isLargeText: isLargeText,
      requirements: {
        AA: aaRequired,
        AAA: aaaRequired
      }
    };
  }

  /**
   * Parses various color formats to RGB
   * @param {string} colorString - Color in hex, rgb, rgba, hsl, or hsla format
   * @returns {Object|null} RGB object {r, g, b} or null if invalid
   */
  static parseColor(colorString) {
    if (!colorString) return null;

    // Create temporary element to compute color
    const temp = document.createElement('div');
    temp.style.color = colorString;
    document.body.appendChild(temp);
    const computed = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);

    // Parse rgb/rgba format
    const rgbMatch = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3])
      };
    }

    return null;
  }

  /**
   * Converts RGB to hex format
   * @param {Object} rgb - RGB object {r, g, b}
   * @returns {string} Hex color string
   */
  static rgbToHex(rgb) {
    const toHex = (n) => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }

  /**
   * Formats contrast ratio for display
   * @param {number} ratio - Contrast ratio
   * @returns {string} Formatted ratio
   */
  static formatRatio(ratio) {
    return `${ratio.toFixed(2)}:1`;
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.ContrastCalculator = ContrastCalculator;
}

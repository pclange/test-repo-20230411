# WCAG Color Contrast Checker

A browser extension that automatically checks color contrast ratios on web pages and validates compliance with WCAG 2.1 accessibility standards.

## Features

- **Automatic Color Detection**: Analyzes all text elements on web pages to detect foreground and background color combinations
- **Contrast Ratio Calculation**: Implements WCAG 2.1 contrast ratio formula using relative luminance
- **WCAG 2.1 Compliance Evaluation**: 
  - AA Level: 4.5:1 for normal text, 3:1 for large text
  - AAA Level: 7:1 for normal text, 4.5:1 for large text
  - UI Components: 3:1 minimum contrast ratio
- **Large Text Detection**: Automatically identifies large text (18pt/24px or 14pt/18.66px bold)
- **Visual Results Display**: Clean, intuitive UI showing all detected color pairs with pass/fail indicators
- **Color Format Support**: Works with hex, RGB, RGBA, HSL, and HSLA color formats
- **Real-time Analysis**: Analyze pages on demand or automatically when loaded
- **Filter Options**: View all results or filter to show only failures or passes

## Installation

### Chrome/Edge Installation

1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension directory (containing `manifest.json`)
6. The extension icon will appear in your browser toolbar

### Firefox Installation

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension directory
5. The extension will be loaded temporarily (for permanent installation, the extension needs to be signed)

## Usage

1. **Navigate to any web page** you want to analyze
2. **Click the extension icon** in your browser toolbar
3. The extension will automatically analyze the page and display results
4. **Review the results**:
   - View summary statistics (total pairs, AA pass, AAA pass, failures)
   - See each color combination with its contrast ratio
   - Check AA and AAA compliance badges
   - View sample text and element details
5. **Use filters** to show only failures or all results
6. **Click "Re-analyze Page"** to refresh the analysis after page changes

## Understanding the Results

### Contrast Ratio
- Ranges from 1:1 (no contrast) to 21:1 (maximum contrast)
- Higher ratios mean better contrast and readability

### WCAG 2.1 Levels

#### AA Level (Minimum)
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text**: 3:1 minimum contrast ratio
- **UI Components**: 3:1 minimum contrast ratio

#### AAA Level (Enhanced)
- **Normal Text**: 7:1 minimum contrast ratio
- **Large Text**: 4.5:1 minimum contrast ratio
- **UI Components**: 3:1 minimum contrast ratio

### Text Size Classification
- **Large Text**: 
  - 18 points (24px) or larger
  - 14 points (18.66px) or larger when bold
- **Normal Text**: Anything smaller than large text

## Technical Details

### Contrast Calculation Algorithm

The extension implements the official WCAG 2.1 contrast ratio formula:

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
```

Where:
- L1 = relative luminance of the lighter color
- L2 = relative luminance of the darker color

### Relative Luminance Calculation

For the sRGB colorspace:

```
L = 0.2126 × R + 0.7152 × G + 0.0722 × B
```

Where R, G, and B are gamma-corrected values:
- If RsRGB ≤ 0.03928: R = RsRGB / 12.92
- Else: R = ((RsRGB + 0.055) / 1.055)^2.4

The same formula applies to G and B components.

## File Structure

```
wcag-contrast-checker/
├── manifest.json           # Extension manifest (Manifest V3)
├── background.js          # Background service worker
├── content.js             # Content script for page analysis
├── contrast.js            # Contrast calculation library
├── popup.html             # Extension popup UI
├── popup.js               # Popup UI logic
├── popup.css              # Popup styling
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Browser Compatibility

- **Chrome**: Version 88+ (Manifest V3 support)
- **Edge**: Version 88+ (Chromium-based)
- **Firefox**: Version 109+ (Manifest V3 support)
- **Opera**: Version 74+ (Chromium-based)

## Limitations

- Cannot analyze:
  - Browser internal pages (chrome://, about:, etc.)
  - Images and background images with text overlays
  - Canvas-rendered text
  - Shadow DOM content (in some cases)
- May not detect all color combinations on dynamically loaded content
- Requires page refresh for single-page applications that change content

## Privacy

This extension:
- Does NOT collect any personal data
- Does NOT track your browsing history
- Does NOT send data to external servers
- Only analyzes the current page when you click the extension icon
- Stores analysis results locally in your browser

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding Contrast (WCAG)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Contrast Ratio Formula](https://www.w3.org/WAI/GL/wiki/Contrast_ratio)
- [Relative Luminance](https://www.w3.org/WAI/GL/wiki/Relative_luminance)

## License

This project is provided as-is for educational and accessibility testing purposes.

## Version History

### 1.0.0 (Initial Release)
- Automatic color detection and analysis
- WCAG 2.1 AA and AAA compliance checking
- Support for multiple color formats
- Interactive popup UI with filtering
- Real-time page analysis

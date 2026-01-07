# Installation Guide

This guide will help you install and configure the WCAG Color Contrast Checker browser extension.

## Prerequisites

- A modern web browser (Chrome, Edge, Firefox, or Opera)
- Basic understanding of browser extension installation

## Chrome/Edge Installation (Recommended)

### Step 1: Download the Extension

1. Download or clone this repository to your local machine
2. Extract the files if downloaded as a ZIP
3. Note the location of the folder containing `manifest.json`

### Step 2: Enable Developer Mode

1. Open Chrome or Edge browser
2. Navigate to the extensions page:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
3. In the top-right corner, toggle the **"Developer mode"** switch to ON
   - You should see additional options appear

### Step 3: Load the Extension

1. Click the **"Load unpacked"** button (appears after enabling Developer mode)
2. Browse to and select the folder containing the extension files
3. Make sure you select the folder that contains `manifest.json`, not a parent folder
4. Click **"Select Folder"** or **"Open"**

### Step 4: Verify Installation

1. The extension should now appear in your extensions list
2. Look for the extension icon in your browser toolbar
   - If you don't see it, click the puzzle piece icon (Extensions menu)
   - Pin the extension to your toolbar for easy access
3. The extension is now ready to use!

## Firefox Installation

### Temporary Installation (For Testing)

1. Open Firefox browser
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on..."**
4. Browse to the extension folder and select the `manifest.json` file
5. Click **"Open"**
6. The extension will be loaded temporarily (removed when browser closes)

### Permanent Installation (Requires Signing)

For permanent installation in Firefox:
1. The extension must be signed by Mozilla
2. Visit [Mozilla Add-on Developer Hub](https://addons.mozilla.org/developers/)
3. Create a developer account
4. Submit the extension for review and signing
5. Once approved, it can be installed permanently

**Note**: For personal use, the temporary installation method works well.

## Opera Installation

Opera uses the Chromium engine and can install Chrome extensions:

1. Open Opera browser
2. Navigate to `opera://extensions/`
3. Enable **"Developer mode"** in the top-right corner
4. Click **"Load unpacked"**
5. Select the extension folder containing `manifest.json`
6. The extension is now installed

## Verifying Installation

After installation, test the extension:

1. Open the included `test-page.html` file in your browser
   - Right-click the file → "Open with" → Select your browser
2. Click the extension icon in your toolbar
3. You should see the analysis results popup
4. Verify that various color combinations are detected and analyzed

## Troubleshooting

### Extension Icon Not Visible

**Problem**: The extension icon doesn't appear in the toolbar.

**Solution**:
1. Click the puzzle piece icon (Extensions menu) in the toolbar
2. Find "WCAG Color Contrast Checker" in the list
3. Click the pin icon next to it to pin it to the toolbar

### "Errors" Warning After Loading

**Problem**: Chrome shows an "Errors" warning on the extension.

**Solution**:
1. Click "Errors" to see details
2. Common issues:
   - Missing icon files: Ensure all icon files are in the `icons/` folder
   - Manifest errors: Verify `manifest.json` is not corrupted
3. Fix the reported issues and reload the extension

### "Cannot analyze page" Error

**Problem**: Extension shows error when trying to analyze a page.

**Solution**:
1. Refresh the web page you're trying to analyze
2. Ensure the page is not a browser internal page (chrome://, about://, etc.)
3. Check browser console for JavaScript errors
4. Try uninstalling and reinstalling the extension

### Extension Not Working on Some Sites

**Problem**: Extension doesn't work on certain websites.

**Reasons**:
- Browser internal pages cannot be analyzed (chrome://, edge://, about://)
- Some sites block content scripts
- HTTPS security may prevent analysis on HTTP pages

**Solution**:
- This is expected behavior for security reasons
- Try the extension on regular web pages

### Content Script Not Loading

**Problem**: Clicking the extension shows "Unable to analyze page. Please refresh and try again."

**Solution**:
1. Refresh the web page (F5 or Ctrl/Cmd+R)
2. If the problem persists, reload the extension:
   - Go to extensions page
   - Click the refresh icon on the extension card
3. Close and reopen the browser if needed

## Updating the Extension

When updates are available:

1. Navigate to the extensions page
2. Find "WCAG Color Contrast Checker"
3. Click the refresh/reload icon
4. The extension will reload with any new changes

## Uninstalling the Extension

To remove the extension:

1. Go to the extensions page
2. Find "WCAG Color Contrast Checker"
3. Click **"Remove"** or the trash icon
4. Confirm the removal

## Security Notes

- This extension only runs when you explicitly click the icon
- No data is sent to external servers
- All analysis happens locally in your browser
- The extension only has access to pages you're viewing when you activate it
- Extension permissions are minimal and necessary for functionality

## Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review the README.md file for usage information
3. Check the browser console for error messages
4. Verify you're using a supported browser version
5. Try the extension on the included test-page.html first

## Browser Version Requirements

- **Chrome**: Version 88 or later
- **Edge**: Version 88 or later (Chromium-based)
- **Firefox**: Version 109 or later
- **Opera**: Version 74 or later

To check your browser version:
- **Chrome**: `chrome://version/`
- **Edge**: `edge://version/`
- **Firefox**: `about:support`
- **Opera**: `opera://about/`

## Advanced Configuration

### Permissions Explained

The extension requires these permissions:

- **activeTab**: Access the current tab when you click the extension icon
- **scripting**: Inject the analysis script into web pages
- **storage**: Save analysis results locally

These are the minimum permissions needed for functionality.

### Content Security Policy

The extension follows Manifest V3 security standards:
- No remote code execution
- No inline scripts
- All code is contained within the extension

## Next Steps

After successful installation:

1. Read the README.md for usage instructions
2. Try the extension on test-page.html
3. Start analyzing real websites for accessibility
4. Report any issues or suggestions for improvement

---

**Need more help?** Check the README.md file for detailed usage information and technical details.

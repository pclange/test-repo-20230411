# WCAG Color Contrast Checker - Quick Reference

## Quick Start

1. **Install**: Load unpacked extension from `chrome://extensions/`
2. **Use**: Click extension icon on any webpage
3. **Analyze**: View color contrast results instantly

## WCAG Standards at a Glance

### Contrast Ratios

| Level | Normal Text | Large Text | UI Components |
|-------|-------------|------------|---------------|
| **AA** | 4.5:1 | 3:1 | 3:1 |
| **AAA** | 7:1 | 4.5:1 | 3:1 |

### Text Size Definitions

- **Normal Text**: Less than 18pt (24px) or 14pt (18.66px) bold
- **Large Text**: 18pt+ (24px+) or 14pt+ (18.66px+) bold

## Understanding Results

### Badges

- 🟢 **AA/AAA Green**: Passes the standard
- 🔴 **AA/AAA Red**: Fails the standard

### Contrast Ratio Scale

```
1:1  ───────────────────────────────────────> 21:1
Worst                                         Perfect
```

- **21:1**: Black on white (perfect)
- **7:1+**: AAA pass for normal text
- **4.5:1+**: AA pass for normal text
- **3:1+**: AA pass for large text / UI components
- **< 3:1**: Fails all standards

## Common Issues & Solutions

### Problem: Low Contrast Text

**Symptoms**: 
- Ratio < 4.5:1 for normal text
- Red badge for AA compliance

**Solutions**:
1. Darken text color or lighten background
2. Use larger or bold text (if ratio ≥ 3:1)
3. Aim for 4.5:1+ (AA) or 7:1+ (AAA)

### Problem: Cannot Analyze Page

**Cause**: Browser internal pages (chrome://, about://)

**Solution**: Use extension on regular websites only

### Problem: Missing Color Pairs

**Cause**: Dynamic content, shadow DOM, or canvas elements

**Solution**: 
1. Re-analyze after page fully loads
2. Some elements may not be detectable (limitation)

## Color Contrast Tips

### Good Combinations (High Contrast)

✅ Black (#000000) on White (#FFFFFF) - 21:1
✅ Dark Blue (#00008B) on White (#FFFFFF) - 12.6:1
✅ White (#FFFFFF) on Dark Gray (#4A4A4A) - 7.9:1

### Poor Combinations (Low Contrast)

❌ Light Gray (#D3D3D3) on White (#FFFFFF) - 1.6:1
❌ Yellow (#FFFF00) on White (#FFFFFF) - 1.1:1
❌ Light Blue (#87CEEB) on White (#FFFFFF) - 2.8:1

## Keyboard Shortcuts

No keyboard shortcuts currently implemented.

## Browser Support

| Browser | Min Version | Status |
|---------|-------------|--------|
| Chrome | 88+ | ✅ Full Support |
| Edge | 88+ | ✅ Full Support |
| Firefox | 109+ | ✅ Full Support |
| Opera | 74+ | ✅ Full Support |

## File Descriptions

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration |
| `background.js` | Service worker |
| `content.js` | Page analysis |
| `contrast.js` | Calculation engine |
| `popup.html` | UI layout |
| `popup.js` | UI logic |
| `popup.css` | UI styling |
| `icons/` | Extension icons |

## Formulas Used

### Contrast Ratio

```
CR = (L1 + 0.05) / (L2 + 0.05)
```
Where L1 = lighter color, L2 = darker color

### Relative Luminance

```
L = 0.2126 × R + 0.7152 × G + 0.0722 × B
```

### Gamma Correction (per channel)

```
if (sRGB ≤ 0.03928)
    Linear = sRGB / 12.92
else
    Linear = ((sRGB + 0.055) / 1.055) ^ 2.4
```

## Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Extension not loading | Reload extension on extensions page |
| No icon in toolbar | Pin extension from extensions menu |
| Analysis fails | Refresh the webpage |
| Results seem wrong | Re-analyze the page |
| Can't analyze page | Check if it's a chrome:// page |

## Performance Notes

- **Fast**: Small pages (< 1000 elements) - Instant
- **Normal**: Medium pages (1000-5000 elements) - 1-2 seconds
- **Slow**: Large pages (5000+ elements) - 2-5 seconds

## Privacy & Security

✅ No data collection
✅ No external requests
✅ Local storage only
✅ Minimal permissions
✅ Open source

## Useful Links

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

## Quick Commands

```bash
# Package extension
./package.sh

# Create icons (if missing)
cd icons && ./create_icons.sh
```

## Support

- 📖 Read: [README.md](README.md)
- 🚀 Install: [INSTALLATION.md](INSTALLATION.md)
- 🤝 Contribute: [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Version**: 1.0.0
**Last Updated**: 2025

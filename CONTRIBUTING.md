# Contributing to WCAG Color Contrast Checker

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

1. **Clear title**: Brief description of the issue
2. **Description**: Detailed explanation of the problem
3. **Steps to reproduce**: How to recreate the bug
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happens
6. **Browser & version**: Which browser and version you're using
7. **Screenshots**: If applicable

### Suggesting Features

Feature suggestions are welcome! Please include:

1. **Use case**: Why this feature would be useful
2. **Description**: Detailed explanation of the feature
3. **Examples**: How it would work in practice
4. **Alternatives**: Other solutions you've considered

### Code Contributions

#### Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test thoroughly
6. Submit a pull request

#### Development Setup

1. Install the extension in developer mode (see INSTALLATION.md)
2. Make changes to the code
3. Reload the extension in your browser to see changes
4. Test on the included test-page.html and real websites

#### Code Style

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Use meaningful variable and function names
- Follow existing code patterns
- Keep functions focused and single-purpose

#### File Structure

```
wcag-contrast-checker/
├── manifest.json       # Extension configuration
├── background.js      # Background service worker
├── content.js         # Page analysis script
├── contrast.js        # Contrast calculation library
├── popup.html         # UI structure
├── popup.js           # UI logic
├── popup.css          # UI styling
└── icons/             # Extension icons
```

#### Key Components

**contrast.js**: Core calculation library
- Implements WCAG 2.1 formulas
- Should have no dependencies
- Must be accurate and well-tested

**content.js**: Page analysis
- Detects colors on web pages
- Identifies text elements
- Collects font information
- Must handle various DOM structures

**popup.js**: User interface
- Displays results
- Handles user interactions
- Communicates with content script

**background.js**: Service worker
- Manages extension lifecycle
- Handles message passing
- Minimal logic (Manifest V3 requirement)

#### Testing Your Changes

1. **Manual Testing**:
   - Test on test-page.html
   - Test on various real websites
   - Test different color formats (hex, RGB, HSL)
   - Test edge cases (transparent backgrounds, nested elements)

2. **Browser Compatibility**:
   - Test in Chrome/Edge
   - Test in Firefox if possible
   - Verify Manifest V3 compatibility

3. **Performance**:
   - Test on pages with many elements
   - Ensure reasonable analysis time
   - Check memory usage

#### Submitting Pull Requests

1. **Before submitting**:
   - Test your changes thoroughly
   - Update documentation if needed
   - Follow code style guidelines
   - Ensure no console errors

2. **Pull request should include**:
   - Clear title describing the change
   - Description of what was changed and why
   - Screenshots/examples if UI changed
   - Testing performed
   - Related issue numbers (if applicable)

3. **Pull request process**:
   - Submit PR against the main branch
   - Respond to review feedback
   - Make requested changes
   - Wait for approval and merge

## Areas for Contribution

### High Priority

- **Improved color detection**: Handle more edge cases
- **Performance optimization**: Faster analysis on large pages
- **Better UI/UX**: More intuitive interface
- **Accessibility**: Make the extension itself more accessible
- **Testing**: Add automated tests

### Medium Priority

- **Export functionality**: Export results as CSV/JSON
- **Filtering improvements**: More filter options
- **Theme support**: Dark mode for popup
- **Localization**: Support multiple languages
- **Documentation**: More examples and guides

### Low Priority

- **Advanced features**: Custom color pickers, suggestions
- **Integration**: Work with other dev tools
- **Statistics**: Track and visualize compliance over time

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Publishing others' private information
- Unprofessional conduct

## Technical Guidelines

### Manifest V3 Requirements

- Use service workers (not background pages)
- No remote code execution
- Declarative APIs where possible
- Follow Chrome Extension best practices

### WCAG Compliance

- All contrast calculations must follow WCAG 2.1 spec
- Formulas must be accurate
- Edge cases should be documented
- Changes to calculation logic require extra scrutiny

### Browser Compatibility

- Primary support: Chrome 88+, Edge 88+
- Secondary support: Firefox 109+, Opera 74+
- Use standard Web APIs
- Avoid browser-specific features when possible

### Performance Considerations

- Minimize DOM operations
- Avoid blocking the main thread
- Cache results when appropriate
- Handle large pages gracefully

### Security

- No data collection
- No external network requests
- Minimal permissions
- Sanitize user input
- Follow browser security guidelines

## Development Tips

### Debugging

1. **Console logging**:
   ```javascript
   console.log('Debug info:', data);
   ```

2. **Chrome DevTools**:
   - Background script: chrome://extensions/ → "Inspect views"
   - Content script: Regular page DevTools
   - Popup: Right-click popup → Inspect

3. **Common issues**:
   - Content script not injecting: Check permissions
   - Messages not working: Check chrome.runtime.lastError
   - Colors not detecting: Check computed styles

### Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Contrast Ratio Formula](https://www.w3.org/WAI/GL/wiki/Contrast_ratio)

## Questions?

If you have questions about contributing:

1. Check existing issues for similar questions
2. Read the README.md and INSTALLATION.md
3. Review the code and comments
4. Create a new issue with your question

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Thank You!

Your contributions help make the web more accessible for everyone. Thank you for taking the time to contribute!

#!/bin/bash

# Package script for WCAG Color Contrast Checker extension
# Creates a ZIP/TAR file for distribution

EXTENSION_NAME="wcag-contrast-checker"
VERSION="1.0.0"
OUTPUT_FILE="${EXTENSION_NAME}-v${VERSION}"

echo "Packaging WCAG Color Contrast Checker extension..."

# Remove old packages if exist
rm -f "${OUTPUT_FILE}.zip" "${OUTPUT_FILE}.tar.gz" 2>/dev/null

# Try zip first
if command -v zip &> /dev/null; then
    echo "Creating ZIP package..."
    zip -r "${OUTPUT_FILE}.zip" \
        manifest.json \
        background.js \
        content.js \
        contrast.js \
        popup.html \
        popup.js \
        popup.css \
        icons/*.png \
        README.md \
        -x "*.git*" "*.DS_Store" "node_modules/*" "*.swp" "*.swo" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ ZIP package created successfully: ${OUTPUT_FILE}.zip"
        echo "File size: $(du -h "${OUTPUT_FILE}.zip" | cut -f1)"
    fi
else
    echo "zip not found, using tar instead..."
    # Create tar.gz package
    tar -czf "${OUTPUT_FILE}.tar.gz" \
        manifest.json \
        background.js \
        content.js \
        contrast.js \
        popup.html \
        popup.js \
        popup.css \
        icons/icon*.png \
        README.md
    
    if [ $? -eq 0 ]; then
        echo "✅ TAR package created successfully: ${OUTPUT_FILE}.tar.gz"
        echo "File size: $(du -h "${OUTPUT_FILE}.tar.gz" | cut -f1)"
    else
        echo "❌ Error creating package"
        exit 1
    fi
fi

echo ""
echo "To install:"
echo "1. Extract the package file"
echo "2. Go to chrome://extensions/ (or edge://extensions/)"
echo "3. Enable Developer mode"
echo "4. Click 'Load unpacked'"
echo "5. Select the extracted folder"

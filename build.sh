#!/bin/bash

# LinkedIn Job Scraper Build Script
# Creates minified version for browser console deployment

echo "🔨 Building LinkedIn Job Scraper..."

# Check if terser is installed
if ! command -v terser &> /dev/null; then
    echo "⚠️  Terser not found. Installing dependencies..."
    npm install
fi

# Create minified version
echo "📦 Minifying linkedin-job-scraper.js..."
npx terser linkedin-job-scraper.js \
    -o linkedin-job-scraper.min.js \
    --compress \
    --mangle \
    --comments '/^!/' \
    || { echo "❌ Minification failed"; exit 1; }

# Get file sizes
ORIGINAL_SIZE=$(wc -c < linkedin-job-scraper.js | tr -d ' ')
MINIFIED_SIZE=$(wc -c < linkedin-job-scraper.min.js | tr -d ' ')
REDUCTION=$(echo "scale=2; 100 - ($MINIFIED_SIZE * 100 / $ORIGINAL_SIZE)" | bc)

echo "✓ Minification complete!"
echo ""
echo "📊 Build Statistics:"
echo "  Original:  ${ORIGINAL_SIZE} bytes"
echo "  Minified:  ${MINIFIED_SIZE} bytes"
echo "  Reduction: ${REDUCTION}%"
echo ""
echo "📁 Output: linkedin-job-scraper.min.js"
echo ""
echo "✅ Build complete!"

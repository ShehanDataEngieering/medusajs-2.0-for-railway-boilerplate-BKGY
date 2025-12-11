#!/bin/bash

# Production build optimization script
# This script optimizes the build process for better performance

echo "🚀 Starting optimized production build..."

# Set environment variables for optimal build
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Increase Node.js memory limit for large builds
export NODE_OPTIONS="--max-old-space-size=4096"

# Clear previous build artifacts
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf out

# Run the build with timing information
echo "⚙️  Building application..."
time npm run build

# Show build size analysis
echo "📊 Build complete! Analyzing bundle size..."
du -sh .next

echo "✅ Optimization complete!"

#!/bin/bash

# 🚀 Quick Deploy Script for Primesky East Africa to Vercel
echo "🚁 Deploying Primesky East Africa to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project locally to check for errors
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up Vercel KV database in your dashboard"
echo "2. Add environment variables (KV_REST_API_URL, KV_REST_API_TOKEN)"
echo "3. Test your website functionality"
echo ""
echo "📖 For detailed instructions, see VERCEL-DEPLOYMENT-GUIDE.md"

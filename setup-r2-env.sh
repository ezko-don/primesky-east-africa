#!/bin/bash

# PrimeSky East Africa - R2 Environment Setup Script
# This script will create your .env file with the correct R2 credentials

echo "🚀 Setting up Cloudflare R2 environment variables..."

# Create .env file with R2 credentials
cat > .env << 'EOF'
# Vercel KV Database (for analytics) - Optional
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token

# EmailJS Configuration (optional - for enhanced email functionality)
VITE_EMAILJS_PUBLIC_KEY=vFJrPk5hJmVUz54o1
VITE_EMAILJS_SERVICE_ID=service_kz67pi3
VITE_EMAILJS_TEMPLATE_ID=template_m05clx2

# Cloudflare R2 Configuration
VITE_R2_ACCOUNT_ID=e40e039279be1ccce2747577f2aa48fb
VITE_R2_ACCESS_KEY_ID=ccdfd0c604b13ab8d73900262eafe689
VITE_R2_SECRET_ACCESS_KEY=1b0830d0fbf82fa11b9d5109a2b352d6068e44376bfda3c5819ca91dd4913655
VITE_R2_BUCKET_NAME=primesky-media
VITE_R2_ENDPOINT=https://e40e039279be1ccce2747577f2aa48fb.r2.cloudflarestorage.com
VITE_R2_PUBLIC_URL=https://pub-158012c9a83642869a2f756e0cad584d.r2.dev

# Production URL
VITE_SITE_URL=https://primeskyeastafrica.com
EOF

echo "✅ .env file created successfully!"
echo ""
echo "📋 Your R2 Configuration:"
echo "   Account ID: e40e039279be1ccce2747577f2aa48fb"
echo "   Bucket Name: primesky-media"
echo "   Public URL: https://pub-158012c9a83642869a2f756e0cad584d.r2.dev"
echo ""
echo "🔒 Security Note: Your .env file is gitignored and will not be committed."
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Navigate to: http://localhost:5173/media-admin"
echo "3. Click 'Test R2 Connection' to verify setup"
echo "4. Start uploading your media!"
echo ""

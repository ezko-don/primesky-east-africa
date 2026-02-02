# Cloudflare R2 Setup Guide for Primesky East Africa

This guide will help you set up Cloudflare R2 for media storage in your Primesky East Africa application.

## What is Cloudflare R2?

Cloudflare R2 is an S3-compatible object storage service that allows you to store large amounts of unstructured data (images, videos, etc.) with zero egress fees. Perfect for storing drone footage, wedding videos, and photography.

## Prerequisites

- A Cloudflare account (free tier available)
- Access to your Cloudflare dashboard

## Step 1: Create a Cloudflare R2 Bucket

1. Log in to your Cloudflare dashboard: https://dash.cloudflare.com/
2. Navigate to **R2** in the left sidebar
3. Click **Create bucket**
4. Enter a bucket name (e.g., `primesky-media`)
5. Click **Create bucket**

## Step 2: Generate R2 API Tokens

1. In the R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API token**
3. Configure the token:
   - **Token name**: `primesky-media-access`
   - **Permissions**: Select "Object Read & Write"
   - **Bucket**: Select your bucket or choose "All buckets"
4. Click **Create API Token**
5. **IMPORTANT**: Copy and save the following credentials (you won't see them again):
   - Access Key ID
   - Secret Access Key
   - Endpoint URL (format: `https://<account_id>.r2.cloudflarestorage.com`)

## Step 3: Configure Public Access (Optional but Recommended)

To allow public access to your media files:

### Option A: Use R2.dev subdomain (Quick & Free)
1. In your bucket settings, enable **Public access**
2. Enable **R2.dev subdomain**
3. Your public URL will be: `https://<bucket-name>.<account-id>.r2.dev`

### Option B: Use Custom Domain (Professional)
1. In your bucket settings, click **Connect Domain**
2. Enter your custom domain (e.g., `media.primeskyeastafrica.com`)
3. Follow the DNS configuration instructions
4. Your public URL will be: `https://media.primeskyeastafrica.com`

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your R2 credentials:
   ```env
   # Cloudflare R2 Configuration
   VITE_R2_ACCOUNT_ID=your_cloudflare_account_id
   VITE_R2_ACCESS_KEY_ID=your_r2_access_key_id
   VITE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
   VITE_R2_BUCKET_NAME=primesky-media
   VITE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
   VITE_R2_PUBLIC_URL=https://primesky-media.your_account_id.r2.dev
   ```

3. Replace the placeholder values:
   - `your_cloudflare_account_id`: Your Cloudflare account ID (found in R2 dashboard)
   - `your_r2_access_key_id`: Access Key ID from Step 2
   - `your_r2_secret_access_key`: Secret Access Key from Step 2
   - `your_account_id`: Your account ID (part of the endpoint URL)
   - Update `VITE_R2_PUBLIC_URL` with your R2.dev or custom domain URL

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the media upload page in your application

3. Try uploading a test image or video

4. Verify the file appears in your R2 bucket dashboard

## Using the Media Upload Component

### Basic Usage

```tsx
import MediaUpload from '@/components/MediaUpload';

function MyPage() {
  const handleUploadComplete = (urls: string[]) => {
    console.log('Uploaded files:', urls);
  };

  return (
    <MediaUpload
      category="weddings"
      onUploadComplete={handleUploadComplete}
      maxFiles={10}
      acceptImages={true}
      acceptVideos={true}
    />
  );
}
```

### Available Categories

- `weddings` - Wedding photography and videography
- `travel` - Travel and tourism content
- `nature` - Nature and wildlife footage
- `real-estate` - Real estate property showcases
- `construction` - Construction progress documentation
- `events` - Event coverage
- `agriculture` - Agricultural surveys
- `urban` - Urban planning and development

## Using the Media Manager Component

```tsx
import MediaManager from '@/components/MediaManager';

function MediaLibrary() {
  return (
    <MediaManager
      category="all"
      onSelectMedia={(media) => console.log('Selected:', media)}
    />
  );
}
```

## File Size Limits

- **Images**: 10 MB maximum
- **Videos**: 500 MB maximum

Supported formats:
- **Images**: JPEG, PNG, WebP, HEIC, HEIF
- **Videos**: MP4, MOV, AVI, WebM

## Folder Structure in R2

Files are automatically organized by category:
```
primesky-media/
├── weddings/
├── travel/
├── nature/
├── real-estate/
├── construction/
├── events/
├── agriculture/
├── urban/
└── thumbnails/
```

## Security Best Practices

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use environment variables** - Don't hardcode credentials in code
3. **Rotate API tokens regularly** - Update tokens every 90 days
4. **Use bucket policies** - Restrict access to specific operations
5. **Enable CORS** - Configure CORS settings in R2 bucket settings if needed

## Troubleshooting

### Upload fails with "Access Denied"
- Verify your API token has "Object Read & Write" permissions
- Check that the bucket name in `.env` matches your actual bucket

### Files upload but can't be viewed
- Ensure public access is enabled on your bucket
- Verify `VITE_R2_PUBLIC_URL` is correctly configured
- Check CORS settings if accessing from different domains

### "Endpoint not configured" error
- Make sure all R2 environment variables are set in `.env`
- Restart your development server after updating `.env`

### Large video uploads fail
- Check your internet connection stability
- Ensure video size is under 500 MB
- Consider compressing videos before upload

## Cost Estimation

Cloudflare R2 pricing (as of 2024):
- **Storage**: $0.015 per GB/month
- **Class A Operations** (writes): $4.50 per million requests
- **Class B Operations** (reads): $0.36 per million requests
- **Egress**: FREE (no bandwidth charges!)

Example monthly cost for 100 GB of drone footage:
- Storage: 100 GB × $0.015 = $1.50/month
- Uploads: ~1,000 files × $0.0000045 = negligible
- Downloads: Unlimited views = $0 (FREE!)

**Total: ~$1.50/month for 100 GB**

## Migration from Local Storage

To migrate existing files from `/public` to R2:

1. Use the MediaUpload component to upload files
2. Update file references in your code to use R2 URLs
3. Keep local files as backup until migration is complete
4. Remove local files once verified in R2

## Support

For issues or questions:
- Cloudflare R2 Documentation: https://developers.cloudflare.com/r2/
- Cloudflare Community: https://community.cloudflare.com/
- Primesky Support: primeskyeastafrica@yahoo.com

## Next Steps

1. Set up automated backups of your R2 bucket
2. Configure CDN caching for faster media delivery
3. Implement image optimization and thumbnail generation
4. Set up lifecycle policies for archiving old content
5. Monitor usage and costs in Cloudflare dashboard

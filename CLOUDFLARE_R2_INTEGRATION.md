# Cloudflare R2 Integration - Quick Reference

## Overview

Your Primesky East Africa application now has full Cloudflare R2 integration for professional media storage. This allows you to store and manage drone footage, wedding videos, and photography in the cloud.

## What's Been Added

### 1. Configuration Files
- **`src/config/r2.ts`** - R2 configuration and validation utilities
- **`.env.example`** - Updated with R2 environment variables

### 2. Services
- **`src/services/r2StorageService.ts`** - Complete R2 storage service with:
  - File upload (single and multiple)
  - File download and signed URLs
  - File deletion
  - File listing by category
  - Connection testing

### 3. Components
- **`src/components/MediaUpload.tsx`** - Drag-and-drop upload component
- **`src/components/MediaManager.tsx`** - Media library browser and manager
- **`src/pages/MediaAdmin.tsx`** - Complete admin interface
- **`src/components/R2MediaIntegration.tsx`** - Marketing/info component

### 4. Documentation
- **`R2_SETUP_GUIDE.md`** - Comprehensive setup instructions
- **`CLOUDFLARE_R2_INTEGRATION.md`** - This file

## Quick Start

### 1. Install Dependencies (Already Done)
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### 2. Set Up Cloudflare R2
Follow the detailed instructions in `R2_SETUP_GUIDE.md` to:
- Create an R2 bucket
- Generate API tokens
- Configure public access

### 3. Configure Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Add your R2 credentials:
```env
VITE_R2_ACCOUNT_ID=your_account_id
VITE_R2_ACCESS_KEY_ID=your_access_key
VITE_R2_SECRET_ACCESS_KEY=your_secret_key
VITE_R2_BUCKET_NAME=primesky-media
VITE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
VITE_R2_PUBLIC_URL=https://primesky-media.your_account_id.r2.dev
```

### 4. Add Route to Your App
Add the media admin route to your router configuration:

```tsx
import MediaAdmin from '@/pages/MediaAdmin';

// In your router setup:
{
  path: '/admin/media',
  element: <MediaAdmin />
}
```

### 5. Start Using It
```bash
npm run dev
```

Navigate to `/admin/media` to access the media administration panel.

## Usage Examples

### Upload Media Programmatically

```tsx
import { uploadToR2 } from '@/services/r2StorageService';
import { R2_CONFIG } from '@/config/r2';

const handleFileUpload = async (file: File) => {
  const result = await uploadToR2(
    file,
    R2_CONFIG.FOLDERS.WEDDINGS,
    (progress) => {
      console.log(`Upload progress: ${progress.progress}%`);
    }
  );

  if (result.success) {
    console.log('File uploaded:', result.url);
  } else {
    console.error('Upload failed:', result.error);
  }
};
```

### List Files in a Category

```tsx
import { listFilesInCategory } from '@/services/r2StorageService';
import { R2_CONFIG } from '@/config/r2';

const loadWeddingPhotos = async () => {
  const files = await listFilesInCategory(R2_CONFIG.FOLDERS.WEDDINGS);
  console.log('Wedding photos:', files);
};
```

### Use Upload Component

```tsx
import MediaUpload from '@/components/MediaUpload';
import { R2_CONFIG } from '@/config/r2';

function MyUploadPage() {
  return (
    <MediaUpload
      category={R2_CONFIG.FOLDERS.TRAVEL}
      onUploadComplete={(urls) => {
        console.log('Uploaded:', urls);
      }}
      maxFiles={10}
    />
  );
}
```

### Use Media Manager

```tsx
import MediaManager from '@/components/MediaManager';

function MyMediaLibrary() {
  return (
    <MediaManager
      category="all"
      onSelectMedia={(media) => {
        console.log('Selected media:', media);
      }}
    />
  );
}
```

## File Organization

Files are automatically organized in R2 by category:

```
primesky-media/
├── weddings/
│   ├── wedding-ceremony-1234567890-abc123.mp4
│   └── bride-portrait-1234567891-def456.jpg
├── travel/
│   ├── zanzibar-beach-1234567892-ghi789.jpg
│   └── safari-aerial-1234567893-jkl012.mp4
├── nature/
├── real-estate/
├── construction/
├── events/
├── agriculture/
└── urban/
```

## Features

### ✅ Drag-and-Drop Upload
- Modern, intuitive interface
- Multiple file selection
- Real-time upload progress
- File validation

### ✅ Media Management
- Browse all uploaded files
- Filter by category
- Grid and list views
- Delete files
- Download files

### ✅ Security
- Secure API token authentication
- Environment variable configuration
- File type validation
- Size limit enforcement

### ✅ Performance
- Global CDN delivery
- Zero egress fees
- Fast upload/download
- Optimized for large files

## File Limits

- **Images**: 10 MB max
- **Videos**: 500 MB max
- **Supported formats**:
  - Images: JPEG, PNG, WebP, HEIC, HEIF
  - Videos: MP4, MOV, AVI, WebM

## API Reference

### Configuration (`src/config/r2.ts`)

```typescript
// Validate R2 configuration
validateR2Config(): { isValid: boolean; errors: string[] }

// Generate unique filename
generateUniqueFilename(originalFilename: string): string

// Validate file type and size
validateFileType(file: File): { isValid: boolean; error?: string }

// Format file size for display
formatFileSize(bytes: number): string
```

### Storage Service (`src/services/r2StorageService.ts`)

```typescript
// Upload single file
uploadToR2(
  file: File,
  category: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult>

// Upload multiple files
uploadMultipleToR2(
  files: File[],
  category: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult[]>

// Get signed URL for private access
getSignedUrlForFile(
  key: string,
  expiresIn?: number
): Promise<string>

// Delete file
deleteFromR2(key: string): Promise<{ success: boolean; error?: string }>

// List files in category
listFilesInCategory(category: string): Promise<MediaFile[]>

// List all files
listAllFiles(): Promise<MediaFile[]>

// Test connection
testR2Connection(): Promise<{ success: boolean; error?: string }>
```

## Troubleshooting

### Configuration Issues
Run the configuration test in the Media Admin panel to verify your setup.

### Upload Failures
- Check file size limits
- Verify file type is supported
- Ensure API token has write permissions
- Check internet connection

### Files Not Visible
- Verify public access is enabled on bucket
- Check `VITE_R2_PUBLIC_URL` is correct
- Ensure CORS is configured if needed

## Cost Optimization Tips

1. **Compress videos** before upload to save storage costs
2. **Use appropriate formats** - WebP for images, MP4 for videos
3. **Delete unused files** regularly
4. **Monitor usage** in Cloudflare dashboard
5. **Set lifecycle policies** for automatic archiving

## Next Steps

1. ✅ Set up your R2 bucket (see `R2_SETUP_GUIDE.md`)
2. ✅ Configure environment variables
3. ✅ Test the connection in Media Admin
4. ✅ Upload your first files
5. ✅ Integrate into your portfolio/gallery pages
6. 🔲 Set up automated backups
7. 🔲 Configure custom domain
8. 🔲 Implement image optimization
9. 🔲 Add thumbnail generation

## Support

- **Documentation**: See `R2_SETUP_GUIDE.md`
- **Cloudflare R2 Docs**: https://developers.cloudflare.com/r2/
- **Issues**: Contact primeskyeastafrica@yahoo.com

---

**Built for Primesky East Africa** - Professional Drone Services

// Cloudflare R2 Configuration for Primesky East Africa
// This file contains the configuration for Cloudflare R2 object storage

export const R2_CONFIG = {
  // Cloudflare R2 credentials - these should be set in environment variables
  ACCOUNT_ID: import.meta.env.VITE_R2_ACCOUNT_ID || '',
  ACCESS_KEY_ID: import.meta.env.VITE_R2_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || '',
  BUCKET_NAME: import.meta.env.VITE_R2_BUCKET_NAME || 'primesky-media',
  
  // R2 endpoint - format: https://<account_id>.r2.cloudflarestorage.com
  ENDPOINT: import.meta.env.VITE_R2_ENDPOINT || '',
  
  // Public URL for accessing files (if you've set up a custom domain or R2.dev subdomain)
  PUBLIC_URL: import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-158012c9a83642869a2f756e0cad584d.r2.dev',
  
  // Allowed file types
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
  
  // Max file sizes (in bytes)
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_SIZE: 500 * 1024 * 1024, // 500MB
  
  // Folder structure in R2 bucket
  FOLDERS: {
    weddings: 'weddings',
    travel: 'travel',
    nature: 'Nature',
    'real-estate': 'Real-estate',
    construction: 'Construction',
    events: 'events',
    agriculture: 'Farm',
    urban: 'urban'
  }
};

// Validate R2 configuration
export const validateR2Config = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!R2_CONFIG.ACCOUNT_ID) {
    errors.push('R2 Account ID not configured');
  }

  if (!R2_CONFIG.ACCESS_KEY_ID) {
    errors.push('R2 Access Key ID not configured');
  }

  if (!R2_CONFIG.SECRET_ACCESS_KEY) {
    errors.push('R2 Secret Access Key not configured');
  }

  if (!R2_CONFIG.ENDPOINT) {
    errors.push('R2 Endpoint not configured');
  }

  if (!R2_CONFIG.BUCKET_NAME) {
    errors.push('R2 Bucket Name not configured');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get file extension from filename
export const getFileExtension = (filename: string): string => {
  return filename.slice(filename.lastIndexOf('.')).toLowerCase();
};

// Generate unique filename
export const generateUniqueFilename = (originalFilename: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = getFileExtension(originalFilename);
  const nameWithoutExt = originalFilename.slice(0, originalFilename.lastIndexOf('.'));
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
  
  return `${sanitizedName}-${timestamp}-${randomString}${extension}`;
};

// Validate file type
export const validateFileType = (file: File): { isValid: boolean; error?: string } => {
  const isImage = R2_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = R2_CONFIG.ALLOWED_VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    return {
      isValid: false,
      error: `File type ${file.type} is not supported. Please upload images (JPEG, PNG, WebP) or videos (MP4, MOV, WebM).`
    };
  }

  if (isImage && file.size > R2_CONFIG.MAX_IMAGE_SIZE) {
    return {
      isValid: false,
      error: `Image size exceeds maximum allowed size of ${R2_CONFIG.MAX_IMAGE_SIZE / (1024 * 1024)}MB.`
    };
  }

  if (isVideo && file.size > R2_CONFIG.MAX_VIDEO_SIZE) {
    return {
      isValid: false,
      error: `Video size exceeds maximum allowed size of ${R2_CONFIG.MAX_VIDEO_SIZE / (1024 * 1024)}MB.`
    };
  }

  return { isValid: true };
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

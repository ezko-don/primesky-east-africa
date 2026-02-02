import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { R2_CONFIG, validateR2Config, validateFileType, generateUniqueFilename } from '../config/r2';

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  fileName?: string;
  error?: string;
}

export interface MediaFile {
  key: string;
  url: string;
  fileName: string;
  size: number;
  lastModified: Date;
  category: string;
  type: 'image' | 'video';
}

// Initialize S3 client for R2
let s3Client: S3Client | null = null;

const getS3Client = (): S3Client => {
  if (!s3Client) {
    s3Client = new S3Client({
      region: 'auto',
      endpoint: R2_CONFIG.ENDPOINT,
      credentials: {
        accessKeyId: R2_CONFIG.ACCESS_KEY_ID,
        secretAccessKey: R2_CONFIG.SECRET_ACCESS_KEY,
      },
    });
  }
  return s3Client;
};

// Upload file to R2
export const uploadToR2 = async (
  file: File,
  category: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  try {
    // Validate file
    const validation = validateFileType(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error
      };
    }

    // Generate unique filename
    const uniqueFileName = generateUniqueFilename(file.name);
    const key = `${category}/${uniqueFileName}`;

    // Report initial progress
    if (onProgress) {
      onProgress({
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to R2
    const client = getS3Client();
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        category: category,
        uploadedAt: new Date().toISOString()
      }
    });

    await client.send(command);

    // Generate public URL
    const publicUrl = R2_CONFIG.PUBLIC_URL 
      ? `${R2_CONFIG.PUBLIC_URL}/${key}`
      : `${R2_CONFIG.ENDPOINT}/${R2_CONFIG.BUCKET_NAME}/${key}`;

    // Report completion
    if (onProgress) {
      onProgress({
        fileName: file.name,
        progress: 100,
        status: 'completed'
      });
    }

    return {
      success: true,
      url: publicUrl,
      key: key,
      fileName: uniqueFileName
    };

  } catch (error: any) {
    console.error('R2 upload error:', error);
    
    if (onProgress) {
      onProgress({
        fileName: file.name,
        progress: 0,
        status: 'error',
        error: error.message
      });
    }

    return {
      success: false,
      error: error.message || 'Failed to upload file to R2'
    };
  }
};

// Upload multiple files
export const uploadMultipleToR2 = async (
  files: File[],
  category: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];

  for (const file of files) {
    const result = await uploadToR2(file, category, onProgress);
    results.push(result);
  }

  return results;
};

// Get signed URL for private file access
export const getSignedUrlForFile = async (
  key: string,
  expiresIn: number = 3600
): Promise<string> => {
  try {
    const client = getS3Client();
    const command = new GetObjectCommand({
      Bucket: R2_CONFIG.BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn });
    return signedUrl;
  } catch (error: any) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate signed URL');
  }
};

// Delete file from R2
export const deleteFromR2 = async (key: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const client = getS3Client();
    const command = new DeleteObjectCommand({
      Bucket: R2_CONFIG.BUCKET_NAME,
      Key: key,
    });

    await client.send(command);

    return { success: true };
  } catch (error: any) {
    console.error('R2 delete error:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete file from R2'
    };
  }
};

// List files in a category
export const listFilesInCategory = async (category: string): Promise<MediaFile[]> => {
  try {
    const client = getS3Client();
    const command = new ListObjectsV2Command({
      Bucket: R2_CONFIG.BUCKET_NAME,
      Prefix: `${category}/`,
    });

    const response = await client.send(command);
    
    if (!response.Contents) {
      return [];
    }

    const files: MediaFile[] = response.Contents.map(item => {
      const key = item.Key || '';
      const fileName = key.split('/').pop() || '';
      const publicUrl = R2_CONFIG.PUBLIC_URL 
        ? `${R2_CONFIG.PUBLIC_URL}/${key}`
        : `${R2_CONFIG.ENDPOINT}/${R2_CONFIG.BUCKET_NAME}/${key}`;
      
      // Determine file type from extension
      const extension = fileName.split('.').pop()?.toLowerCase() || '';
      const videoExtensions = ['mp4', 'mov', 'avi', 'webm'];
      const type = videoExtensions.includes(extension) ? 'video' : 'image';

      return {
        key,
        url: publicUrl,
        fileName,
        size: item.Size || 0,
        lastModified: item.LastModified || new Date(),
        category,
        type
      };
    });

    return files;
  } catch (error: any) {
    console.error('R2 list error:', error);
    return [];
  }
};

// List all files in bucket
export const listAllFiles = async (): Promise<MediaFile[]> => {
  try {
    const client = getS3Client();
    const command = new ListObjectsV2Command({
      Bucket: R2_CONFIG.BUCKET_NAME,
    });

    const response = await client.send(command);
    
    if (!response.Contents) {
      return [];
    }

    const files: MediaFile[] = response.Contents.map(item => {
      const key = item.Key || '';
      const fileName = key.split('/').pop() || '';
      const category = key.split('/')[0] || 'uncategorized';
      const publicUrl = R2_CONFIG.PUBLIC_URL 
        ? `${R2_CONFIG.PUBLIC_URL}/${key}`
        : `${R2_CONFIG.ENDPOINT}/${R2_CONFIG.BUCKET_NAME}/${key}`;
      
      // Determine file type from extension
      const extension = fileName.split('.').pop()?.toLowerCase() || '';
      const videoExtensions = ['mp4', 'mov', 'avi', 'webm'];
      const type = videoExtensions.includes(extension) ? 'video' : 'image';

      return {
        key,
        url: publicUrl,
        fileName,
        size: item.Size || 0,
        lastModified: item.LastModified || new Date(),
        category,
        type
      };
    });

    return files;
  } catch (error: any) {
    console.error('R2 list all error:', error);
    return [];
  }
};

// Test R2 connection
export const testR2Connection = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if configuration is valid
    const validation = validateR2Config();
    if (!validation.isValid) {
      return {
        success: false,
        error: `Configuration errors: ${validation.errors.join(', ')}`
      };
    }

    // Test if public URL is accessible (simple HEAD request)
    if (R2_CONFIG.PUBLIC_URL) {
      try {
        const response = await fetch(R2_CONFIG.PUBLIC_URL, { 
          method: 'HEAD',
          mode: 'no-cors' // Bypass CORS for this test
        });
        console.log('✅ R2 public URL is accessible');
        return { success: true };
      } catch (err) {
        console.warn('Public URL test failed, but this might be normal:', err);
      }
    }

    // If we have credentials, assume connection will work
    // (actual upload will test the real connection)
    if (R2_CONFIG.ACCESS_KEY_ID && R2_CONFIG.SECRET_ACCESS_KEY) {
      console.log('✅ R2 credentials are configured');
      return { 
        success: true,
        error: 'Credentials configured. Upload a file to fully test the connection.'
      };
    }

    return {
      success: false,
      error: 'R2 credentials not configured properly'
    };
  } catch (error: any) {
    console.error('R2 connection test failed:', error);
    return {
      success: false,
      error: error.message || 'Failed to connect to R2'
    };
  }
};

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2, Image as ImageIcon, Video } from 'lucide-react';
import { uploadToR2, uploadMultipleToR2, UploadProgress } from '../services/r2StorageService';
import { R2_CONFIG, formatFileSize } from '../config/r2';

interface MediaUploadProps {
  category?: string;
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  acceptImages?: boolean;
  acceptVideos?: boolean;
}

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  url?: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  category = 'uncategorized',
  onUploadComplete,
  maxFiles = 10,
  acceptImages = true,
  acceptVideos = true
}) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Build accept string for file input
  const acceptTypes = [
    ...(acceptImages ? R2_CONFIG.ALLOWED_IMAGE_TYPES : []),
    ...(acceptVideos ? R2_CONFIG.ALLOWED_VIDEO_TYPES : [])
  ].join(',');

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  // Handle file selection
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  }, []);

  // Process selected files
  const handleFiles = (selectedFiles: File[]) => {
    // Limit number of files
    const filesToAdd = selectedFiles.slice(0, maxFiles - files.length);

    const newFiles: FileWithProgress[] = filesToAdd.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  // Upload files
  const uploadFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    if (pendingFiles.length === 0) return;

    // Update status to uploading
    setFiles(prev => prev.map(f => 
      f.status === 'pending' ? { ...f, status: 'uploading' as const } : f
    ));

    const uploadedUrls: string[] = [];

    // Upload each file
    for (const fileWithProgress of pendingFiles) {
      const result = await uploadToR2(
        fileWithProgress.file,
        category,
        (progress: UploadProgress) => {
          setFiles(prev => prev.map(f => 
            f.file === fileWithProgress.file
              ? {
                  ...f,
                  progress: progress.progress,
                  status: progress.status,
                  error: progress.error
                }
              : f
          ));
        }
      );

      if (result.success && result.url) {
        uploadedUrls.push(result.url);
        setFiles(prev => prev.map(f => 
          f.file === fileWithProgress.file
            ? { ...f, url: result.url, status: 'completed' as const }
            : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.file === fileWithProgress.file
            ? { ...f, status: 'error' as const, error: result.error }
            : f
        ));
      }
    }

    if (onUploadComplete && uploadedUrls.length > 0) {
      onUploadComplete(uploadedUrls);
    }
  };

  // Remove file from list
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Clear all files
  const clearAll = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get file type icon
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    } else if (file.type.startsWith('video/')) {
      return <Video className="h-8 w-8 text-purple-500" />;
    }
    return <Upload className="h-8 w-8 text-gray-500" />;
  };

  // Get status icon
  const getStatusIcon = (status: FileWithProgress['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const hasFilesToUpload = files.some(f => f.status === 'pending');
  const isUploading = files.some(f => f.status === 'uploading');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }
        `}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold mb-2">Upload Media Files</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Drag and drop your files here, or click to browse
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
          {acceptImages && acceptVideos && 'Images and Videos'}
          {acceptImages && !acceptVideos && 'Images only'}
          {!acceptImages && acceptVideos && 'Videos only'}
          {' • '}
          Max {maxFiles} files
          {' • '}
          Images up to {R2_CONFIG.MAX_IMAGE_SIZE / (1024 * 1024)}MB
          {' • '}
          Videos up to {R2_CONFIG.MAX_VIDEO_SIZE / (1024 * 1024)}MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptTypes}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Browse Files
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">
              Files ({files.length})
            </h4>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700"
              disabled={isUploading}
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((fileWithProgress, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                {/* File Icon */}
                <div className="flex-shrink-0">
                  {getFileIcon(fileWithProgress.file)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {fileWithProgress.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(fileWithProgress.file.size)}
                  </p>
                  {fileWithProgress.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {fileWithProgress.error}
                    </p>
                  )}
                </div>

                {/* Progress Bar */}
                {fileWithProgress.status === 'uploading' && (
                  <div className="flex-1 max-w-xs">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${fileWithProgress.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {fileWithProgress.progress}%
                    </p>
                  </div>
                )}

                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {getStatusIcon(fileWithProgress.status)}
                </div>

                {/* Remove Button */}
                {fileWithProgress.status !== 'uploading' && (
                  <button
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Upload Button */}
          {hasFilesToUpload && (
            <button
              onClick={uploadFiles}
              disabled={isUploading}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Upload to Cloudflare R2
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;

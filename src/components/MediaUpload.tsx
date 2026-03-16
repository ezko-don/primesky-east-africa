import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2, Image as ImageIcon, Video, Cloud } from 'lucide-react';
import { uploadToR2, UploadProgress } from '../services/r2StorageService';
import { R2_CONFIG, formatFileSize } from '../config/r2';
import { motion, AnimatePresence } from 'framer-motion';

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

  const acceptTypes = [
    ...(acceptImages ? R2_CONFIG.ALLOWED_IMAGE_TYPES : []),
    ...(acceptVideos ? R2_CONFIG.ALLOWED_VIDEO_TYPES : [])
  ].join(',');

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

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  }, []);

  const handleFiles = (selectedFiles: File[]) => {
    const filesToAdd = selectedFiles.slice(0, maxFiles - files.length);
    const newFiles: FileWithProgress[] = filesToAdd.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const uploadFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;
    setFiles(prev => prev.map(f => f.status === 'pending' ? { ...f, status: 'uploading' as const } : f));
    const uploadedUrls: string[] = [];
    for (const fileWithProgress of pendingFiles) {
      const result = await uploadToR2(
        fileWithProgress.file,
        category,
        (progress: UploadProgress) => {
          setFiles(prev => prev.map(f => 
            f.file === fileWithProgress.file
              ? { ...f, progress: progress.progress, status: progress.status, error: progress.error }
              : f
          ));
        }
      );
      if (result.success && result.url) {
        uploadedUrls.push(result.url);
        setFiles(prev => prev.map(f => f.file === fileWithProgress.file ? { ...f, url: result.url, status: 'completed' as const } : f));
      } else {
        setFiles(prev => prev.map(f => f.file === fileWithProgress.file ? { ...f, status: 'error' as const, error: result.error } : f));
      }
    }
    if (onUploadComplete && uploadedUrls.length > 0) onUploadComplete(uploadedUrls);
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));
  const clearAll = () => {
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isUploading = files.some(f => f.status === 'uploading');

  return (
    <div className="w-full space-y-8">
      {/* Cinematic Dropzone */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer border-2 border-dashed rounded-[2rem] p-16 text-center transition-all duration-700
          ${isDragging 
            ? 'border-emerald-500 bg-emerald-500/5' 
            : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'
          }
        `}
      >
        <Cloud className={`h-16 w-16 mx-auto mb-8 transition-transform duration-700 ${isDragging ? 'scale-125 text-emerald-500' : 'text-neutral-700 group-hover:text-emerald-500/50'}`} />
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Neural Injection</h3>
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 mb-8">
          Feed the Cloudflare R2 Edge Network
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptTypes}
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
          id="file-upload"
        />
      </motion.div>

      {/* Synchronized File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-emerald-500">
                Transmission Queue ({files.length})
              </h4>
              <button onClick={clearAll} disabled={isUploading} className="text-[10px] uppercase font-black tracking-widest text-white/20 hover:text-red-500 transition-colors">
                Purge All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-2xl relative overflow-hidden"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    {file.file.type.startsWith('image/') ? <ImageIcon className="w-5 h-5 text-emerald-500" /> : <Video className="w-5 h-5 text-emerald-500" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-tighter truncate">{file.file.name}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/10">{formatFileSize(file.file.size)}</p>
                  </div>

                  {file.status === 'uploading' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-emerald-500" 
                      style={{ width: `${file.progress}%` }}
                    />
                  )}

                  <div className="flex items-center gap-4">
                    {file.status === 'completed' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                    {file.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                    {file.status !== 'uploading' && (
                      <button onClick={() => removeFile(index)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <X className="w-4 h-4 text-white/20" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {files.some(f => f.status === 'pending') && (
              <button
                onClick={uploadFiles}
                disabled={isUploading}
                data-cursor="Upload"
                className="w-full py-6 rounded-2.5xl bg-emerald-500 text-white font-black uppercase text-[10px] tracking-[0.5em] hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 mt-8"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                {isUploading ? 'Synchronizing Media...' : 'Initialize Transmission'}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaUpload;

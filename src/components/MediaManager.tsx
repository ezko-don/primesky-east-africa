import React, { useState, useEffect } from 'react';
import { Trash2, Download, Eye, Loader2, RefreshCw, Image as ImageIcon, Video } from 'lucide-react';
import { listAllFiles, listFilesInCategory, deleteFromR2, MediaFile } from '../services/r2StorageService';
import { R2_CONFIG, formatFileSize } from '../config/r2';

interface MediaManagerProps {
  category?: string;
  onSelectMedia?: (media: MediaFile) => void;
}

const MediaManager: React.FC<MediaManagerProps> = ({ category, onSelectMedia }) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { value: 'all', label: 'All Media' },
    { value: R2_CONFIG.FOLDERS.WEDDINGS, label: 'Weddings' },
    { value: R2_CONFIG.FOLDERS.TRAVEL, label: 'Travel' },
    { value: R2_CONFIG.FOLDERS.NATURE, label: 'Nature' },
    { value: R2_CONFIG.FOLDERS.REAL_ESTATE, label: 'Real Estate' },
    { value: R2_CONFIG.FOLDERS.CONSTRUCTION, label: 'Construction' },
    { value: R2_CONFIG.FOLDERS.EVENTS, label: 'Events' },
    { value: R2_CONFIG.FOLDERS.AGRICULTURE, label: 'Agriculture' },
    { value: R2_CONFIG.FOLDERS.URBAN, label: 'Urban' },
  ];

  const loadFiles = async () => {
    setLoading(true);
    try {
      let loadedFiles: MediaFile[];
      if (selectedCategory === 'all') {
        loadedFiles = await listAllFiles();
      } else {
        loadedFiles = await listFilesInCategory(selectedCategory);
      }
      setFiles(loadedFiles);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [selectedCategory]);

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Are you sure you want to delete ${file.fileName}?`)) {
      return;
    }

    const result = await deleteFromR2(file.key);
    if (result.success) {
      setFiles(prev => prev.filter(f => f.key !== file.key));
    } else {
      alert(`Failed to delete file: ${result.error}`);
    }
  };

  const handleDownload = (file: MediaFile) => {
    window.open(file.url, '_blank');
  };

  const handleView = (file: MediaFile) => {
    if (onSelectMedia) {
      onSelectMedia(file);
    } else {
      window.open(file.url, '_blank');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <button
          onClick={loadFiles}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* File Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {loading ? 'Loading...' : `${files.length} file${files.length !== 1 ? 's' : ''} found`}
      </div>

      {/* Files Display */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No files found in this category
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.key}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative group">
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.fileName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <Video className="h-12 w-12 text-gray-400" />
                )}
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleView(file)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="View"
                  >
                    <Eye className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="Download"
                  >
                    <Download className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(file)}
                    className="p-2 bg-red-600 rounded-full hover:bg-red-700"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* File Info */}
              <div className="p-3">
                <p className="text-sm font-medium truncate" title={file.fileName}>
                  {file.fileName}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {file.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.key}
              className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                {file.type === 'image' ? (
                  <ImageIcon className="h-8 w-8 text-blue-500" />
                ) : (
                  <Video className="h-8 w-8 text-purple-500" />
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.fileName}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {file.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(file.lastModified).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleView(file)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDownload(file)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(file)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaManager;

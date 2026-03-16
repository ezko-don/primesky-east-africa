import React, { useState, useEffect } from 'react';
import { Trash2, Download, Eye, Loader2, RefreshCw, Image as ImageIcon, Video, Grid, List as ListIcon } from 'lucide-react';
import { listAllFiles, listFilesInCategory, deleteFromR2, MediaFile } from '../services/r2StorageService';
import { R2_CONFIG, formatFileSize } from '../config/r2';
import { motion, AnimatePresence } from 'framer-motion';

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
    { value: 'all', label: 'All' },
    { value: R2_CONFIG.FOLDERS.weddings, label: 'Weddings' },
    { value: R2_CONFIG.FOLDERS.travel, label: 'Travel' },
    { value: R2_CONFIG.FOLDERS.nature, label: 'Nature' },
    { value: R2_CONFIG.FOLDERS['real-estate'], label: 'Spaces' },
    { value: R2_CONFIG.FOLDERS.construction, label: 'Build' },
    { value: R2_CONFIG.FOLDERS.events, label: 'Events' },
    { value: R2_CONFIG.FOLDERS.agriculture, label: 'Agri' },
    { value: R2_CONFIG.FOLDERS.urban, label: 'Urban' },
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
    if (!confirm(`Are you sure you want to delete ${file.fileName}?`)) return;
    const result = await deleteFromR2(file.key);
    if (result.success) setFiles(prev => prev.filter(f => f.key !== file.key));
  };

  const handleDownload = (file: MediaFile) => window.open(file.url, '_blank');
  const handleView = (file: MediaFile) => {
    if (onSelectMedia) onSelectMedia(file);
    else window.open(file.url, '_blank');
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="w-full space-y-12">
      {/* Precision Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase font-black tracking-widest whitespace-nowrap transition-all ${
                selectedCategory === cat.value ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-white/5 rounded-xl p-1">
             <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-white/20'}`}><Grid className="w-4 h-4" /></button>
             <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-white/20'}`}><ListIcon className="w-4 h-4" /></button>
          </div>
          <button onClick={loadFiles} disabled={loading} className="text-[10px] uppercase font-black tracking-[0.3em] text-emerald-500 flex items-center gap-2 hover:opacity-70 transition-all">
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            Refresh Unit
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
           <p className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500 animate-pulse">Syncing Neural Bank...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {files.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
               <p className="text-[10px] uppercase font-black tracking-[0.5em] text-white/20">Cell Empty</p>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {files.map((file) => (
                <motion.div
                  key={file.key}
                  variants={item}
                  className="group relative aspect-square bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden cursor-pointer"
                >
                  {file.type === 'image' ? (
                    <img src={file.url} alt={file.fileName} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-700" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-emerald-500/5">
                       <Video className="w-8 h-8 text-emerald-500/30" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                     <div className="flex gap-2">
                        <button onClick={() => handleView(file)} className="p-3 bg-white text-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDownload(file)} className="p-3 bg-white text-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Download className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(file)} className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"><Trash2 className="w-4 h-4" /></button>
                     </div>
                     <p className="text-[8px] uppercase font-black tracking-widest text-emerald-500">{formatFileSize(file.size)}</p>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                     <p className="text-[8px] uppercase font-black tracking-widest truncate text-white/50">{file.fileName}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {files.map((file) => (
                <motion.div
                  key={file.key}
                  variants={item}
                  className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all"
                >
                  <div className="p-3 bg-white/5 rounded-xl">
                    {file.type === 'image' ? <ImageIcon className="w-5 h-5 text-emerald-500" /> : <Video className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] items-center gap-4 uppercase font-black tracking-widest truncate">{file.fileName}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-[8px] uppercase font-bold text-white/20 tracking-widest">{file.category}</span>
                      <span className="text-[8px] uppercase font-bold text-white/20 tracking-widest">{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleView(file)} className="p-3 hover:bg-white/5 rounded-xl transition-all"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => handleDownload(file)} className="p-3 hover:bg-white/5 rounded-xl transition-all"><Download className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(file)} className="p-3 hover:bg-red-500 transition-all rounded-xl"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default MediaManager;

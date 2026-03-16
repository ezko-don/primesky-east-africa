import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaUpload from '@/components/MediaUpload';
import MediaManager from '@/components/MediaManager';
import { R2_CONFIG, validateR2Config } from '@/config/r2';
import { testR2Connection } from '@/services/r2StorageService';
import { AlertCircle, CheckCircle, Loader2, ArrowLeft, Shield, Box, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MediaAdmin = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [connectionError, setConnectionError] = useState<string>('');
  const navigate = useNavigate();

  const configValidation = validateR2Config();

  const testConnection = async () => {
    setConnectionStatus('testing');
    setConnectionError('');
    const result = await testR2Connection();
    if (result.success) {
      setConnectionStatus('success');
    } else {
      setConnectionStatus('error');
      setConnectionError(result.error || 'Unknown error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation Bar */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-2xl px-8 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
            data-cursor="Return"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-500 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px] uppercase font-black tracking-[0.4em]">Back to Hub</span>
          </button>
          <div className="flex items-center gap-4">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/50">Admin Terminal v2.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-8xl md:text-[8vw] font-black tracking-tighter leading-none mb-6">
            MEDIA <br/><span className="text-emerald-500 italic">SYSTEM.</span>
          </h1>
          <p className="text-xl font-light text-white/30 max-w-xl">
            Surgical precision control over your Cloudflare R2 neural media network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Status Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1 p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-8"
          >
            <div className="flex items-center gap-4 text-emerald-500">
               <Shield className="w-6 h-6" />
               <h2 className="text-xs uppercase font-black tracking-widest">Core Security</h2>
            </div>
            
            {!configValidation.isValid ? (
              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-black text-[10px] uppercase tracking-widest">Configuration Leak</span>
                </div>
                <ul className="text-xs space-y-1 opacity-70 list-disc list-inside">
                  {configValidation.errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-black text-[10px] uppercase tracking-widest">Neural Link Active</span>
                  </div>
                  <div className="space-y-2 text-[10px] uppercase tracking-widest font-bold opacity-50">
                    <p>Bucket: {R2_CONFIG.BUCKET_NAME}</p>
                    <p className="truncate">Node: {R2_CONFIG.ENDPOINT}</p>
                  </div>
                </div>

                <button
                  onClick={testConnection}
                  disabled={connectionStatus === 'testing'}
                  data-cursor="Connect"
                  className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                >
                  {connectionStatus === 'testing' ? (
                    <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Syncing...</span>
                  ) : 'Test Neural Connection'}
                </button>

                {connectionStatus === 'success' && (
                  <p className="text-[10px] uppercase text-center text-emerald-500 font-black tracking-widest animate-pulse">Link Established</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Core Operations */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 p-8 rounded-[2rem] bg-white/5 border border-white/5 overflow-hidden"
          >
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="flex gap-4 bg-transparent border-b border-white/5 mb-12 p-0 h-auto">
                <TabsTrigger 
                  value="upload" 
                  className="px-0 py-4 bg-transparent text-white/30 data-[state=active]:text-emerald-500 data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-emerald-500 rounded-none text-[10px] uppercase font-black tracking-widest"
                >
                  Transmissions
                </TabsTrigger>
                <TabsTrigger 
                  value="manage" 
                  className="px-0 py-4 bg-transparent text-white/30 data-[state=active]:text-emerald-500 data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-emerald-500 rounded-none text-[10px] uppercase font-black tracking-widest"
                >
                  Neural Bank
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-0 focus-visible:outline-none">
                <div className="space-y-12">
                   <div className="flex items-end justify-between border-b border-white/5 pb-8">
                      <div>
                         <h3 className="text-4xl font-black uppercase tracking-tighter">Transmit</h3>
                         <p className="text-xs text-white/20 uppercase tracking-widest font-black mt-2">Injection to R2 Cloud</p>
                      </div>
                      <select
                        id="upload-category"
                        className="bg-transparent border-none text-emerald-500 text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer"
                      >
                        {Object.entries(R2_CONFIG.FOLDERS).map(([key, value]) => (
                          <option key={key} value={value} className="bg-neutral-900">{key.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                   </div>
                   
                   <MediaUpload
                     category={(document.getElementById('upload-category') as HTMLSelectElement)?.value || R2_CONFIG.FOLDERS.weddings}
                     onUploadComplete={(urls) => console.log('Upload complete:', urls)}
                   />
                </div>
              </TabsContent>

              <TabsContent value="manage" className="mt-0 focus-visible:outline-none">
                <MediaManager />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Technical Specs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-20">
           {[
             { label: 'Latency', val: '< 20ms', icon: Zap },
             { label: 'Throughput', val: 'Infinite', icon: Box },
             { label: 'Region', val: 'Global Edge', icon: Zap }
           ].map((spec, i) => (
             <div key={i} className="p-8 border border-white/10 rounded-3xl flex items-center gap-6 grayscale">
                <spec.icon className="w-6 h-6" />
                <div>
                   <p className="text-[10px] uppercase font-black tracking-widest">{spec.label}</p>
                   <p className="text-2xl font-black">{spec.val}</p>
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
};

export default MediaAdmin;

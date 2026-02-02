import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaUpload from '@/components/MediaUpload';
import MediaManager from '@/components/MediaManager';
import { R2_CONFIG, validateR2Config } from '@/config/r2';
import { testR2Connection } from '@/services/r2StorageService';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const MediaAdmin = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [connectionError, setConnectionError] = useState<string>('');

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Media Administration</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your Cloudflare R2 media storage
          </p>
        </div>

        {/* Configuration Status */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">R2 Configuration Status</h2>
          
          {!configValidation.isValid ? (
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-red-600">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Configuration incomplete</p>
                  <ul className="list-disc list-inside mt-2 text-sm">
                    {configValidation.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm">
                    Please configure your R2 credentials in the <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">.env</code> file.
                    See <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">R2_SETUP_GUIDE.md</code> for instructions.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-green-600">
                <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Configuration complete</p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Bucket:</strong> {R2_CONFIG.BUCKET_NAME}</p>
                    <p><strong>Endpoint:</strong> {R2_CONFIG.ENDPOINT}</p>
                    {R2_CONFIG.PUBLIC_URL && (
                      <p><strong>Public URL:</strong> {R2_CONFIG.PUBLIC_URL}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Test Connection Button */}
              <div>
                <button
                  onClick={testConnection}
                  disabled={connectionStatus === 'testing'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
                >
                  {connectionStatus === 'testing' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Testing Connection...
                    </>
                  ) : (
                    'Test R2 Connection'
                  )}
                </button>

                {connectionStatus === 'success' && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Connection successful!
                  </div>
                )}

                {connectionStatus === 'error' && (
                  <div className="mt-2 flex items-start gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Connection failed</p>
                      <p>{connectionError}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {configValidation.isValid && (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upload">Upload Media</TabsTrigger>
              <TabsTrigger value="manage">Manage Media</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Upload New Media</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Upload images and videos to your Cloudflare R2 storage. Files will be automatically organized by category.
                </p>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Select Category
                  </label>
                  <select
                    id="upload-category"
                    className="w-full max-w-xs px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                  >
                    <option value={R2_CONFIG.FOLDERS.WEDDINGS}>Weddings</option>
                    <option value={R2_CONFIG.FOLDERS.TRAVEL}>Travel</option>
                    <option value={R2_CONFIG.FOLDERS.NATURE}>Nature</option>
                    <option value={R2_CONFIG.FOLDERS.REAL_ESTATE}>Real Estate</option>
                    <option value={R2_CONFIG.FOLDERS.CONSTRUCTION}>Construction</option>
                    <option value={R2_CONFIG.FOLDERS.EVENTS}>Events</option>
                    <option value={R2_CONFIG.FOLDERS.AGRICULTURE}>Agriculture</option>
                    <option value={R2_CONFIG.FOLDERS.URBAN}>Urban</option>
                  </select>
                </div>

                <MediaUpload
                  category={(document.getElementById('upload-category') as HTMLSelectElement)?.value || R2_CONFIG.FOLDERS.WEDDINGS}
                  onUploadComplete={(urls) => {
                    console.log('Upload complete:', urls);
                    alert(`Successfully uploaded ${urls.length} file(s)!`);
                  }}
                  maxFiles={20}
                  acceptImages={true}
                  acceptVideos={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="manage" className="mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <MediaManager />
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Help Section */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Check out the R2 Setup Guide for detailed instructions on configuring Cloudflare R2.
          </p>
          <a
            href="/R2_SETUP_GUIDE.md"
            target="_blank"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Setup Guide
          </a>
        </div>
      </div>
    </div>
  );
};

export default MediaAdmin;

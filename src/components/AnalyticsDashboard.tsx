import React, { useState, useEffect } from 'react';
import { getAnalyticsData, clearAnalyticsData } from '../utils/analytics';
import { MessageCircle, Phone, Mail, Send, Users, TrendingUp, Calendar, Download } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    const data = getAnalyticsData();
    setAnalyticsData(data);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      clearAnalyticsData();
      loadAnalyticsData();
    }
  };

  const exportData = () => {
    if (!analyticsData) return;
    
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `primesky-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="View Analytics"
      >
        <TrendingUp className="w-5 h-5" />
      </button>
    );
  }

  if (!analyticsData) {
    return (
      <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl p-4 z-50">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl p-6 z-50 max-w-md max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Contact Analytics
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-emerald-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">WhatsApp</span>
          </div>
          <p className="text-xl font-bold text-emerald-900">{analyticsData.summary.totalWhatsAppClicks}</p>
          <p className="text-xs text-emerald-600">Total Clicks</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Total Events</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{analyticsData.summary.totalContactEvents}</p>
          <p className="text-xs text-blue-600">All Interactions</p>
        </div>
      </div>

      {/* Clicks by Source */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">WhatsApp Clicks by Source</h4>
        <div className="space-y-1">
          {Object.entries(analyticsData.summary.clicksBySource).map(([source, count]: [string, any]) => (
            <div key={source} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 capitalize">{source.replace('-', ' ')}</span>
              <span className="font-medium text-gray-800">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent WhatsApp Clicks</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {analyticsData.summary.recentClicks.map((click: any, index: number) => (
            <div key={index} className="text-xs bg-gray-50 p-2 rounded">
              <div className="flex justify-between">
                <span className="font-medium">{click.source}</span>
                <span className="text-gray-500">
                  {new Date(click.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="text-gray-600 mt-1">
                {new Date(click.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Events Breakdown */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Contact Events</h4>
        <div className="space-y-1">
          {analyticsData.contactEvents.reduce((acc: any, event: any) => {
            acc[event.type] = (acc[event.type] || 0) + 1;
            return acc;
          }, {}) && Object.entries(analyticsData.contactEvents.reduce((acc: any, event: any) => {
            acc[event.type] = (acc[event.type] || 0) + 1;
            return acc;
          }, {})).map(([type, count]: [string, any]) => (
            <div key={type} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                {type === 'whatsapp_click' && <MessageCircle className="w-3 h-3 text-emerald-600" />}
                {type === 'phone_call' && <Phone className="w-3 h-3 text-blue-600" />}
                {type === 'email_click' && <Mail className="w-3 h-3 text-purple-600" />}
                {type === 'form_submission' && <Send className="w-3 h-3 text-orange-600" />}
                <span className="text-gray-600 capitalize">{type.replace('_', ' ')}</span>
              </div>
              <span className="font-medium text-gray-800">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={exportData}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
        >
          <Download className="w-3 h-3" />
          Export
        </button>
        <button
          onClick={loadAnalyticsData}
          className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-xs hover:bg-gray-700 transition-colors"
        >
          Refresh
        </button>
        <button
          onClick={handleClearData}
          className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-xs hover:bg-red-700 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Session Info */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Session: {analyticsData.summary.sessionId.split('_')[1]}
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

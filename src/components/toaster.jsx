import React, { useState } from 'react';

const DownloadToaster = () => {
  const [toasts, setToasts] = useState([]);
  
  // Function to handle download and show toast
  const startDownload = (url) => {
    try {
      // Show toast notification
      const toastId = Date.now();
      setToasts(prev => [...prev, {
        id: toastId,
        message: "Download started successfully!",
        type: "success"
      }]);
      
      // Remove toast after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== toastId));
      }, 5000);
      
      // Create invisible iframe for download
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);
      console.log("Download started silently.");
      
      // Remove iframe after download initiated
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 5000);
      
    } catch (error) {
      // Show error toast
      const errorToastId = Date.now();
      setToasts(prev => [...prev, {
        id: errorToastId,
        message: "Download failed to start. Please try again.",
        type: "error"
      }]);
      
      console.error("Error loading download:", error);
      
      // Remove error toast after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== errorToastId));
      }, 5000);
    }
  };
  
  return (
    <div className="p-4">
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => startDownload('https://example.com/download-file')}
      >
        Start Download
      </button>
      
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`p-3 rounded shadow-lg flex items-center justify-between max-w-xs animate-fade-in
              ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          >
            <span>{toast.message}</span>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadToaster;
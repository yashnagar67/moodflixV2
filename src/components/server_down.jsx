import React, { useState, useEffect } from 'react';

export default function MaintenancePage() {
  const [progress, setProgress] = useState(0);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 2;
        if (newProgress >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setShowRefreshButton(true);
          }, 2000);
          return 95;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Animate the loading dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // Refresh the page
  const handleRefresh = () => {
    window.location.reload();
  };

  // Toggle details expansion
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      {/* Netflix-style logo animation */}
      <div className="mb-16 relative">
        <div className="w-24 h-24 relative">
          <div className="animate-pulse absolute inset-0 rounded-full bg-red-600 opacity-75"></div>
          <div className="relative rounded-full bg-red-600 w-24 h-24 flex items-center justify-center shadow-lg shadow-red-800/30">
            <span className="text-white font-bold text-3xl">M</span>
          </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full">
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-lg text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          We'll Be Right Back
        </h1>
        
        <p className="text-gray-300 text-lg mb-8">
          MoodFlix is currently undergoing scheduled maintenance to make your streaming experience even better.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6 overflow-hidden">
          <div 
            className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-gray-400 text-sm mb-8">
          {showRefreshButton ? (
            <span>System updates complete</span>
          ) : (
            <span>System updates in progress{loadingDots}</span>
          )}
        </div>

        {/* Refresh button */}
        {showRefreshButton ? (
          <button 
            onClick={handleRefresh}
            className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-8 py-3 rounded-md font-medium transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Refresh Now
          </button>
        ) : (
          <div className="flex items-center justify-center space-x-2 h-12">
            <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-300">Please wait...</span>
          </div>
        )}
      </div>

      {/* Technical details accordion */}
      <div className="w-full max-w-lg bg-gray-900/50 rounded-lg backdrop-blur-sm border border-gray-800">
        <button 
          onClick={toggleDetails}
          className="w-full flex items-center justify-between p-4 text-left text-gray-300 hover:text-white transition-colors"
        >
          <span className="font-medium">Technical Details</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
            <p className="mb-3">
              We're currently upgrading our servers to provide you with improved streaming speeds and reliability.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-white text-sm font-medium mb-1">Status</h3>
                <p className="text-xs">Maintenance in progress</p>
              </div>
              <div>
                <h3 className="text-white text-sm font-medium mb-1">Expected Completion</h3>
                <p className="text-xs">Within 1 hour</p>
              </div>
              <div>
                <h3 className="text-white text-sm font-medium mb-1">Affected Services</h3>
                <p className="text-xs">Streaming, Search, User Profiles</p>
              </div>
              <div>
                <h3 className="text-white text-sm font-medium mb-1">Maintenance ID</h3>
                <p className="text-xs">MF-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming soon movie cards */}
      <div className="w-full max-w-4xl mt-16">
        <h2 className="text-lg font-medium mb-6 text-center">Coming Soon</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="relative group overflow-hidden rounded-md">
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-sm font-medium">Coming Soon</div>
                  <div className="text-xs text-gray-400">When we're back online</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with social links */}
      <div className="mt-16 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {['Facebook', 'Twitter', 'Instagram'].map((social) => (
            <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              {social}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} MoodFlix. All rights reserved.
        </p>
      </div>
    </div>
  );
}
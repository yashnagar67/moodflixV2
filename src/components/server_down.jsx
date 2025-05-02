import React, { useState, useEffect } from 'react';

export default function MaintenancePage() {
  const [progress, setProgress] = useState(0);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [upComings, setupComings] = useState([])
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate progress based on 1-hour maintenance duration
  const [startTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState('');
  const maintenanceDuration = 300 * 300 * 1000; // 1 hour in milliseconds
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/upcoming');
        if (!res.ok) throw new Error('Failed to fetch popular movies');
        
        const data = await res.json();
        setupComings(data);
      } catch (err) {
        console.error('Error:', err);
        // Fallback data
        setupComings([]);
      } finally {
        // Simulate loading for better UX
        setTimeout(() => setLoading(false), 800); 
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Calculate elapsed time
      const elapsedTime = now - startTime;
      
      // Calculate progress percentage (capped at 95%)
      const calculatedProgress = Math.min(95, (elapsedTime / maintenanceDuration) * 100);
      
      setProgress(calculatedProgress);
      
      // Calculate time remaining
      const remainingMs = Math.max(0, maintenanceDuration - elapsedTime);
      const remainingMinutes = Math.floor(remainingMs / 60000);
      const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);
      setTimeRemaining(`${remainingMinutes}m ${remainingSeconds}s`);
      
      // Show refresh button when progress reaches 95%
      if (calculatedProgress >= 95) {
        setShowRefreshButton(true);
        clearInterval(timer);
      }
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [startTime]);

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
      <div className="mb-16 relative flex flex-col items-center">
        <div className="w-24 h-24 relative">
          <div className="animate-pulse absolute inset-0 rounded-full bg-red-600 opacity-75"></div>
          <div className="relative rounded-full bg-red-600 w-24 h-24 flex items-center justify-center shadow-lg shadow-red-800/30">
            <span className="text-white font-bold text-3xl">M</span>
          </div>
        </div>
        <div className="w-64 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-4"></div>
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
            <div>
              <span>System updates in progress{loadingDots}</span>
              <div className="mt-2 text-red-500 font-medium">Estimated time remaining: {timeRemaining}</div>
            </div>
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
                <p className="text-xs">Approximately {timeRemaining} remaining</p>
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
        {upComings.map((movie) => (
            <div 
            key={movie.id}
            
            className="relative group rounded-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl"
          >
            <div className="">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover transition-opacity duration-500"
                onLoad={(e) => e.target.classList.remove('opacity-0')}
              />
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-sm font-medium truncate">{movie.title}</h4>
                
                <div className="flex items-center justify-between mt-2">
                  {movie.rating && (
                    <div className="flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs">{movie.rating}</span>
                    </div>
                  )}
                  
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 bg-white/10 hover:bg-white/20 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </button>
                </div>
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
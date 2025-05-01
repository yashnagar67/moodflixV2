import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Download = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { title, quality } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(12);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [showPremiumOffer, setShowPremiumOffer] = useState(false);
  const [showAds, setShowAds] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const iframeRef = useRef(null);
  const [downloadSpeed, setDownloadSpeed] = useState(1); // Initial download speed
  
  // Get premium offer status from localStorage once during component mount
  const [hasSeenPremiumOffer, setHasSeenPremiumOffer] = useState(
    localStorage.getItem('hasSeenPremiumOffer') === 'true'
  );

  // Simulated premium benefits
  const premiumBenefits = [
    { icon: "🚀", text: "Download 5x faster" },
    { icon: "🔐", text: "No ads or waiting time" },
    { icon: "📱", text: "Download on any device" },
    { icon: "💾", text: "Unlimited downloads" }
  ];
  const shortenTitle = (title) => {
  
    const match = title.match(/^(.+?)\s*\((\d{4})\)/);
    if (match) {
      const name = match[1].trim().replace(/\s+/g, "-");
      const year = match[2];
      return `${name}-${year}`;
    } else {
      return title.trim().replace(/\s+/g, "-");
    }
  };
  const handleChnage = (movieData) => {
    const title = (movieData?.title || movie.title).replace(/ - /g, " ");
    const year = movieData?.year || movie.year;
  
    console.log("Download initiated for:", title);
    navigate(`/go/${title}-${year}`);
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowButtons(true);
          fetchLinks();
          fetchSimilarMovies();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://movieadminpanel-8lmd.onrender.com/download-links/${shortenTitle(title)}/${quality}`);
    //   const response = await fetch(`https://movieadminpanel-8lmd.onrender.com/newdl/download-links/Blackbag/1080p`);
      const data = await response.json();
      if (data.servers && Object.keys(data.servers).length > 0) {
        // Make sure the first server is premium
        const serverLinks = Object.entries(data.servers).map(([key, url], index) => ({
          server: key,
          url: url,
          speed: index === 0 ? 5 : Math.floor(Math.random() * 3) + 1, // First server is premium with speed 5
          isPremium: index === 0
        }));
        setLinks(serverLinks);
      } else {
        setError('No links available at the moment.');
      }
    } catch (err) {
      setError('Failed to fetch download links.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarMovies = async () => {
    try {
      // Example API call for similar movies
      const response = await fetch(`https://movieadminpanel-8lmd.onrender.com/api/similar-movies/${encodeURIComponent(title)}`);
      const data = await response.json();
      setSimilarMovies(data);
    } catch (err) {
      console.error('Failed to fetch similar movies', err);
      // Fallback sample data
      setSimilarMovies([
        { id: 1, title: "The Dark Knight", rating: 8.9, year: 2008, poster: "darknight.jpg" },
        { id: 2, title: "Inception", rating: 8.8, year: 2010, poster: "inception.jpg" },
        { id: 3, title: "Interstellar", rating: 8.6, year: 2014, poster: "interstellar.jpg" },
        { id: 4, title: "The Prestige", rating: 8.5, year: 2006, poster: "prestige.jpg" }
      ]);
    }
  };

  // New silent download function using iframe
  const handleSilentDownload = (url) => {
    // Create iframe if it doesn't exist
    if (!iframeRef.current) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframeRef.current = iframe;
    }

    // Set iframe source to the download URL
    iframeRef.current.src = url;
    
    // Start simulated download progress
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += downloadSpeed; // Use the current download speed
      if (progress >= 100) {
        clearInterval(progressInterval);
        progress = 100;
        setTimeout(() => {
          setIsDownloading(false);
        }, 1000);
      }
      setDownloadProgress(progress);
    }, 100);
  };

  const handleDownloadClick = async (url, server, isPremium) => {
    // First check if user has seen premium offer
    if (!hasSeenPremiumOffer && isPremium) {
      // Show premium offer first time
      setShowPremiumOffer(true);
      return;
    }
    
    // If user has already seen premium offer, show ads for free users
    setShowAds(true);
    
    // Reset download speed to initial value
    setDownloadSpeed(1);
    
    // After ad display time, initiate silent download
    setTimeout(() => {
      setShowAds(false);
      
      // Start silent download
      handleSilentDownload(url);
      
      // After 3 seconds, increase download speed
      setTimeout(() => {
        setDownloadSpeed(5); // Increase speed 5x
        // Display speed increase notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-20 right-4 bg-green-600 text-white p-3 rounded-lg shadow-lg z-40';
        notification.textContent = '🚀 Download speed increased in 15 sec! Now downloading 5x faster';
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      }, 3000);
    }, 5000); // Show ad for 3 seconds
  };
  
  // Download progress indicator component
  const DownloadProgressIndicator = () => (
    isDownloading && (
      <div className="fixed bottom-4 right-4 bg-gray-900 p-4 rounded-lg shadow-lg z-40 w-64">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Downloading...</span>
          <span className="text-sm text-gray-400">{downloadProgress}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div 
            className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${downloadProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-400">
            Speed: {downloadSpeed === 5 ? '5x (Premium)' : '1x (Standard)'}
          </span>
          <span className="text-sm text-gray-400">
            {downloadSpeed === 5 ? '🚀' : '⚡'}
          </span>
        </div>
      </div>
    )
  );

  const handleClosePremiumOffer = () => {
    // Update localStorage and state to mark premium offer as seen
    localStorage.setItem('hasSeenPremiumOffer', 'true');
    setHasSeenPremiumOffer(true);
    setShowPremiumOffer(false);
    
    // Show ads after declining premium
    setShowAds(true);
    
    // Close ads after 3 seconds
    setTimeout(() => {
      setShowAds(false);
    }, 3000);
  };

  const getSpeedIcon = (speed) => {
    switch(speed) {
      case 5: return '⚡⚡⚡⚡⚡';
      case 3: return '⚡⚡⚡';
      case 2: return '⚡⚡';
      default: return '⚡';
    }
  };

  const shareUrl = window.location.href;

  // Netflix-style loader
  const NetflixLoader = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-16 h-16 relative">
        <div className="animate-ping absolute inset-0 rounded-full bg-red-600 opacity-75"></div>
        <div className="relative rounded-full bg-red-600 w-16 h-16 flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
      {/* Hidden iframe for silent downloads */}
      <iframe ref={iframeRef} style={{ display: 'none' }} title="download-frame" />
      
      {/* Netflix-style loader when loading */}
      {loading && <NetflixLoader />}

      {/* Header */}
      <div className="w-full bg-gradient-to-b from-gray-900 to-black py-4 px-6 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-300 hover:text-white"
          >
            ← Back
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="text-gray-300 hover:text-white"
          >
            🏠 Home
          </button>
        </div>
        <div className="text-red-600 font-bold text-2xl">MOODFLIX</div>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium">
          Sign In
        </button>
      </div>

      {/* Movie info */}
      <div className="w-full max-w-4xl px-6">
        <h1 className="text-3xl font-bold mb-2">{decodeURIComponent(title)}</h1>
        <div className="flex items-center gap-4 mb-6 text-gray-300">
          <span className="border border-gray-600 px-2 py-1 rounded text-sm">{quality}</span>
          <span>22022</span>
          <span className="bg-gray-800 px-2 py-1 rounded text-sm">HD</span>
        </div>
      </div>

      {/* Premium offer overlay - shown only ONCE */}
      {showPremiumOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-red-600">Premium Download</h2>
              <button 
                onClick={handleClosePremiumOffer}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <p className="mb-6">Upgrade to Premium for instant access to {decodeURIComponent(title)} and thousands more titles!</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {premiumBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xl">{benefit.icon}</span>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700">
                Start Premium - $9.99/month
              </button>
              <button 
                onClick={handleClosePremiumOffer}
                className="w-full bg-transparent border border-gray-600 py-3 rounded font-bold hover:bg-gray-800"
              >
                Continue with Free Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ads overlay - shown after premium is declined */}
      {showAds && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Advertisement</h2>
              <div className="bg-gray-800 px-2 py-1 rounded text-sm">
                Closes in 3s
              </div>
            </div>
            
            <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
              <p className="text-gray-400">Advertisement Content</p>
            </div>
            
            <div className="text-center text-gray-400 text-sm">
              Go Premium to remove all ads
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-xl overflow-hidden mb-8">
        {/* Main content area */}
        <div className="p-6">
          {!showButtons && (
            <div className="flex flex-col items-center py-10">
              {/* Netflix-style loading animation */}
              <div className="w-16 h-16 relative mb-4">
                <div className="animate-ping absolute inset-0 rounded-full bg-red-600 opacity-75"></div>
                <div className="relative rounded-full bg-red-600 w-16 h-16 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
              </div>
              <p className="text-xl font-medium mb-2">Preparing Your Download</p>
              <div className="w-full max-w-md bg-gray-800 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${((12 - countdown) / 12) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-400">Ready in {countdown} seconds</p>
            </div>
          )}

          {error && (
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <button 
                onClick={fetchLinks} 
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {showButtons && links.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-medium mb-4">Download Servers</h2>
              
              {/* Premium server - always the first one */}
              {links.length > 0 && links[0].isPremium && (
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-1">
                  <div className="border border-red-600 rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-xs px-2 py-1 rounded-bl">
                      PREMIUM
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-lg">Premium Server</p>
                        <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                          <span className="text-yellow-400">⚡⚡⚡⚡⚡</span>
                          <span>Fastest Speed</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownloadClick(links[0].url, links[0].server, true)}
                        className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-bold flex items-center gap-2"
                      >
                        Download Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Regular download options - start from index 1 to skip premium */}
              {links.slice(1).map((link, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 hover:bg-gray-750 rounded-lg p-4 transition-all cursor-pointer"
                  onClick={() => handleDownloadClick(link.url, link.server, false)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Server {link.server}</p>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                        <span className="text-yellow-500">{getSpeedIcon(link.speed)}</span>
                        <span>
                          {link.speed === 5 ? 'Premium' : 
                           link.speed === 3 ? 'Fast' : 
                           link.speed === 2 ? 'Medium' : 'Standard'} Speed
                        </span>
                      </div>
                    </div>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center gap-2">
                      <span>Download</span>
                      <span className="text-xl">↓</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showButtons && links.length === 0 && !loading && !error && (
            <div className="text-center py-8">
              <p className="text-gray-300 mb-4">No download links available right now.</p>
              <button 
                onClick={fetchLinks}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-medium"
              >
                Refresh
              </button>
            </div>
          )}
          <DownloadProgressIndicator />
        </div>
      </div>

      {/* Social sharing */}
      {showButtons && (
        <div className="w-full max-w-4xl mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="font-medium mb-4">Share with friends</h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="flex-1 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded flex items-center justify-center gap-2 transition-colors"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <span className="text-lg">📋</span>
                <span>Copy Link</span>
              </button>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${decodeURIComponent(title)} in ${quality}: ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-3 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-lg">📱</span>
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out ${decodeURIComponent(title)} in ${quality}!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-lg">✈️</span>
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Similar content recommendation */}
      <div className="w-full max-w-4xl mb-12">
        <h3 className="text-xl font-medium px-6 mb-4">You may also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
        {similarMovies.map((similar) => (
            <div onClick={()=>handleChnage(similar)}
              key={similar.id}
              className="relative group rounded-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              <img
                src={similar.poster}
                alt={similar.title}
                className="w-full aspect-[2/3] object-cover"
              />
              
              {/* Netflix-style hover overlay */}
              <div className="absolute inset-0 sm:opacity-100 bg-gradient-to-t from-black/90 via-black/60 to-transparent lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-sm font-medium truncate">{similar.title}</h3>
                    {similar.rating && (
                      <div className="flex items-center space-x-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs">{similar.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer with premium CTA */}
      <div className="w-full bg-gray-900 py-8 px-6 text-center">
        <p className="text-xl font-bold mb-2">Unlimited Downloads</p>
        <p className="text-gray-400 mb-6">Start your premium membership today</p>
        <button className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700">
          Get Premium Access
        </button>
      </div>
    </div>
  );
};

export default Download;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const navigate = useNavigate();

  // Handle movie actions
  const handleDownload = (movieData, quality = '1080p') => {
    const title = (movieData?.title || movie.title).replace(/ - /g, " ");
    const year = movieData?.year || movie.year;
    const formattedTitle = encodeURIComponent(`${title}-${year}`);
  
    console.log(`Download initiated for: ${formattedTitle}, Quality: ${quality}`);
    navigate(`/download/${formattedTitle}/${quality}`);
  };
  const handleChnage = (movieData) => {
    const title = (movieData?.title || movie.title).replace(/ - /g, " ");
    const year = movieData?.year || movie.year;
  
    console.log("Download initiated for:", title);
    navigate(`/go/${title}-${year}`);
  };

  const toggleQualityOptions = () => {
    setShowQualityOptions(!showQualityOptions);
  };

  const toggleWatchlist = () => {
    setInWatchlist(!inWatchlist);
    // You could add toast notification here
  };

  const playTrailer = () => {
    setIsTrailerPlaying(true);
    // Could track analytics event here
  };

  const pauseTrailer = () => {
    setIsTrailerPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Fetch movie data
  useEffect(() => {
    console.log("Fetching movie data for ID:", id);
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://movieadminpanel-8lmd.onrender.com/api/fetchmovie/${id}`);
        const data = await res.json();
        console.log("Movie data received:", data);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        // Could add error state handling here
      } finally {
        // Simulate a minimum loading time for smoother UX
        setTimeout(() => setLoading(false), 50);
      }
    };
    
    if (id) fetchMovie();
    
    // Scroll listener for sticky controls
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  // Click outside handler for quality options popup
  useEffect(() => {
    if (showQualityOptions) {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.quality-options-container')) {
          setShowQualityOptions(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showQualityOptions]);

  // Loading state
  if (loading) return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black min-h-screen">
      <div className="w-16 h-16 relative">
        <div className="animate-ping absolute inset-0 rounded-full bg-red-600 opacity-75"></div>
        <div className="relative rounded-full bg-red-600 w-16 h-16 flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-screen max-h-[85vh] md:max-h-[70vh] overflow-hidden">
        {/* Poster Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.posterUrl})` }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        
        {/* Netflix-style top navigation */}
        <div className="relative z-10 w-full p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-black/40 backdrop-blur-sm"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-4">
              <button 
                onClick={toggleWatchlist}
                className="p-2 rounded-full bg-black/40 backdrop-blur-sm"
                aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              >
                {inWatchlist ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>
              
              <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Movie Title and Info */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-6">
          {/* Netflix-style title treatment */}
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            {movie.title}
          </h1>
          
          {/* Movie stats */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-300">
            <span className="bg-gray-700 px-1 rounded text-xs">{movie.ageRating}</span>
            <span>{movie.year}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{movie.duration}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.rating}/10
            </span>
          </div>
          
          {/* Genres pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-800/70 rounded-full text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
          
          {/* Mobile-friendly action buttons */}
          <div className="flex gap-3">
            <button 
              onClick={playTrailer}
              className="flex-1 bg-white text-black hover:bg-gray-200 transition px-4 py-3 rounded-md flex items-center justify-center font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </button>
            <div className="flex-1 relative quality-options-container">
              <button 
                onClick={toggleQualityOptions}
                className="w-full bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded-md flex items-center justify-center font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-2 transition-transform ${showQualityOptions ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Quality options dropdown */}
              {showQualityOptions && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-gray-800 rounded-md shadow-lg overflow-hidden">
                  <button 
                    onClick={() => handleDownload(movie, '1080p')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-700 flex items-center"
                  >
                    <span className="flex-1 font-medium">1080p</span>
                    <span className="text-xs text-gray-400">HD</span>
                  </button>
                  <button 
                    onClick={() => handleDownload(movie, '720p')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-700 flex items-center"
                  >
                    <span className="flex-1 font-medium">720p</span>
                    <span className="text-xs text-gray-400">SD</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="container mx-auto px-4 py-6">
        {/* Description with "Read more" functionality */}
        <div className="mb-6">
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            {movie.description}
          </p>
        </div>
        
        {/* Cast and Crew */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-2">Cast & Crew</h2>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4">
            {movie.cast.map((actor, index) => (
              <div key={index} className="flex-shrink-0 w-20">
                <img 
                  src={actor.image} 
                  alt={actor.name} 
                  className="w-20 h-20 rounded-md mb-2 object-cover"
                />
                <p className="text-white text-xs font-medium">{actor.name}</p>
                <p className="text-gray-400 text-xs">{actor.character}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-sm text-gray-400">Director</h3>
              <p className="text-white text-sm">{movie.director}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Release Date</h3>
              <p className="text-white text-sm">{movie.releaseDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gray-800 w-full"></div>
      </div>

      {/* Trailer Section */}
      <div className="container mx-auto px-4 py-6 ">
        <h2 className="text-lg font-medium mb-4">Trailer</h2>
        <div className="relative rounded-lg overflow-hidden bg-gray-900">
          {isTrailerPlaying ? (
            <div className="relative">
              <iframe 
                className="w-full aspect-video h-[40vh]" 
                src={`${movie.trailerUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              {/* Controls overlay */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button 
                  onClick={pauseTrailer}
                  className="rounded-full bg-black/70 text-white hover:bg-black transition"
                  aria-label="Pause trailer"
                >
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="relative cursor-pointer"
              onClick={playTrailer}
            >
              {/* We'll use a thumbnail from the trailer or movie poster */}
              <div 
                className="w-full aspect-video bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${movie.posterUrl})`,
                  filter: 'brightness(0.7)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/50 p-4 transform hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Netflix-style info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Official Trailer</h3>
                    <p className="text-xs text-gray-400">{movie.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gray-800 w-full"></div>
      </div>

      {/* More Like This Section - Netflix style */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-medium mb-4">More Like This</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {movie.similarMovies.map((similar) => (
            <div onClick={()=>handleChnage(similar)}
              key={similar.id}
              className="relative group rounded-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              <img
                src={similar.posterUrl}
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

      {/* Sticky Watch Now button - Netflix style */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent py-4 px-4 transform transition-all duration-300 ${
          isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto flex gap-3">
          <button 
            onClick={playTrailer}
            className="flex-1 bg-white text-black px-4 py-3 rounded-md flex items-center justify-center font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play
          </button>
          
          {/* Download quality options for sticky button */}
          <div className="flex-1 flex gap-2">
            <button 
              onClick={() => handleDownload(movie, '1080p')}
              className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-md flex items-center justify-center font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              1080p
            </button>
            
            <button 
              onClick={() => handleDownload(movie, '720p')}
              className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-md flex items-center justify-center font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              720p
            </button>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
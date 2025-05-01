import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from 'react';
import MovieControls from './MovieControl'
const YouTubePlayer = lazy(() => import('./YouTubePlayer'));;

import { throttle } from 'lodash';
// Sample movie data
const movies = [
  {
    id: 1,
    title: "Mickey 17",
    desktopImage: "https://image.tmdb.org/t/p/original/qUc0Hol3eP74dbW4YyqT6oRLYgT.jpg",
    mobileImage: "https://m.media-amazon.com/images/M/MV5BMjgxNDc0ZTgtOTMzYy00MzIzLThhMWMtNGQ2ZTI3ZDFkNTFhXkEyXkFqcGc@._V1_QL75_UX1230_.jpg",
    trailerUrl: "https://www.youtube.com/embed/tA1s65o_kYM",
    platform: "Amazon Prime",
    watchLink: "https://links.kmhd.net/play?id=a5a55f61",
    accentColor: "from-amber-900/70",
    genre: ["Sci-Fi", "Action", "Adventure"],
    year: "2025",
    description: "Unlikely hero Mickey Barnes finds himself in the extraordinary circumstance of working for an employer who demands the ultimate commitment to the job… to die, for a living.",
    duration: "2h 10m",
    gif: "https://movieadminpanel-8lmd.onrender.com/mickey17.webm",
    rating: 6.95,
    maturityRating: "PG-13",
  },
  {
    id: 2,
    title: "A Minecraft Movie",
    desktopImage: "https://m.media-amazon.com/images/M/MV5BNjgxMWQ3ZTgtMDJhZi00N2ZkLWI5MTUtOTZjZThiMDM2ZmM1XkEyXkFqcGc@._V1_QL75_UX603_.jpg",
    mobileImage: "https://m.media-amazon.com/images/M/MV5BZGQzMjVhNzYtZWIyOS00ZmEyLTk1YWEtMjkwZGY1NjAwZjA0XkEyXkFqcGc@._V1_QL75_UX1230_.jpg",
    trailerUrl: "https://www.youtube.com/embed/8B1EtVPBSMw",
    platform: "Netflix",
    watchLink: "https://lordhd.mov/a-minecraft-movie-2025-hindi/",
    accentColor: "from-green-800/70",
    genre: ["Animation", "Adventure", "Fantasy"],
    year: "2025",
    gif: "https://movieadminpanel-8lmd.onrender.com/amincraft.webm",

    description: "Four misfits are pulled into a mysterious portal into the Overworld: a bizarre, cubic wonderland. To get back, they must master this world and team up with expert crafter Steve.",
    duration: "1h 45m",
    rating: 6.07,
    maturityRating: "PG",
  },
  {
    id: 3,
    title: "A Working Man",
    desktopImage: "https://m.media-amazon.com/images/M/MV5BZGQyODUyMmMtNGExZi00NGE1LTgwZjUtY2NiYWM4ZmViNjZiXkEyXkFqcGc@._V1_QL75_UX655.5_.jpg",
    mobileImage: "https://m.media-amazon.com/images/M/MV5BZjc3MTNjZDItNTVjYi00MzU3LTljZmItMjQ4MzRkMWFiMzcwXkEyXkFqcGc@._V1_QL75_UX261_.jpg",
    trailerUrl: "https://www.youtube.com/embed/mdfrG2cLK58",
    platform: "HBO Max",
    watchLink: "https://fast-dl.lol/dl/46a149",
    gif: "https://movieadminpanel-8lmd.onrender.com/aworkingman.webm",

    accentColor: "from-stone-800/70",
    genre: ["Action", "Drama", "Thriller"],
    year: "2025",
    description: "Levon Cade, an ex-black ops soldier, must take down a human trafficking ring after the daughter of a friend is taken.",
    duration: "2h",
    rating: 6.49,
    maturityRating: "R",
  },
  {
    id: 4,
    title: "Captain America: Brave New World",
    desktopImage: "https://m.media-amazon.com/images/M/MV5BZTQzOGVjM2UtMjA3ZC00OGRlLTlkNGMtMzUzMmIwYWIzMmM0XkEyXkFqcGc@._V1_QL75_UX1230_.jpg",
    mobileImage: "https://m.media-amazon.com/images/M/MV5BMjMzM2Q3NTAtOWE4Ni00OGM0LWI5YjItMjdiYjQ0ZWUyYTY3XkEyXkFqcGc@._V1_QL75_UX1230_.jpg",
    trailerUrl: "https://www.youtube.com/embed/5PSzFLV-EyQ",
    platform: "Disney+",
    watchLink: "https://links.kmhd.net/play?id=c10d27bd",
    accentColor: "from-blue-900/70",
    gif: "https://movieadminpanel-8lmd.onrender.com/captainamaricabrave.webm",

    genre: ["Action", "Superhero", "Sci-Fi"],
    year: "2025",
    description: "Sam Wilson steps up as the new Captain America and faces an international crisis with global consequences.",
    duration: "2h 20m",
    rating: 6.08,
    // gif: "https://movieadminpanel-8lmd.onrender.com/mickey17.mp4",

    maturityRating: "PG-13",
  },
  {
    id: 6,
    title: "The Raid 2",
    desktopImage: "https://m.media-amazon.com/images/M/MV5BNDY4ODI3NGUtYTg4Ny00NGFlLWIyYjctNzc0YjI2YWJlMTQ4XkEyXkFqcGc@._V1_QL75_UX823.5_.jpg",
    mobileImage: "https://m.media-amazon.com/images/M/MV5BNDU2ZmVlNmItOGRhNC00OTk2LTkxMzgtNTkyYzc5NGE2OTY5XkEyXkFqcGc@._V1_QL75_UX382.5_.jpg",
    trailerUrl: "https://www.youtube.com/embed/kQF1gl7nLaU",
    platform: "Netflix",
    watchLink: "https://fast-dl.lol/dl/8ff14e", // example link
    accentColor: "from-gray-900/80",
    gif: "https://movieadminpanel-8lmd.onrender.com/mickey17.webm",

    genre: ["Action", "Crime", "Thriller"],
    year: "2025",
    description: "After fighting his way out of a building filled with gangsters and madmen, Rama goes undercover with the thugs of Jakarta to bring down the corrupt police and criminal underworld from within.",
    duration: "2h 30m",
    rating: 8.0,
    maturityRating: "18+",
  }

];

export default function OptimizedMovieSlider() {

  const [showMoodSelector, setShowMoodSelector] = useState(() => {
    // Check if user has already seen the mood selector
    return localStorage.getItem('moodSelectorSeen') !== 'true';
  });
  
  const [selectedMood, setSelectedMood] = useState(() => {
    // Get previously selected mood if available
    return localStorage.getItem('selectedMood') || null;
  });
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isGifPlaying, setIsGifPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoldingTouch, setIsHoldingTouch] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isNavHidden, setIsNavHidden] = useState(false);
  
  const timerRef = useRef(null);
  const touchTimeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const sliderRef = useRef(null);
  const videoRef = useRef(null);  // Add this ref for GIF videos
  const lastScrollTop = useRef(0);

  // Detect if device is mobile
  const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth < 768);
 

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show mood selector after loading
      
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  const handleDownload = (movie) => {
    console.log("Download button clicked!");
    try {
      // Invisible iframe method
      // const iframe = document.createElement('iframe');
      // window.location.href = url;
      navigate(`/go/${movie.title}-${movie.year}`); // Or movie.slug


      
      
      // Show toast
      
      // Hide toast after 3 seconds
      // setTimeout(() => {
      //   setShowToast(true);

      // }, 1000);
      // setTimeout(() => {
      //   setShowToast(false);
      // }, 4000);
      
    } catch (error) {
      console.error("Error loading download silently:", error);
    }
  };

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Page Visibility API - Pause audio/video when page is hidden
  useEffect(() => {
    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // When page is hidden (tab switch, minimize, navigate away)
        if (isTrailerPlaying) {
          setIsTrailerPlaying(false);
          setIsMuted(true)
        }
        
        // Pause any playing GIF video
        if (videoRef.current) {
          videoRef.current.pause();
        }
        
        setIsGifPlaying(false);
      }
    };
    
    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up listener when component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTrailerPlaying]);

  // Clean up before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Stop any playing media before navigating away
      if (videoRef.current) {
        videoRef.current.pause();
      }
      
      setIsTrailerPlaying(false);
      setIsGifPlaying(false);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle scroll for fixed navbar
// Throttled scroll handler
const throttledScrollHandler = useCallback(
  throttle(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      if (currentScrollY > lastScrollTop.current) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
    } else {
      setIsNavHidden(false);
    }
    
    lastScrollTop.current = currentScrollY;
    
    if (Math.abs(currentScrollY - prevScrollY) > 5) {
      setIsScrolling(true);
      if (isTrailerPlaying) {
        setIsTrailerPlaying(false);
      }
      
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    }
    
    setPrevScrollY(currentScrollY);
  }, 100),
  [isTrailerPlaying, prevScrollY]
);

// Handle scroll for fixed navbar
useEffect(() => {
  window.addEventListener('scroll', throttledScrollHandler, { passive: true });
  return () => {
    window.removeEventListener('scroll', throttledScrollHandler);
    throttledScrollHandler.cancel(); // Cancel any pending executions
  };
}, [throttledScrollHandler]);
  // Auto-slide functionality
  // Auto-slide functionality
  const goToSlide = useCallback((index) => {
    if (currentIndex === index) return;
    
    setIsTrailerPlaying(false);
    setIsGifPlaying(false);
    setCurrentIndex(index);
  }, [currentIndex]);
  
  const prevSlide = useCallback(() => {
    const newIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, movies.length, goToSlide]);
  
  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % movies.length;
    goToSlide(newIndex);
  }, [currentIndex, movies.length, goToSlide]);
  useEffect(() => {
    let timer = null;
    if (!isTrailerPlaying && !isHoldingTouch && !isScrolling ) {
      timer = setTimeout(() => {
        nextSlide();
      }, 20000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex, isTrailerPlaying, isHoldingTouch, isScrolling, nextSlide]);





useEffect(() => {
  // Preload first movie GIF immediately
  if (movies[0].gif) {
    const preloadVideo = document.createElement('video');
    preloadVideo.src = movies[0].gif;
    preloadVideo.load();
    preloadVideo.style.display = 'none';
    document.body.appendChild(preloadVideo);
    
    // Clean up
    return () => {
      document.body.removeChild(preloadVideo);
    };
  }
}, []);
// Auto-start GIF after 2 seconds
useEffect(() => {
  // When slide changes, reset to showing the poster
  setIsGifPlaying(false);
  setIsTrailerPlaying(false);
  
  // Start the GIF after 2 seconds
  const gifTimer = setTimeout(() => {
    setIsGifPlaying(true);
  }, 2000);
  
  // Preload next GIF
  const nextIndex = (currentIndex + 1) % movies.length;
  if (movies[nextIndex].gif) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = movies[nextIndex].gif;
    document.head.appendChild(link);
    
    // Clean up
    return () => {
      document.head.removeChild(link);
      clearTimeout(gifTimer);
    };
  }
  
  return () => {
    clearTimeout(gifTimer);
  };
}, [currentIndex]);

  // Navigation functions
  // Navigation functions


  // Click handler for playing trailer
  const handleContentClick = () => {
    if (!isTrailerPlaying) {
      setIsTrailerPlaying(true);
    }
  };

  // Mobile touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    
    // Start hold-to-play timer
    if (isMobile.current) {
      touchTimeoutRef.current = setTimeout(() => {
        setIsHoldingTouch(true);
        setIsTrailerPlaying(true);
      }, 300); // Hold for 300ms to play
    }
  };

  const handleTouchMove = (e) => {
    // If significant movement, cancel hold-to-play
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;
    
    if (
      Math.abs(touchMoveX - touchStartX.current) > 10 ||
      Math.abs(touchMoveY - touchStartY.current) > 10
    ) {
      clearTimeout(touchTimeoutRef.current);
      
      if (isHoldingTouch) {
        setIsHoldingTouch(false);
      }
    }
    
    touchEndX.current = touchMoveX;
  };

  const handleTouchEnd = () => {
    // Clear hold timer
    clearTimeout(touchTimeoutRef.current);
    
    // Handle swipe if it was a quick gesture
    const touchDuration = Date.now() - touchStartTime.current;
    const touchDiff = touchStartX.current - touchEndX.current;
    
    if (touchDuration < 250 && Math.abs(touchDiff) > 50) {
      // Quick swipe detected
      if (touchDiff > 30) {
        nextSlide();
      } else if (touchDiff < -30) {
        prevSlide();
      }
    } else if (touchDuration < 250) {
      // It was a tap/click, play trailer
      setIsTrailerPlaying(true);
    }
    
    // Reset holding state
    if (isHoldingTouch) {
      setIsHoldingTouch(false);
    }
  };

  // Toggle mute
  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Desktop hover handlers - now we don't auto-play trailer on hover
  const handleMouseEnter = () => {
    // No longer automatically play trailer on hover
  };

  const handleMouseLeave = () => {
    // No action needed
  };

  // Current movie reference
  const currentMovie = movies[currentIndex];
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowMoodSelector(false);
    // Save to localStorage
    localStorage.setItem('selectedMood', mood);
    localStorage.setItem('moodSelectorSeen', 'true');
  };
  const MoodSelector = () => {
    const moods = [
      { id: 'happy', name: 'Happy', icon: '😊', color: 'bg-yellow-500', gradient: 'from-yellow-400 to-yellow-600' },
      { id: 'romantic', name: 'Romantic', icon: '❤️', color: 'bg-red-500', gradient: 'from-red-400 to-pink-600' },
      { id: 'adventurous', name: 'Adventurous', icon: '🚀', color: 'bg-blue-500', gradient: 'from-blue-400 to-indigo-600' },
      { id: 'thriller', name: 'Thriller', icon: '😱', color: 'bg-purple-500', gradient: 'from-purple-400 to-purple-700' },
      { id: 'relaxed', name: 'Relaxed', icon: '😌', color: 'bg-green-500', gradient: 'from-green-400 to-teal-600' }
    ];
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn ">
        {/* Overlay with blur effect - more engaging blur */}
        <div className="absolute inset-0  backdrop-blur-sm"></div>
        
        {/* Popup container with subtle animation */}
        <div className="relative z-10  p-8 rounded-xl shadow-2xl max-w-md w-full   animate-scaleIn">
          {/* Eye-catching header */}
          <div className="mb-6 text-center">
            <h2 className="text-white text-3xl font-bold mb-2">How are you feeling?</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-purple-500 mx-auto mb-3"></div>
            <p className="text-gray-300">We'll personalize your streaming experience</p>
          </div>
          
          {/* More visually appealing mood grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`bg-gradient-to-br ${mood.gradient} rounded-xl flex flex-col items-center justify-center p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-${mood.color.split('-')[1]}-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-${mood.color.split('-')[1]}-500`}
              >
                <span className="text-4xl mb-3 animate-pulse">{mood.icon}</span>
                <span className="text-white font-bold tracking-wide">{mood.name}</span>
              </button>
            ))}
          </div>
          
          {/* More prominent CTA */}
          <div className="flex justify-center space-x-4">
          <button 
  onClick={() => {
    setShowMoodSelector(false);
    localStorage.setItem('moodSelectorSeen', 'true');
  }}
  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all duration-300"
>
  Skip for now
</button>
          </div>
          
          {/* Visual cue to draw attention */}
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 animate-ping opacity-75"></div>
        </div>
        
        {/* Add custom animations */}
        {/* <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
          .animate-scaleIn {
            animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        `}</style> */}
      </div>
    );
  };

  return (
    <div 
      className="relative w-full h-[90vh] lg:h-screen overflow-hidden bg-black"
      ref={sliderRef}
      
    >
      {/* Preload current movie image */}
{!isLoading && (
  <link
    rel="preload"
    href={isMobile.current ? movies[currentIndex].mobileImage : movies[currentIndex].desktopImage}
    as="image"
  />
)}
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-16 h-16 relative">
            <div className="animate-ping absolute inset-0 rounded-full bg-red-600 opacity-75"></div>
            <div className="relative rounded-full bg-red-600 w-16 h-16 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
          </div>
        </div>
      )}

      {/* Header/Navbar - fixed on scroll */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-transform duration-300 ${isNavHidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
          backdropFilter: "blur(4px)"
        }}>
          {!isLoading && (
  <>
    <link
      rel="preload"
      href={isMobile.current ? movies[currentIndex].mobileImage : movies[currentIndex].desktopImage}
      as="image"
    />
    {movies[(currentIndex + 1) % movies.length] && (
      <link
        rel="preload"
        href={isMobile.current ? movies[(currentIndex + 1) % movies.length].mobileImage : movies[(currentIndex + 1) % movies.length].desktopImage}
        as="image"
      />
    )}
  </>
)}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-red-600 font-bold text-xl md:text-2xl mr-4 md:mr-8">
              MOODFLIX
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white p-1"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-gray-300 transition">Home</a>
              <a href="#" className="text-white hover:text-gray-300 transition">Movies</a>
              <a href="#" className="text-white hover:text-gray-300 transition">TV Shows</a>
              <a href="https://adminpanel-frontend-xi.vercel.app/" className="text-white hover:text-gray-300 transition">Admin Panel</a>
              <NavLink to="/recommended" className="text-white hover:text-gray-300 transition">Search</NavLink>
            </nav>
          </div>
          
          <div className="flex items-center">
            <button className="text-white hover:text-gray-300 transition rounded-full overflow-hidden w-7 h-7 md:w-8 md:h-8">
              <img 
                src="/api/placeholder/32/32" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-2 bg-black/90 backdrop-blur-md rounded border border-gray-800">
            <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition">Home</a>
            <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition">Movies</a>
            <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition">TV Shows</a>
            <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition">My List</a>
            <a href="https://adminpanel-frontend-xi.vercel.app/" className="block px-4 py-2 text-white hover:bg-gray-800 transition">Admin Panel</a>
            <NavLink to="/recommended" className="text-white hover:text-gray-300 transition">Search</NavLink>

          </div>
        )}
      </header>

      {/* Main hero slider content with touch event handlers */}
      <div 
        className="relative w-full h-full  mt-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Movie slides */}
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              currentIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleContentClick}
            aria-hidden={currentIndex !== index}
          >
            {/* Background - either trailer, GIF, or poster */}
            <div className="absolute inset-0">
              {currentIndex === index && isTrailerPlaying && movie.trailerUrl ? (
                <div className="w-full h-full">
                  {/* YouTube trailer - Modified with additional parameters */}
                  <div className="w-full h-full" style={isMobile.current ? { overflow: 'hidden', transform: 'translateZ(0)', willChange: 'transform' } : {}}>
                  <Suspense fallback={
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
    </div>
  }>
    <YouTubePlayer 
      url={movie.trailerUrl} 
      isMuted={isMuted}
      isMobile={isMobile.current}
    />
  </Suspense>
    </div>
                  
                  {/* Overlay to hide YouTube elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black to-transparent"></div>
                    <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-l from-black to-transparent"></div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-[vh] py-5"
                style={{ 
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
                  backdropFilter: "blur(4px)"
                }}>
                  {/* Show GIF or image based on state - Modified to use ref */}
                  {currentIndex === index && isGifPlaying && !isTrailerPlaying && movie.gif ? (
   <div className="relative w-full h-[80vh] md:h-[85vh]">
   <video
     ref={videoRef}
     src={movie.gif}
     autoPlay
     loop
    //  poster={isMobile.current ? movie.mobileImage : movie.desktopImage}
     muted={isMuted}
     playsInline
     preload="metadata"
     className="absolute w-full h-full object-cover opacity-100"
   />
   {/* Desktop fade effect */}
   <div 
     className="absolute bottom-0 left-0 right-0 h-15 hidden md:block pointer-events-none" 
     style={{
       background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.5) 50%, transparent 100%)'
     }}
   ></div>
   
   {/* Mobile fade effect with blur */}
   <div 
     className="absolute bottom-0 left-0 right-0 h-16 md:hidden pointer-events-none" 
     style={{
       background: 'linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.6) 50%, transparent 100%)',
       backdropFilter: 'blur(1.5px)',
       WebkitBackdropFilter: 'blur(1.5px)'
     }}
   ></div>
 </div>
) : (
  <img
  src={isMobile.current ? movie.mobileImage : movie.desktopImage}
  srcSet={`${movie.mobileImage} , ${movie.desktopImage} `}
  sizes="(max-width: 768px) 100vw, 100vw"
  alt={movie.title}
  width="1280" 
  height="720"
  className="absolute w-full h-[80vh] md:object-cover opacity-100"
  loading="lazy"
  />
)}
                  
                  {/* Improved gradient overlay for better visibility */}
                
                    {!isGifPlaying&&<>
                      {/* <div className={`absolute inset-0 bg-gradient-to-r ${movie.accentColor || 'from-black/70'} via-black/30 to-transparent`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div> */}
                    </>}
                  
                </div>
              )}
            </div>
            
            {/* Volume control - Now outside the trailer/GIF condition so it can appear for both */}
            {currentIndex === index && (isTrailerPlaying || isGifPlaying) && (
              <>              {/* Volume control */}
<MovieControls 
  isMuted={isMuted}
  toggleMute={toggleMute}
  isTrailerPlaying={isTrailerPlaying}
  isGifPlaying={isGifPlaying}
/></>
            )}
            
            {/* Content Overlay - Improved positioning for mobile */}
            <div className="absolute bottom-16 left-0 right-0 p-4 md:p-8 text-white z-20">
              <div className="max-w-xs sm:max-w-sm md:max-w-2xl">
                {/* Platform badge */}
                <div className="mb-2">
                  <span className={`
                    ${movie.platform === 'Netflix' ? 'bg-red-600' : 
                      movie.platform === 'Amazon Prime' ? 'bg-blue-600' : 'bg-purple-600'}
                    text-xs uppercase tracking-wider py-1 px-2 rounded font-medium`
                  }>
                    {movie.platform}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  {movie.title}
                </h1>

                {/* Movie metadata */}
                <div className="flex items-center text-[10px] md:text-sm mb-1 md:mb-4 flex-wrap">
                  <span className="text-green-400 font-medium mr-1 md:mr-2">
                    {movie.rating.toFixed(1)}
                  </span>
                  <span className="mr-1 md:mr-2">{movie.year}</span>
                  <span className="border border-gray-600 px-1 mr-1 md:mr-2">{movie.maturityRating}</span>
                  <span className="hidden sm:inline mr-2">{movie.duration}</span>
                  <div className="flex flex-wrap">
                    {movie.genre.slice(0, isMobile.current ? 1 : 3).map((genre, idx) => (
                      <span key={idx} className="text-gray-300 text-[10px] md:text-sm">
                        {idx > 0 && <span className="mx-1">•</span>}
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {/* <p className="text-xs md:text-base text-gray-300 mb-2 md:mb-6 max-w-xs sm:max-w-sm md:max-w-lg">
                  <span className="line-clamp-1 md:line-clamp-3">{movie.description}</span>
                </p> */}

                {/* Action buttons */}
                <div className="relative z-20">
                <div className="flex flex-wrap gap-1 md:gap-3">
                <button 
                 onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();  // Prevent event bubbling
                  handleDownload({"title": movie.title, "year": movie.year});
                }}
                className="play-button flex items-center justify-center text-red-500 font-bold py-2 px-5 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg z-40"
                aria-label={`Play ${movie.title}`}
                style={{ position: 'relative', zIndex: 40 }}
              >
                {/* Animated Play Icon */}
                <svg 
                  className="w-5 h-5 mr-2 animate-pulse" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                <span className="tracking-wide">Play Now</span>
              </button>
                  <button 
                    className="flex items-center  hover:bg-gray-700 text-white font-medium py-1 px-3 shadow-md md:py-2 md:px-6 rounded text-xs md:text-base"
                  >
                    <svg className="w-3 h-3 md:w-5 md:h-5 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                    Info
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
      {/* Navigation arrows */}
      {!isMobile&&
      <><button
         onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full z-30"
        aria-label="Previous movie"
      >
        <svg className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full z-30"
        aria-label="Next movie"
      >
        <svg className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      </>}
      
      {/* Progress indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 md:space-x-2 z-30">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-4' : 'bg-gray-500'
            }`}
            aria-label={`Go to movie ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
          />
        ))}
      </div>

      {/* Tap to play indication */}


      {/* Styles for animations */}
      <style jsx>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-10 pointer-events-none">
  {/* Main separator with shadow gradient */}
  <div 
    className="w-full h-16" 
    style={{
      background: 'linear-gradient(to top, rgba(20, 20, 20, 1) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%)',
      transform: 'translateY(1px)'
    }}
  ></div>
  
  {/* Accent line */}
  <div className="w-full h-px bg-gradient-to-r from-transparent via-red-800/40 to-transparent"></div>
  
  {/* Content transition area */}
  <div 
    className="w-full h-8 bg-[#141414]"
    style={{
      boxShadow: '0 -8px 20px rgba(0, 0, 0, 0.7)'
    }}
  ></div>
</div>
{showMoodSelector && <MoodSelector />}
    </div>
  );
}
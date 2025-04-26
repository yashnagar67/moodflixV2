import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';



// Sample movies data (you can replace with your actual data)
const topRatedMovies = [
  {
    id: 1,
    title: "Inception",
    rating: "8.8",
    image: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    platform: "Netflix"
  },
  {
    id: 2,
    title: "Interstellar",
    rating: "8.6",
    image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    platform: "Amazon Prime"
  },
  {
    id: 3,
    title: "The Dark Knight",
    rating: "9.0",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    platform: "HBO Max"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    rating: "8.9",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5sARxYTNVHZcyl1zv5kc.jpg",
    platform: "Hulu"
  },
  {
    id: 5,
    title: "Forrest Gump",
    rating: "8.8",
    image: "https://image.tmdb.org/t/p/w500/arw2vnzRSstQ3a5jzwAwOqxD5Ye.jpg",
    platform: "Disney+"
  }
];

// Simple Toast component
const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/95 text-white shadow-2xl px-6 py-3 rounded-md flex items-center gap-3 animate-slideUp z-50 min-w-72 backdrop-blur-sm border-l-4 border-red-600">
    <div className="flex-shrink-0">
      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" fillRule="evenodd"></path>
      </svg>
    </div>
    <div className="flex-1">
      <p className="font-medium text-sm tracking-wide">{message}</p>
    </div>
  </div>
  );
};

const TopRatedMovieCard = ({ movie }) => {
  console.log("")
const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 3 seconds
    
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

  return ( 
    <>
      {/* Toast notification */}
      <Toast message="Download Started ✅" isVisible={showToast} />
      
      {isLoading ? (
        <div className="relative w-48 md:w-56 h-64 md:h-72 flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-gray-800">
          {/* Simulated poster skeleton */}
          <div className="absolute inset-0">
            <div className="h-full w-full bg-gradient-to-b from-gray-700 to-gray-900 animate-pulse"></div>
          </div>
          
          {/* Spinner with branded colors */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              
              {/* Loading text with shimmer effect */}
              <div className="mt-3 px-3 py-1 rounded-full bg-gray-700/70">
                <div className="h-4 w-20 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full animate-shimmer"></div>
              </div>
            </div>
          </div>
          
          {/* Rating skeleton */}
          <div className="absolute bottom-2 right-2 flex items-center space-x-1">
            <div className="h-4 w-4 rounded-full bg-yellow-500/60 animate-pulse"></div>
            <div className="h-3 w-8 bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="relative  group w-48 md:w-56 flex-shrink-0 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
        onClick={()=>handleDownload({"title":movie.title,"year":movie.year})}>
          {/* Movie Poster */}
          <div className="relative">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-64 md:h-72 object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0  bg-gradient-to-t from-black/70 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:opacity-100 lg:opacity-0">
              {/* Download Button */}
              <button
                onClick={(e)=>{e.stopPropagation();handleDownload({"title":movie.title,"year":movie.year});}}
                
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md transition-colors duration-200"
                aria-label="Download"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
              
              <div className="text-white">
                <h3 className="text-sm font-bold truncate">{movie.title}</h3>
                <div className="flex items-center space-x-1 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  
                  <span className="text-xs">{movie.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TopRatedMovies = (props) => {
  const scrollContainerRef = useRef(null);
  console.log("from moviescard", props.heading);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-950 py-4 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg  md:text-3xl font-bold text-white">
          {props.heading}
        </h2>
        {/* <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', /* Firefox */
        }}
      >
        {props.movies.map((movie) => (
          <div 
            key={movie.id} 
            className="scroll-snap-align-start"
          >
            <TopRatedMovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
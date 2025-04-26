import React, { useState, useRef, useEffect } from 'react';

// Sample movie data
const sampleMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
    backdrop_path: "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden."
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family."
  },
  {
    id: 3,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper."
  },
  {
    id: 4,
    title: "The Dark Knight",
    poster_path: "/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
    backdrop_path: "/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets."
  },
  {
    id: 5,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy."
  },
  {
    id: 6,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible."
  },
  {
    id: 7,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth."
  },
  {
    id: 8,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage."
  },
  {
    id: 9,
    title: "Parasite",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident."
  },
  {
    id: 10,
    title: "Joker",
    poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdrop_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    overview: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure."
  }
];

// Custom icons to replace lucide-react
const Icons = {
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  ThumbsUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
};

// Row component to group movies by category
const MovieRow = ({ title, movies, isLarge = false }) => {
  const rowRef = useRef(null);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = (direction) => {
    setIsScrolling(true);
    const scrollAmount = direction === 'left' ? -window.innerWidth / 2 : window.innerWidth / 2;
    
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
    
    setTimeout(() => setIsScrolling(false), 500);
  };

  const checkForScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftNav(scrollLeft > 0);
      setShowRightNav(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const currentRef = rowRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkForScrollPosition);
      checkForScrollPosition();
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkForScrollPosition);
      }
    };
  }, [movies]);

  return (
    <div className="relative mb-6 group">
      <h2 className="text-lg md:text-xl font-bold text-white px-4 md:px-6 mb-2">{title}</h2>
      
      {/* Left Navigation */}
      {showLeftNav && !isScrolling && (
        <button 
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity h-full"
          onClick={() => handleScroll('left')}
        >
          <Icons.ChevronLeft />
        </button>
      )}
      
      {/* Right Navigation */}
      {showRightNav && !isScrolling && (
        <button 
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity h-full"
          onClick={() => handleScroll('right')}
        >
          <Icons.ChevronRight />
        </button>
      )}
      
      <div 
        ref={rowRef}
        className="flex overflow-x-scroll scrollbar-hide px-4 py-4"
      >
        <div className={`flex gap-2 md:gap-4 ${isLarge ? 'flex-nowrap' : 'flex-nowrap'}`}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isLarge={isLarge} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ movie, isLarge = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, title, poster_path } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  
  // For animation timing
  const hoverTimeoutRef = useRef(null);
  
  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500); // Delay to prevent flicker on quick mouse movements
  };
  
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
    setIsExpanded(false);
  };

  const handleInfoClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    setIsExpanded(true);
  };

  // Generate a random match percentage for Netflix-like "match" feature
  const matchPercentage = Math.floor(Math.random() * 30) + 70; // 70-99%

  return (
    <div 
      className={`relative flex-shrink-0 transition-all duration-300 cursor-pointer rounded-md overflow-hidden shadow-xl
        ${isLarge ? 'w-60 md:w-80' : 'w-32 sm:w-40 md:w-48'}
        ${isHovered ? 'scale-110 z-20' : 'scale-100 z-10'}
        ${isExpanded ? 'md:w-96 z-30' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Card */}
      <div className="relative group w-48 md:w-56 flex-shrink-0 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
          {/* Movie Poster */}
          <div className="relative">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-64 md:h-72 object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:opacity-100 lg:opacity-0">
              {/* Download Button */}
              <button
                onClick={()=>handleDownload(movie.URL)}
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
      
      {/* Only show title below card when not hovered */}
      {!isHovered && !isExpanded && (
        <h3 className="text-white mt-1 px-1 text-xs md:text-sm font-medium truncate">{title}</h3>
      )}
    </div>
  );
};

// Netflix-style hero banner
const Banner = ({ featuredMovie }) => {
  if (!featuredMovie) return null;
  
  return (
    <div className="relative h-96 md:h-screen/2 mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
      <img 
        src={`https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path || featuredMovie.poster_path}`}
        alt={featuredMovie.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/api/placeholder/1280/720";
        }}
      />
      
      <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 w-full md:w-1/2">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{featuredMovie.title}</h1>
        <div className="flex gap-3 mb-4">
          <button className="bg-white hover:bg-opacity-80 text-black font-bold py-2 px-8 rounded flex items-center gap-2 transition-colors">
            <Icons.Play /> Play
          </button>
          <button className="bg-gray-500 bg-opacity-60 hover:bg-opacity-40 text-white font-bold py-2 px-8 rounded flex items-center gap-2 transition-colors">
            <Icons.Info /> More Info
          </button>
        </div>
        <p className="text-white text-sm md:text-base line-clamp-3">
          {featuredMovie.overview || "No description available for this title."}
        </p>
      </div>
    </div>
  );
};

// Top Netflix navigation bar
const NetflixNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 py-2 md:px-12 md:py-4 flex items-center justify-between ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="flex items-center gap-4 md:gap-8">
        <h1 className="text-red-600 font-bold text-2xl md:text-4xl">NETFLIX</h1>
        <div className="hidden md:flex gap-6">
          <a href="#" className="text-white text-sm hover:text-gray-300">Home</a>
          <a href="#" className="text-white text-sm hover:text-gray-300">TV Shows</a>
          <a href="#" className="text-white text-sm hover:text-gray-300">Movies</a>
          <a href="#" className="text-white text-sm hover:text-gray-300">New & Popular</a>
          <a href="#" className="text-white text-sm hover:text-gray-300">My List</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white">
          <Icons.Search />
        </button>
        <div className="w-6 h-6 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">N</div>
      </div>
    </nav>
  );
};

// Main Netflix clone component
const NetflixClone = () => {
  // Use the sample movie data
  const movies = sampleMovies;
  
  // Generate categories (simulating Netflix categories)
  const generateCategories = () => {
    if (!movies || movies.length === 0) return [];
    
    // Pick a featured movie for the banner
    const featuredMovie = movies[Math.floor(Math.random() * movies.length)];
    
    // Create movie categories with shuffled movies
    const categories = [
      { title: "Popular on Netflix", movies: shuffle(movies).slice(0, 10) },
      { title: "Trending Now", movies: shuffle(movies).slice(0, 10) },
      { title: "New Releases", movies: shuffle(movies).slice(0, 8) },
      { title: "Watch Again", movies: shuffle(movies).slice(0, 10) },
      { title: "Only on Netflix", movies: shuffle(movies).slice(0, 10), isLarge: true }
    ];
    
    return { featuredMovie, categories };
  };
  
  // Shuffle function for randomizing movies
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  if (!movies || movies.length === 0) {
    return <div className="text-white text-center py-12">No movies available</div>;
  }
  
  const { featuredMovie, categories } = generateCategories();
  
  return (
    <div className="bg-gray-900 min-h-screen relative">
      <NetflixNavbar />
      <Banner featuredMovie={featuredMovie} />
      
      <div className="mt-4">
        {categories.map((category, index) => (
          <MovieRow 
            key={index}
            title={category.title}
            movies={category.movies}
            isLarge={category.isLarge}
          />
        ))}
      </div>
      
      <div className="h-16"></div> {/* Space at bottom */}
    </div>
  );
};

export default NetflixClone;
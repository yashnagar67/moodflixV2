import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


const API_KEY = "fb2c6e95";

const MoviesFetch = () => {
  const [searchedMovie, setSearchedMovie] = useState('2025');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [searchedMovie]); // Fetch movies when searchedMovie changes

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedMovie}`;
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.Search) {
        // Convert API data format to match movieData structure
        const formattedMovies = data.Search.map((movie, index) => ({
          id: movie.imdbID || (index + 1).toString(),
          title: movie.Title,
          rating: "N/A", // OMDB API doesn't provide ratings in search results
          image: movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/300/450",
          platform: "Unknown",
          year: movie.Year,
          mood: ["Exciting", "Thoughtful"],
          genres: ["Sci-Fi", "Action"],
          description: "No description available.",
        }));

        setMovies(formattedMovies);
        setIsLoading(false);
      } else {
        setMovies([]);
        setIsLoading(false);
        if (data.Error) {
          setError(data.Error);
        }
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      setError("Failed to fetch movies");
      setIsLoading(false);
    }
  };

  // Predefined Moods and Genres
  const MOODS = ["Happy", "Sad", "Exciting", "Thoughtful", "Intense", "Heartwarming", "Quirky"];
  const GENRES = ["Sci-Fi", "Action", "Drama", "Crime", "Romance"];

  const MovieCard = ({ movie }) => {
    return (
      <div key={movie.id} className="movie-card group relative transform transition-all duration-300 hover:scale-105 hover:z-10">
        {/* Movie Poster Container */}
        <div className="relative h-full overflow-hidden rounded-md shadow-lg cursor-pointer bg-black">
          {/* Poster Image */}
          <div className="relative aspect-[2/3]">
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-50"
            />
            
            {/* Netflix-style Gradient Overlay (always visible, intensifies on hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
            
            {/* Age Rating Badge */}
            <div className="absolute top-2 left-2 bg-gray-900/90 text-white text-xs px-2 py-0.5 rounded">
              {movie.rating === "R" ? "18+" : movie.rating === "PG-13" ? "13+" : "ALL"}
            </div>
          </div>
          
          {/* Content info (always visible) */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-6">
              {/* Title */}
              <h3 className="font-bold truncate text-sm md:text-base">{movie.title}</h3>
              
              {/* Year and Match % (Netflix style) */}
              <div className="flex items-center gap-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-green-500 font-bold">98% Match</span>
                <span className="text-xs text-gray-400">{movie.year}</span>
                <span className="text-xs px-1 border border-gray-500 rounded text-gray-400">HD</span>
              </div>
              
              {/* Genres - Netflix style (only visible on hover) */}
              <div className="flex flex-wrap gap-1 pt-1 pb-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {(movie.genres || []).slice(0, 3).map((genre, index) => (
                  <React.Fragment key={genre}>
                    <span>{genre}</span>
                    {index < Math.min((movie.genres || []).length, 3) - 1 && <span>•</span>}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Controls - Netflix style */}
              <div className="flex items-center gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* Play Button */}
                <a 
                  href="https://oneclick-dl.pages.dev/?url=https://video-downloads.googleusercontent.com/ADGPM2mw_qvOHxC1hcB7HoYRydwjpTsEayOHBV50FSHb-hKcj9j_pPCiL34ZYcX8W8-T8gdf2i8UK7s_uABk3HKH6lEko_W7LKIhK4M86W5C5p15pajnJYaZZEoJnZjSaA36z5wRpw_fXdZpqn7U0Y5x7m8Gj-IVu8jfD46gvUtkezzdG5CRAtcbrJn2zNR1Vo8ORD6pPhp6MFF3ayH6mnKfxfhrGiVuphnXHQkOwcEMlZVv2C07z3A_52yBzfpOVwZK89Z4ORZhM4WxNhAmudzpibu4EbYWNWfnq36GjNHz6TRMfZrj41a5F3Djfigs4mNm4z4IaNU--a-gz68gf4fAwLwgqul_dDoqHaLm77p7wlHC1lWq6t-Moi6KLAoUKl4CvyEqiYnbXCRNtopJcr6niX0eE1Y9cT-iQVGberPhQRBqAXiOMxIWh9q9KANKs_VvSYp7mpvQPBkK2Hd40-0QlkyaYT-UnQn83W8LD-ZLA5VzUVgPqYBI0Q7pKs3pyqJEWmPkG10MAt_6zqQshSzjrOoUE4If0VNgP3u4Lx0SUIfwKYxOSiTvvDKLfu3_84ioFjV6YB87vkQgXS0izDzgpT4L4YnBvjCNIJgMaafpmjY4ddZMQuGHA6L-FRDX1vguHkRSX8xZAFZjV1mu6LhHR1Tu-aqxVJYmfaL3J3QI1Ag1vl5pVH6ht33Z_WRDBYfNU5EXs8q7Tzp4Vk6MmrJ26A78YCGCJVoSys3jQZhXA9SQvdKpALbtR7BvfgLXs0zKUjCjKYt3h3k5Z5AUI1ytuR_s91aA5J6zTD2dKkX3N54gkcgjyWEGFmFbszZWbqkYRpj3rRl3OlpPYg0wmPkxHqHErsgkZ-wfbkUMUwiMD5G8xCfRxwBKGCjdM1x89BhHlgQ4JQvNK5IUypw0CfQS3vQvyH7pXUsiHn1LGKBt5NeYdsZWmfMPRN_zfBuZ-P-g-T8-r-iFlCKry7zPFPZNOsni0ZJixKGTu-CkecOEZtDGONtfr0VWD7rTWbxNSBkZn0JzgE-CM-0xByHUU3FgJyBycEQJxIQbfqD3q70Rcorna8gIHwDNSsyTFvKDtK6Q2NQNUAUR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block flex-1"
                >
                  <button className="w-full bg-white text-black py-1.5 rounded-md hover:bg-white/90 transition flex items-center justify-center gap-1.5 font-medium text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <span>Play</span>
                  </button>
                </a>
                
                {/* Add to My List - Circle Button */}
                <button className="p-1.5 bg-gray-800/80 hover:bg-gray-700/80 rounded-full border border-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                
                {/* Like - Circle Button */}
                <button className="p-1.5 bg-gray-800/80 hover:bg-gray-700/80 rounded-full border border-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MovieRecommendationUI = () => {
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('movies');

    // Filtering logic for client-side filtering
    const filteredMovies = React.useMemo(() => {
      return movies.filter((movie) => {
        const matchesMood = selectedMoods.length === 0 || 
          selectedMoods.some(mood => movie.mood.includes(mood));
        
        const matchesGenre = selectedGenres.length === 0 || 
          selectedGenres.some(genre => movie.genres.includes(genre));
        
        // For local filtering without API call
        const matchesLocalSearch = searchTerm === '' || 
          movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesMood && matchesGenre && matchesLocalSearch;
      });
    }, [movies, selectedMoods, selectedGenres, searchTerm]);

    // Toggle mood filter
    const toggleMoodFilter = (mood) => {
      setSelectedMoods(prev => 
        prev.includes(mood) 
          ? prev.filter(m => m !== mood)
          : [...prev, mood]
      );
    };

    // Toggle genre filter
    const toggleGenreFilter = (genre) => {
      setSelectedGenres(prev => 
        prev.includes(genre) 
          ? prev.filter(g => g !== genre)
          : [...prev, genre]
      );
    };

    // Handle search form submission
    const handleSubmitSearch = (e) => {
      e.preventDefault();
      setSearchedMovie(searchTerm); // This triggers the API call via useEffect
    };

    // Loading and Error States
    if (isLoading) {
      return (
        <div className="bg-gray-950 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"></div>
            <h1 className="text-white text-2xl">Loading Movies...</h1>
          </div>
        </div>
      );
    }

    if (error && movies.length === 0) {
      return (
        <div className="bg-gray-950 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-red-500 text-4xl mb-4">Oops!</h1>
            <p className="text-white text-xl">{error}</p>
            <button 
              onClick={() => {
                setSearchedMovie('2025');
                setSearchTerm('');
              }}
              className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-950 min-h-screen py-12 px-4 md:px-8 lg:px-16">
        {/* Navigation and Search Container */}
          
        <div className="max-w-6xl mx-auto mb-8">
       
          <div className=""> <NavLink to="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#cf1028" fill="none">
    <path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        
</svg> </NavLink></div>
          {/* Search Input */}
          <form onSubmit={handleSubmitSearch}>
            <div className="relative mb-6">
              <input 
                type="text"
                placeholder="Search movies..."
                value={searchTerm}  
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 pl-12"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* Section Navigation */}
          <div className="flex justify-center space-x-6 mb-6">
            {['movies', 'moods', 'genres'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`
                  capitalize text-lg font-semibold px-4 py-2 rounded-full transition 
                  ${activeSection === section 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'}
                `}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Filters */}
          {activeSection === 'moods' && (
            <div className="mb-4">
              <h3 className="text-white text-lg font-semibold mb-3">Select Mood</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => toggleMoodFilter(mood)}
                    className={`
                      px-4 py-2 rounded-full text-sm transition 
                      ${selectedMoods.includes(mood)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                    `}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'genres' && (
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Select Genre</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenreFilter(genre)}
                    className={`
                      px-4 py-2 rounded-full text-sm transition 
                      ${selectedGenres.includes(genre)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                    `}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search term display */}
        {searchedMovie !== '2025' && (
          <div className="max-w-7xl mx-auto mb-6">
            <h2 className="text-white text-2xl font-bold">
              Search results for: <span className="text-red-500">{searchedMovie}</span>
            </h2>
          </div>
        )}

        {/* Movies Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredMovies.length === 0 ? (
            <div className="text-center text-white py-16">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mx-auto text-gray-600 mb-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h2 className="text-3xl font-bold mb-4">Searching</h2>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSelectedMoods([]);
                  setSelectedGenres([]);
                  setSearchTerm('');
                  setSearchedMovie('2025');
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredMovies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="animate-fade-in"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return <MovieRecommendationUI />;
};

export default MoviesFetch;
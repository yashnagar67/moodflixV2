import { useEffect } from "react";

const API_KEY = "fb2c6e95";

// Centralized fetch function with error handling
async function fetchFromAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { movies: [] }; // Return empty movies array as fallback
  }
}

// Reusable function to fetch movie poster
async function fetchMoviePoster(title) {
  try {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    const data = await fetchFromAPI(url);
    return data.Poster !== "N/A" ? data.Poster : null;
  } catch (error) {
    console.error("Error fetching movie poster:", error);
    return null;
  }
}

// Reusable function to format movies data
async function formatMoviesData(movies) {
  return Promise.all(
    movies.map(async (movie) => {
      const imgUrl = await fetchMoviePoster(movie.title);
      
      return {
        id: movie._id,
        title: movie.title,
        rating: movie.rating || "N/A",
        year:new Date(movie.releaseDate).getFullYear(),
        image: movie.posterUrl.includes("example.com") ? imgUrl : (movie.posterUrl || imgUrl),

        URL: movie.downloadLink || "N/A",
      };
    })
  );
}

// Main component
const MoviesFetch = ({ setMovies, setTopRated, settrendings, setbollywood }) => {
  useEffect(() => {
    let isMounted = true;
    
    // Using a single async function to manage all fetches
    const fetchAllMovieData = async () => {
      const BASE_URL = "https://moodflixbackend-1.onrender.com/api";
      
      // Define all data fetching operations
      const fetchOperations = [
        { endpoint: "/toprated", setter: setTopRated },
        { endpoint: "/trendings", setter: settrendings },
        { endpoint: "/bollywood", setter: setbollywood }
      ];
      
      // Execute all fetch operations in parallel
      await Promise.all(
        fetchOperations.map(async ({ endpoint, setter }) => {
          const data = await fetchFromAPI(`${BASE_URL}${endpoint}`);
          if (data && data.movies && isMounted) {
            const formattedMovies = await formatMoviesData(data.movies);
            setter(formattedMovies);
          }
        })
      );
    };
    
    fetchAllMovieData();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array since we're using stable setter functions
};

export default MoviesFetch;
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
        image: movie.posterUrl.includes("example.com")||movie.posterUrl.includes(" ") ? imgUrl : (movie.posterUrl || imgUrl),

        URL: movie.downloadLink || "N/A",
      };
    })

  );
}

// Main component
const MoviesFetch = ({ setMovies, settrendings, settoprated, setbollywood }) => {
  useEffect(() => {
    // Using a single async function to manage all fetches
    const fetchAllMovieData = async () => {
      const BASE_URL = "https://moodflixbackend-1.onrender.com/api";
      
      // Define all data fetching operations
      const fetchOperations = [
        { endpoint: "/trendings", setter: settrendings },
        { endpoint: "/toprated", setter: settoprated },
        { endpoint: "/bollywood", setter: setbollywood }
      ];
      
      // Execute all fetch operations in parallel
      await Promise.all(
        fetchOperations.map(async ({ endpoint, setter }) => {
          const data = await fetchFromAPI(`${BASE_URL}${endpoint}`);
          if (data && data.movies) {
            const formattedMovies = await formatMoviesData(data.movies);
            setter(formattedMovies);
          }
        })
      );
    };
    
    fetchAllMovieData();
  }, []);

  
};

export default MoviesFetch;
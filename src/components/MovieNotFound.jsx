import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MovieNotFoundPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastType, setToastType] = useState("success"); // success or error
  const [popularMovies, setPopularMovies] = useState([]);
  const [animateRequest, setAnimateRequest] = useState(false);
  const navigate = useNavigate();

  async function requestMovie() {
    setAnimateRequest(true);
    console.log("Requesting movie:");
    try {
      const response = await fetch('https://movieadminpanel.onrender.com/api/request/request-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: shortenTitle(id) })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        showToast(`Successfully requested: ${data.data.title}`, "success");
      } else {
        showToast(data.message || 'Failed to request movie', "error");
      }
  
    } catch (error) {
      console.error('Error requesting movie:', error);
      showToast('Failed to request movie. Please try again later.', "error");
    } finally {
      setAnimateRequest(false);
    }
  }

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
      setIsToastVisible(false);
    }, 4000);
  };
  
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch('https://movieadminpanel.onrender.com/api/popular-movies/');
        if (!res.ok) throw new Error('Failed to fetch popular movies');
        
        const data = await res.json();
        setPopularMovies(data);
      } catch (err) {
        console.error('Error:', err);
        // Fallback data
        setPopularMovies([]);
      } finally {
        // Simulate loading for better UX
        setTimeout(() => setLoading(false), 800); 
      }
    };

    fetchPopularMovies();
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  const shortenTitle = (title) => {
    const match = title.match(/^(.+?)\s*\((\d{4})\)/);
    if (match) {
      const name = match[1].trim().replace(/\s+/g, "-").replace(/-+/g, '-');
      const year = match[2];
      return `${name}-${year}`;
    } else {
      return title.trim().replace(/\s+/g, "-");
    }
  };

  const handleMovieSelect = (movieData) => {
    const title = movieData?.title || "";
    const year = movieData?.year || "";
  
    console.log("Navigating to:", title);
    navigate(`/go/${title}-${year}`);
  };

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black min-h-screen">
      <div className="w-16 h-16 relative">
        <div className="animate-ping absolute inset-0 rounded-full bg-red-600 opacity-75"></div>
        <div className="relative rounded-full bg-red-600 w-16 h-16 flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      {/* Netflix-style toaster notification */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${isToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className={`px-6 py-4 rounded-md shadow-xl backdrop-blur-md flex items-center space-x-3 ${toastType === "success" ? 'bg-black/80 border border-green-500/30' : 'bg-black/80 border border-red-500/30'}`} style={{minWidth: "300px"}}>
          {toastType === "success" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span className="text-white text-sm font-medium">{toastMessage}</span>
        </div>
      </div>

      {/* Header with back button */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/90 to-transparent z-40 py-4 px-6">
        <div className="flex items-center">
          <button 
            onClick={handleGoBack}
            className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-medium">Not Found</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center">
          {/* Animated illustration */}
          <div className="mb-8 relative">
          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">Movie Not Found</h1>
        <p className="text-gray-300 text-center max-w-lg mb-8">
        We couldn't find <span className="font-semibold text-white">{id?.replace(/-/g, " ")}</span> in our library. It might have been recently removed or not yet available in our collection.
        
        </p>

        {/* Request form */}
       

          {/* Request form */}
          <div className="w-full max-w-md mb-16 bg-gray-900/70 p-6 rounded-lg backdrop-blur-md border border-gray-800 shadow-xl transform transition-all duration-300 hover:shadow-red-900/10">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Request This Movie
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              We'll notify you when this title becomes available in our library.
            </p>
            <button 
              onClick={requestMovie}
              disabled={animateRequest}
              className={`w-full bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all px-4 py-3 rounded-md font-medium flex items-center justify-center ${animateRequest ? 'animate-pulse' : ''}`}
            >
              {animateRequest ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Request
                </span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  Request This Title
                </>
              )}
            </button>
          </div>

          {/* Popular Movies Section - Enhanced Netflix style */}
          <div className="w-full py-6">
            <h3 className="text-lg font-medium mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Popular Recommendations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {popularMovies.length > 0 ? popularMovies.map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => handleMovieSelect(movie)}
                  className="relative group rounded-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl"
                >
                  <div className="aspect-[2/3] bg-gray-800 animate-pulse">
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
              )) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400">No recommendations available at the moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
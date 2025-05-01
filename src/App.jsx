import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TrendingSlider from './components/TrandingSlider';
import MovieCard from './components/MovieCards';
import MovieDetail from './components/MovieDetailspage';
import Recommended from './pages/Recommended';
import Navbar from './components/Navbar';
import { useState, useMemo } from 'react';
import MoviesFetch from './MoviesFetch';
import JumpPage from './pages/Jumppage';
import Watching from './components/Watching';
import sampleMovies from './components/sampleMovies';
import BulkMovies from './components/BulkMovies';
import Topbanne from './TopbannerFetch';
import MoodPopup from './components/MoodPopUp';
import Download from './components/Download';
import TokenRedirect from './pages/TokenRedirect';
import AccessDenied from './pages/AccessDenied';
import ProtectedRoute from './components/protectedRoute';
import MovieNotFound from './components/MovieNotFound';

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [topglobal, settopglobal] = useState([])
  const [topindia, settopindia] = useState([])
  const [movieData, setmovieData] = useState([]);
  const [toprated, settoprated] = useState([]);
  const [trendings, settrendings] = useState([]);
  const [bollywood, setbollywood] = useState([]);
 

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    console.log("User selected mood:", mood);
    // Aage mood ke hisab se design/content update logic yahan aayega
  };

  // Dashboard content component - memoized to prevent unnecessary re-renders
  // const Dashboard = useMemo(() => () => (

  // ), [trendings, toprated, bollywood]); // Only re-create when these props change

  return (
    <Router>
      <>
        <Routes>
          {/* Public routes - no authentication needed */}
          <Route path="/token-redirect" element={<TokenRedirect />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          
          {/* Protected routes - require authentication */}
          <Route path="/" element={
            <ProtectedRoute>
                  <>
              
      <TrendingSlider />
      <MoviesFetch
        movie={setmovieData}
        settopglobal={settopglobal}
        settopindia={settopindia}
        
      />
      <MovieCard heading="🔥 Streaming Hot Across the Globe 🌎✨!" movies={topglobal} />
      <MovieCard heading="💥 Sab Dekh Rahe Hain, Tumne Kya Dekha? 🇮🇳🎬" movies={topindia} />
      {/* <MovieCard heading="BollyWood" movies={bollywood} /> */}
    </>
            </ProtectedRoute>
          } />
          
          <Route path="/recommended" element={
            <ProtectedRoute>
              <Recommended />
            </ProtectedRoute>
          } />
          <Route path="/not-found/:id" element={
            <ProtectedRoute>
              <MovieNotFound />
             </ProtectedRoute>
          } />
          
          <Route path="/go/:id" element={
            // <ProtectedRoute>
              <MovieDetail />
            // </ProtectedRoute>
          } />
          
          <Route path="/download/:title/:quality" element={
            <ProtectedRoute>
              <Download />
             </ProtectedRoute>
          } />
          
          <Route path="/categories" element={
            <ProtectedRoute>
              <Watching />
            </ProtectedRoute>
          } />
          
          {/* Catch all undefined routes */}
          <Route path="*" element={<Navigate to="/access-denied" replace />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
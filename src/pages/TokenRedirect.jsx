import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Move token verification outside component to prevent recreation
const verifyToken = (token, navigate) => {
  try {
    const decoded = JSON.parse(atob(token));
    const now = Math.floor(Date.now() / 1000);
    
    if (decoded.exp < now) {
      alert('Session expired! Please try again.');
      localStorage.removeItem('auth_token');
      navigate('/access-denied');
      return false;
    }
    
    if (decoded.access !== "v2_access") {
      alert('Unauthorized Access! Invalid permission.');
      localStorage.removeItem('auth_token');
      navigate('/access-denied');
      return false;
    }
    
    localStorage.setItem('auth_token', token);
    return true;
  } catch (error) {
    alert('Invalid Token!');
    localStorage.removeItem('auth_token');
    window.location.href = `https://www.moodflix.free.nf/?i=1`;
    return false;
  }
};

const TokenRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  useEffect(() => {
    let timeoutId;
    let mounted = true;

    const validateAndStoreToken = () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('auth');
        
        if (!token) {
          const storedToken = localStorage.getItem('auth_token');
          if (!storedToken) {
            navigateRef.current('/access-denied');
            return;
          }
          if (verifyToken(storedToken, navigateRef.current)) {
            timeoutId = setTimeout(() => navigateRef.current('/'), 1000);
          }
        } else if (verifyToken(token, navigateRef.current)) {
          timeoutId = setTimeout(() => navigateRef.current('/'), 1000);
        }
      } catch (error) {
        localStorage.removeItem('auth_token');
        navigateRef.current('/access-denied');
      } finally {
        if (mounted) {
          timeoutId = setTimeout(() => setIsLoading(false), 1500);
        }
      }
    };

    validateAndStoreToken();

    return () => {
      mounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [location.search]); // Only depend on location.search

  return (
    <div className="relative flex justify-center items-center h-screen text-xl">
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
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        Validating your access...
      </div>
    </div>
  );
};

export default TokenRedirect;
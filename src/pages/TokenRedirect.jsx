import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenRedirect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAndStoreToken = () => {
      try {
        // Get token from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('auth');
        console.log('Token from URL:', token);
        
        if (!token) {
          console.log('No token in URL, checking localStorage');
          // If no token in URL, check if we have one in localStorage
          const storedToken = localStorage.getItem('auth_token');
          if (!storedToken) {
            console.log('No token found anywhere, redirecting to access denied');
            navigate('/access-denied');
            return;
          }
          // If we have a stored token, verify it separately
          return verifyToken(storedToken);
        }
        
        // If new token in URL, verify and store it
        verifyToken(token);
      } catch (error) {
        console.error('Token validation error:', error);
        localStorage.removeItem('auth_token'); // Clear any invalid token
        navigate('/access-denied');
      } finally {
        // Keep loading state true for a moment to show the loader
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    const verifyToken = (token) => {
      try {
        // Decode the token
        const decoded = JSON.parse(atob(token));
        console.log('Decoded token:', decoded);
        
        const now = Math.floor(Date.now() / 1000);
        
        if (decoded.exp < now) {
          console.log('Token expired');
          alert('Session expired! Please try again.');
          localStorage.removeItem('auth_token');
          navigate('/access-denied');
        } else if (decoded.access !== "v2_access") {
          console.log('Invalid access type:', decoded.access);
          alert('Unauthorized Access! Invalid permission.');
          localStorage.removeItem('auth_token');
          navigate('/access-denied');
        } else {
          console.log('Token valid, storing and navigating to dashboard');
          // Store valid token
          localStorage.setItem('auth_token', token);
          
          // Navigate to dashboard after short delay
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (error) {
        console.error('Token verification error:', error);
        alert('Invalid Token!');
        localStorage.removeItem('auth_token');
        navigate('/access-denied');
      }
    };

    validateAndStoreToken();
  }, [navigate]);

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
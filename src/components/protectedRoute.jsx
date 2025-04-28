import { Navigate, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(() => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return false;
      
      const decoded = JSON.parse(atob(token));
      const now = Math.floor(Date.now() / 1000);
      
      return !(decoded.exp < now || decoded.access !== "v2_access");
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuth(authStatus);
    setIsLoading(false);
  }, [checkAuth]);

  return { isAuth, isLoading };
};

const ProtectedRoute = ({ children }) => {
  const   naviagte=useNavigate()

  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuth) {
    return window.location.href = `https://www.moodflix.free.nf/?i=1`;
  }

  
  return children;
};

export default ProtectedRoute;
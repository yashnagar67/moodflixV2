import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Simple function to check auth without React state
  const isAuthenticated = () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return false;
      
      const decoded = JSON.parse(atob(token));
      const now = Math.floor(Date.now() / 1000);
      
      // Check if token is still valid and has proper access
      return !(decoded.exp < now || decoded.access !== "v2_access");
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  };

  // No loading state, just check and redirect if needed
  if (!isAuthenticated()) {
    return <Navigate to="/access-denied" replace />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;
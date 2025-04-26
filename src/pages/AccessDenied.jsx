// src/pages/AccessDenied.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Reduce countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Email validation
  const validateEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail) return;
    
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message or redirect
      navigate('/token-redirect');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Netflix-style header */}
      <header className="py-6 px-12 flex justify-between items-center">
        <div className="text-red-600 font-bold text-4xl">M</div>
        <button 
          onClick={() => navigate('/token-redirect')}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
        >
          Sign In
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col justify-center items-center px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Access Denied</h1>
          
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-red-600 opacity-75 animate-ping"></div>
              <div className="relative rounded-full bg-red-600 w-20 h-20 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
            </div>
            
            <p className="text-xl mb-6">
              Looks like you're trying to access premium content without proper authorization.
            </p>
            
            <p className="text-gray-400 mb-8">
              Please sign in with your account or request access using the form below.
            </p>
          </div>

          {/* Access request form */}
          <div className="bg-gray-900 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Request Access</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="w-full max-w-md mb-4 relative">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full bg-gray-800 text-white p-4 rounded border border-gray-700 focus:outline-none focus:border-red-600 transition"
                />
                {email && !isValidEmail && (
                  <p className="text-red-500 text-left mt-1">Please enter a valid email</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={!isValidEmail || isSubmitting}
                className={`w-full max-w-md py-3 rounded font-medium transition ${
                  isValidEmail && !isSubmitting
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Request Access'
                )}
              </button>
            </form>
            
            <p className="text-gray-400 mt-4 text-sm">
              Your request will be processed within 24 hours.
            </p>
          </div>

          {/* Help section */}
          <div className="mb-8">
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className="text-gray-400 underline hover:text-white transition flex items-center mx-auto"
            >
              {showHelp ? 'Hide help' : 'Need help?'}
              <svg 
                className={`ml-2 w-4 h-4 transition-transform ${showHelp ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {showHelp && (
              <div className="mt-4 text-gray-300 text-left">
                <p className="mb-2"><strong>Common issues:</strong></p>
                <ul className="list-disc list-inside text-gray-400">
                  <li className="mb-1">Your session may have expired</li>
                  <li className="mb-1">You might be using an outdated link</li>
                  <li className="mb-1">You need to complete the sign-up process</li>
                  <li className="mb-1">Your browser cookies may be disabled</li>
                </ul>
              </div>
            )}
          </div>

          {/* Auto-redirect notice */}
          <div className="text-gray-500 text-sm">
            {countdown > 0 ? (
              <p>Redirecting to sign-in page in {countdown} seconds...</p>
            ) : (
              <p>Redirecting now...</p>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-12 text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto">
          <p>© 2025 MoodFlix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AccessDenied;
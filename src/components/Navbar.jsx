import React, { useState } from 'react'

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold tracking-wider">
            MoodFlix 🍿
          </div>

          {/* Centered Navigation */}
         

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center ml-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
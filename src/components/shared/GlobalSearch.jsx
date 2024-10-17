import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function GlobalSearchResult() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    // const currentPath = location.pathname + location.search;
    const newSearchPath = `/search/result?search=${encodeURIComponent(query)}`;

    navigate(newSearchPath);
    setIsExpanded(false);
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const suggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];
  const results = ['Result 1', 'Result 2', 'Result 3'];

  return (
    <div className="relative flex justify-center"
    >
      <div className="relative w-1/2 flex justify-center" ref={containerRef}>
        <div
          className={`relative transition-all duration-300 ease-in-out ${isExpanded ? 'h-10 w-full rounded-md' : 'h-8 w-96 rounded-full'}`}
        >
          <input
            type="text"
            className={`transition-all w-full duration-300 ease-in-out ${isExpanded ? 'h-10 px-4 rounded-md' : 'h-8 px-2 rounded-full'} border `}
            placeholder="Search..."
            onFocus={() => setIsExpanded(true)}
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-neutral-600 hover:text-neutral-800 ${!isExpanded ? 'pointer-events-none opacity-50' : ''}`}
            aria-label="Search"
          >
            <FaSearch className='p-1.5 text-neutral-500 hover:text-neutral-700' />
          </button>
        </div>
        {isExpanded && (
          <div className="absolute top-12 w-full bg-white border rounded-md shadow-lg z-40 p-4 flex">
            <div className="w-1/2 border-r pr-2">
              {suggestions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Suggestions</h4>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-1 hover:bg-gray-100 cursor-pointer"
                        onMouseEnter={() => setHoveredItem(suggestion)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {results.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Results</h4>
                  <ul>
                    {results.map((result, index) => (
                      <li
                        key={index}
                        className="p-1 hover:bg-gray-100 cursor-pointer"
                        onMouseEnter={() => setHoveredItem(result)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-1/2 pl-2">
              {hoveredItem && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Sample Content</h4>
                  <p>{hoveredItem} content goes here...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

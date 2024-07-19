import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const GlobalSearch = ({ width, isVisible }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [show, setShow] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input element

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300); // Match this duration with the transition duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus(); // Focus the input when the modal becomes visible
    }
  }, [isVisible]);

  const recentlySearched = [
    'Dummy 4 contacts',
    'contacts with lead source advertisement',
    'my contacts',
  ];
  const suggestions = [
    'test new contact last',
    'Dummy 4',
    'Home Page Service Dashboard',
    'test new account',
    'test 3 aaaa',
  ];
  const details = {
    'test new contact last': 'Contact',
    'Dummy 4': 'Account • 08927892',
    'Home Page Service Dashboard': 'Dashboard',
    'test new account': 'Account • 08362744',
    'test 3 aaaa': 'Account • 08362744',
  };

  return (
    <div
      className={`absolute top-0 left-1/2 transform -translate-x-1/2 p-6 bg-white border rounded-lg shadow-2xl z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ width: width * 2, display: show ? 'block' : 'none' }}
    >
      <div className="flex items-center mb-4">
        <select className="border p-2 rounded-l-lg text-gray-700">
          <option>All</option>
          <option>Contacts</option>
          <option>Accounts</option>
          <option>Opportunities</option>
        </select>
        <input
          type="text"
          className="border p-2 flex-grow rounded-none text-gray-700"
          placeholder="Search..."
          ref={inputRef} // Attach the ref to the input element
        />
        <div className="bg-blue-500 text-white p-2 rounded-r-lg flex items-center justify-center">
          <FaSearch />
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 border-r p-4">
          <h2 className="font-bold mb-2 text-gray-700">Recently Searched</h2>
          <ul>
            {recentlySearched.map((item, index) => (
              <li
                key={index}
                className="py-1 cursor-pointer hover:bg-gray-100 text-gray-600"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
              </li>
            ))}
          </ul>
          <h2 className="font-bold mt-4 mb-2 text-gray-700">Suggestions</h2>
          <ul>
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="py-1 cursor-pointer hover:bg-gray-100 text-gray-600"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 p-4">
          {hoveredItem ? (
            <div>
              <h3 className="font-bold text-gray-700">{hoveredItem}</h3>
              <p className="text-gray-600">{details[hoveredItem]}</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-gray-700">Do more with Search!</h3>
              <p className="text-gray-600">Get the right answers by searching...</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>"[user name] contacts"</li>
                <li>"[account name] leads"</li>
              </ul>
              <p className="text-gray-600">Get insights</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>"open cases this week"</li>
                <li>"leads last week"</li>
              </ul>
              {/* <a href="#" className="text-blue-500">Learn More</a> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;

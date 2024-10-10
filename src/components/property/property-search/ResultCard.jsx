import React, { useEffect, useState } from 'react';

// Card component
const PropertyCard = ({ property }) => {

    return (
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden mb-6">
            {/* Image Section */}
            <img
                className="w-48 h-48 object-cover"
                src={"https://demo-source.imgix.net/house.jpg?fit=crop&w=207.328&h=166&dpr=2&q=50&auto=format%2Ccompress&cacheID=3432356195"} // Uncomment when you have the image URL
                // alt={property.buildingName}
            />

            {/* Content Section */}
            <div className="p-4 flex-grow">
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800">{property.buildingName}</h2>
                <p className="text-gray-500">{property.streetNumber} {property.streetName}, {property.postalCode}</p>

                {/* Details */}
                <div className="flex space-x-2 mt-2">
                    {/* Display the number of spaces available */}
                    <p className="text-gray-700">{property.floorInformation.length} spaces available</p>
                </div>
                <p className="text-gray-500 mt-1">Type: {property.propertyType.join(', ')}</p>

                {/* Region */}
                <p className="text-gray-500 mt-2">Region: {property.region}</p>

                {/* Tags */}
                <div className="flex space-x-2 mt-4">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">{property.micromarket}</span>
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">{property.district}</span>
                </div>
            </div>
        </div>
    );
};

// Main component that renders the list of property cards
const ResultCard = ({ resultSet }) => { // Destructure resultSet from props
    const [sectionHeight, setSectionHeight] = useState(0);

      useEffect(() => {
          const handleResize = () => {
              const screenHeight = window.innerHeight;
              const newHeight = screenHeight - 400;
              setSectionHeight(newHeight);
          };
  
          handleResize();
  
          // Add event listener to handle window resize
          window.addEventListener('resize', handleResize);
  
          // Clean up event listener on component unmount
          return () => {
              window.removeEventListener('resize', handleResize);
          };
      }, []);
      
    return (
        <div style={{ height: `${sectionHeight}px` }} className="p-4 h-96">
            {resultSet.propertyInformation && resultSet.propertyInformation.map((property, index) => (
                <PropertyCard key={index} property={property} />
            ))}
        </div>
    );
};

export default ResultCard;

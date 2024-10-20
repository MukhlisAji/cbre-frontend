import { useState } from 'react';
import { CONFIG } from '../../config';
import axios from 'axios';

export default function PropertyResource() {
  const [districts, setDistricts] = useState([]);
  const [mrtStations, setMrtStations] = useState([]);
  const [propertyResources, setPropertyResources] = useState(null); // New state for the resultSet from the API
  const [properties, setProperties] = useState([]);  // State to store the properties

  const transactionId = '4646765766'; // Transaction ID for the requests

  // Array of 10 predefined random colors
  const randomColors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-gray-500',
    'bg-indigo-500'
  ];

  const getColorForLine = (() => {
    let colorIndex = 0;

    return () => {
      // Assign the next color from the array, cycling through if needed
      const assignedColor = randomColors[colorIndex % randomColors.length];

      // Increment the color index for the next item
      colorIndex++;

      return assignedColor;
    };
  })();

  // Define the function to fetch districts
  const fetchDistricts = async () => {
    try {
      const response = await fetch(`${CONFIG.PROPERTY_SERVICE}/getDistricts`, {
        method: 'GET',
        headers: {
          'transactionId': transactionId,
        },
      });

      const data = await response.json();
      if (data.statusCode === '00') {
        const districtsWithIds = data.resultSet.districts.map((district, index) => ({
          id: `D${index + 1}`,
          name: district,
          checked: false,
        }));
        setDistricts(districtsWithIds);
      } else {
        console.error('Failed to fetch districts:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Define the function to fetch MRT stations
  const fetchMRTStations = async () => {
    try {
      const response = await fetch(`${CONFIG.PROPERTY_SERVICE}/getmrts`, {
        method: 'GET',
        headers: {
          'transactionId': transactionId,
        },
      });

      const data = await response.json();
      if (data.statusCode === '00') {
        // Categorize stations by lineName
        const categorizedStations = data.resultSet.mrtInformation.reduce((acc, station) => {
          const { lineName, stationName } = station;
          const color = getColorForLine(lineName);

          if (!acc[lineName]) {
            acc[lineName] = { lineName, color, stations: [] };
          }

          acc[lineName].stations.push({
            label: stationName,
            value: stationName,
          });

          return acc;
        }, {});

        setMrtStations(categorizedStations); // Set categorized stations
        console.log('Categorized Stations: ', categorizedStations);
      } else {
        console.error('Failed to fetch MRT stations:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching MRT stations:', error);
    }
  };

  // country,suburb,grade,propertyUsage,zoning,propertyStatus,otherLots,propertyAwards,projectTypes,floorSystem,unitComparison,currentUnit,phase,acSystem,acStandardCharge,acChargeUnit,generalAvailability,landOwnership,buildingOwnership,region,micromarketIndustrial,micromarketRetail,industryType
  // Define the new function to fetch property resources
  const fetchPropertyResources = async () => {
    try {
      const response = await fetch(
        `${CONFIG.PROPERTY_SERVICE}/resources?includes=propertyContactKind`,
        {
          method: 'GET',
          headers: {
            'transactionId': transactionId,
          },
        }
      );

      const data = await response.json();
      if (data.statusCode === '00') {
        setPropertyResources(data.resultSet); // Store the resultSet data in the state
        console.log('Property Resources:', data.resultSet); // For debugging
      } else {
        console.error('Failed to fetch property resources:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching property resources:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://a2edf140b5af.ngrok.app/cbre/properties?pageNo=2&pageSize=10', {
        method: 'GET',
        headers: {
          'transactionId': transactionId,
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data.statusCode === '00') {
        setProperties(data.resultSet.propertyInformation);
        console.log('List Property:', data.resultSet.propertyInformation);
      } else {
        console.error('Failed to fetch list properties:', data.statusMessage);
      }
    } catch (error) {
      console.error('Error fetching List property :', error);
    }
  };

  const useFetchOptions = async (endpoint) => {
    try {
      const response = await axios.get(`${CONFIG.PROPERTY_SERVICE}/search/${endpoint}`, {
        headers: {
          'transactionId': transactionId,
        },
      });
      if (response.data.statusCode === '00') {
        return response.data.resultSet.resources; // Return fetched options
      } else {
        console.error(`Failed to fetch ${endpoint} options:`, response.data.statusMessage);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint} options:`, error);
      return [];
    }
  };

  const useFetchResource = async (endpoint) => {
    try {
      const response = await axios.get(`${CONFIG.PROPERTY_SERVICE}/${endpoint}`, {
        headers: {
          'transactionId': transactionId,
        },
      });
      if (response.data.statusCode === '00') {
        return response.data.resultSet; // Return fetched options
      } else {
        console.error(`Failed to fetch ${endpoint} resource:`, response.data.statusMessage);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint} resource:`, error);
      return [];
    }
  };

  // Return the state and the functions
  return {
    districts,
    setDistricts,
    fetchDistricts,
    mrtStations,
    setMrtStations,
    fetchMRTStations,
    propertyResources, // Expose the resultSet
    fetchPropertyResources,
    properties,
    fetchProperties,
    useFetchOptions,
    useFetchResource
  };
}

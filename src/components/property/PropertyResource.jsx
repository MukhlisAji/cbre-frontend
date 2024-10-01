import { useState, useEffect } from 'react';

const useFetchDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const transactionId = '4646765766'; // Transaction ID for the request

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch('https://a4a4650e0cdf.ngrok.app/cbre/property/getDistricts', {
          method: 'GET',
          headers: {
            'transactionId': transactionId,
          },
        });

        const data = await response.json();
        if (data.statusCode === '00') {
          // Transform the districts into objects with id, name, and checked properties
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

    fetchDistricts();
  }, []);

  return { districts, setDistricts };
};

export default useFetchDistricts;

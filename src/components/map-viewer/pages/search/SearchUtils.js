import { useState, useEffect } from 'react';
import axios from 'axios';
import { CONFIG_APP } from "../../../map-viewer/config/app";

export const SearchUtils = (fetchOptions) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Select');

    useEffect(() => {
        const getOptions = async () => {
            try {
                const data = await fetchOptions();
                setOptions(data);
            } catch (error) {
                console.error('Failed to fetch options:', error);
            }
        };

        getOptions();
    }, [fetchOptions]);

    console.log(options)
    console.log(selectedOption)

    return {
        options,
        selectedOption,
        setSelectedOption,
    };
};

const fetchWithCache = async (key, fetchFunction, cacheDuration = 24 * 60 * 60 * 1000) => {
    const cachedData = JSON.parse(localStorage.getItem(key));
    const now = new Date().getTime();

    // Check if the cached data is still valid
    if (cachedData && (now - cachedData.timestamp) < cacheDuration) {
        return cachedData.data;
        // localStorage.removeItem(key);

        
    }

    try {
        const data = await fetchFunction();

        // Store the fetched data in localStorage with a timestamp
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: now
        }));

        return data;
    } catch (error) {
        console.error(`Failed to fetch data for key: ${key}`, error);
        return [];
    }
};
// // Fetch NLA options
// export const fetchNlaOptions = async () => {
//     return ['Select NLA', 'NLA 1', 'NLA 2'];
// };

// Fetch Rent options
export const fetchRentOptions = async () => {
    return ['Select Asking Rent', 'Rent 1', 'Rent 2'];
};

// Fetch Date options
export const fetchDateOptions = async () => {
    return ['Select Available Dates', 'Date 1', 'Date 2'];
};

// Fetch Usage options
export const fetchUsageOptions = async () => {
    return ['Select Property Usage', 'Usage 1', 'Usage 2'];
};

// Fetch Region options from API
export const fetchRegionOptions = async () => {
    return fetchWithCache('regionOptions', async () => {
        const response = await axios.get(`${CONFIG_APP.MAPBOX_API}/master/region`);
        return response.data.map(item => item.MAINLOCATIONTAG_EN);
    });
};

export const fetchStatusOptions = async () => {
    return fetchWithCache('statusOptions', async () => {
        const response = await axios.get(`${CONFIG_APP.MAPBOX_API}/master/space-status`);
        return response.data.map(item => item.SPACESTATUS_EN);
    });
};

export const fetchZoningOptions = async () => {
    return fetchWithCache('zoningOptions', async () => {
        const response = await axios.get(`${CONFIG_APP.MAPBOX_API}/master/zoning`);
        return response.data.map(item => item.BUILDINGTYPE_EN);
    });
};

export const fetchPropertyUsageOptions = async () => {
    return fetchWithCache('propertyUsageOptions', async () => {
        const response = await axios.get(`${CONFIG_APP.MAPBOX_API}/master/property-usage`);
        return response.data.map(item => item.USAGESECTORTYPE_EN);
    });
};

export const fetchSubTypeOptions = async () => {
    return fetchWithCache('subTypeOptions', async () => {
        const response = await axios.get(`${CONFIG_APP.MAPBOX_API}/master/sub-type`);
        return response.data.map(item => item.PROPERTYSUBTYPE_EN);
    });
};

export const fetchMicromarketeOptions = async () => {
    return fetchWithCache('micromarketOptions', async () => {
        const response = await axios.get(`${CONFIG_APP.MAPBOX_API}/master/micromarket`);
        return response.data.map(item => item.LOCATIONTAG_EN);
    });
};

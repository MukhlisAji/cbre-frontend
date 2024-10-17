import { useAppContext } from '../../../AppContext';
import { CONFIG } from '../../../config';

// Function to generate transaction ID
export function generateTransactionId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 5);
}

// Function to get authorization token
export async function getAuthorizationToken(transactionId) {
    let token = '';

    try {
        const response = await fetch(`${CONFIG.UTILITIES_SERVICE}/salesforce/authorize`, {
            method: 'POST',
            headers: {
                'transactionId': transactionId,
                'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.statusCode === "00" && data.statusMessage === "SUCCESS") {
            token = data.token;
            console.log("Authorization successful. Token:", token);
        } else {
            console.error("Authorization failed:", data.statusDescription);
        }
    } catch (error) {
        console.error("Error during authorization:", error);
    }

    return token;
}

// Hook to use utils with context
export function useUtils() {
    const { token, setToken } = useAppContext();

    const generateAndSetToken = async () => {
        const transactionId = generateTransactionId();
        const newToken = await getAuthorizationToken(transactionId);
        if (newToken) {
            setToken(newToken);
            return true;
        }
        return false;
    };

    return { generateAndSetToken };
}
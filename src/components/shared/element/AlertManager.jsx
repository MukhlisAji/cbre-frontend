import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const AlertManager = () => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, severity) => {
        const newAlert = { id: Date.now(), message, severity };
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    };

    useEffect(() => {
        if (alerts.length > 0) {
            const timer = setTimeout(() => {
                setAlerts(prevAlerts => prevAlerts.slice(1));
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alerts]);

    return (
        <div className="fixed top-5 right-5 z-50 space-y-2">
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    icon={alert.severity === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
                    severity={alert.severity}
                    onClose={() => setAlerts(prevAlerts => prevAlerts.filter(a => a.id !== alert.id))}
                >
                    {alert.message}
                </Alert>
            ))}
        </div>
    );
};

export const useAlerts = () => {
    const [, setAlerts] = useState([]);

    const addAlert = (message, severity) => {
        console.log('Adding alert:', message, severity);
        const newAlert = { id: Date.now(), message, severity };
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    };
    return { addAlert };
};

export default AlertManager;
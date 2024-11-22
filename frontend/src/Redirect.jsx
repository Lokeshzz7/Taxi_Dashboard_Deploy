import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        
        if (userRole === 'admin') {
            navigate('/main');  // Admin route
        } else if (userRole === 'driver') {
            navigate('/trips');  // Driver route
        } else {
            navigate('/');  // Default route or handle unauthorized access
        }
    }, [navigate]);

    return null;  // Or a loading spinner
};

export default Redirect;

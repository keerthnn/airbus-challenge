// FlightWeatherFaults.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightWeatherFaults = ({ id }) => {
    const [weatherFaultsData, setWeatherFaultsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWeatherFaultsData = async () => {
            try {
                const response = await axios.get(`/api/weather-faults/${id}`);
                setWeatherFaultsData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching weather and faults data: ' + error.message);
                setLoading(false);
            }
        };

        fetchWeatherFaultsData();
    }, [id]);

    if (loading) {
        return <div>Loading weather and faults data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="card flight-detail-card">
            <h2>Flight Weather & Technical Faults</h2>
            {weatherFaultsData ? (
                <div>
                    <p>Flight ID: {weatherFaultsData.id}</p>
                    <p>Departure Airport: {weatherFaultsData.fromName}</p>
                    <p>Arrival Airport: {weatherFaultsData.toName}</p>
                    <h3>Weather & Technical Faults:</h3>
                    <ul>
                        {Object.entries(weatherFaultsData.technicalFaults).map(([fault, value]) => (
                            <li key={fault}>{value ? '✅' : '❌'} {fault}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No weather and faults data available for this flight.</div>
            )}
        </div>
    );
};

export default FlightWeatherFaults;

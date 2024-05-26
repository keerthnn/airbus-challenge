import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FuelData.css';

const FuelData = ({ aircraft, distance }) => {
    const [fuelData, setFuelData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFuelData = async () => {
            try {
                const response = await axios.get(`/api/fuel-data?aircraft=${aircraft}&distance=${distance}`);
                setFuelData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching fuel data');
                setLoading(false);
            }
        };

        fetchFuelData();
    }, [aircraft, distance]);
    

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading fuel data...</p>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="fuel-data">
            <h3>Fuel Data</h3>
            {fuelData.map((data, index) => (
                <div key={index}>
                    <p><strong>Aircraft:</strong> {data.icao24}</p>
                    <p><strong>Distance:</strong> {data.distance} km</p>
                    <p><strong>Fuel Required:</strong> {data.fuel} kg</p>
                    <p><strong>CO2 Emission:</strong> {data.co2} kg</p>
                    <p><strong>ICAO:</strong> {data.icao}</p>
                    <p><strong>IATA:</strong> {data.iata}</p>
                    <p><strong>Model:</strong> {data.model}</p>
                    <p><strong>GCD:</strong> {data.gcd ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>

    );
};

export default FuelData;

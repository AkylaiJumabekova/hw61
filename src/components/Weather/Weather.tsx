import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherProps {
    countryCode: string | null;
}

interface WeatherData {
    weatherDesc: { value: string }[];
    temp_C: string;
    winddir16Point: string;
    windspeedKmph: string;
}

const Weather: React.FC<WeatherProps> = ({ countryCode }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [capital, setCapital] = useState<string | null>(null);

    useEffect(() => {
        if (countryCode) {
            const fetchCountryCapital = async () => {
                const response = await axios.get(`https://restcountries.com/v2/alpha/${countryCode}`);
                setCapital(response.data.capital);
            };

            fetchCountryCapital();
        }
    }, [countryCode]);

    useEffect(() => {
        if (capital) {
            const fetchWeather = async () => {
                const response = await axios.get<WeatherData>(`https://wttr.in/${capital}?format=j1`);
                setWeather(response.data.current_condition[0]);
            };

            fetchWeather();
        }
    }, [capital]);

    if (!countryCode || !capital) {
        return <div>Choose country to see the weather</div>;
    }

    if (!weather) {
        return <div>Loading weather...</div>;
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Local weather: {weather.weatherDesc[0].value}</p>
            <p>Temperature: {weather.temp_C}°C</p>
            <p>Wind: {weather.winddir16Point} {weather.windspeedKmph} km/h</p>
        </div>
    );
};

export default Weather;

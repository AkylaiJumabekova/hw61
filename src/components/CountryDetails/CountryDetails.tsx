import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CountryDetailsProps {
    countryCode: string | null;
}

interface Country {
    name: string;
    capital: string;
    population: number;
    borders: string[];
    flag: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ countryCode }) => {
    const [country, setCountry] = useState<Country | null>(null);

    useEffect(() => {
        if (countryCode) {
            const fetchCountry = async () => {
                const response = await axios.get<Country>(`https://restcountries.com/v2/alpha/${countryCode}`);
                setCountry(response.data);
            };

            fetchCountry();
        }
    }, [countryCode]);

    if (!countryCode) {
        return <div>Выберите страну</div>;
    }

    if (!country) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <img src={country.flag} alt={`${country.name} flag`} width="200" />
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        </div>
    );
};

export default CountryDetails;

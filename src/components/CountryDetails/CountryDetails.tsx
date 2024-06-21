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
    const [borderCountries, setBorderCountries] = useState<string[]>([]);

    useEffect(() => {
        if (countryCode) {
            const fetchCountry = async () => {
                const response = await axios.get<Country>(`https://restcountries.com/v2/alpha/${countryCode}`);
                setCountry(response.data);

                if (response.data.borders.length > 0) {
                    const borderResponses = await Promise.all(
                        response.data.borders.map((borderCode: string) =>
                            axios.get<{ name: string }>(`https://restcountries.com/v2/alpha/${borderCode}`)
                        )
                    );
                    setBorderCountries(borderResponses.map(res => res.data.name));
                } else {
                    setBorderCountries([]);
                }
            };

            fetchCountry();
        }
    }, [countryCode]);

    if (!countryCode) {
        return <div>Choode country</div>;
    }

    if (!country) {
        return <div>Loadinf...</div>;
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <img src={country.flag} alt={`${country.name} flag`} width="200" />
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Borders with:</strong></p>
            <ul>
                {borderCountries.length > 0 ? (
                    borderCountries.map((borderName) => <li key={borderName}>{borderName}</li>)
                ) : (
                    <li>No neighboring countries</li>
                )}
            </ul>
        </div>
    );
};

export default CountryDetails;

import React from 'react';

interface CountryListProps {
    countries: { countryCode: string; name: string }[];
    setSelectedCountry: (code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, setSelectedCountry }) => {
    return (
        <ul className="list-group">
            {countries.map(country => (
                <li
                    key={country.countryCode}
                    className="list-group-item"
                    onClick={() => setSelectedCountry(country.countryCode)}
                    style={{ cursor: 'pointer' }}
                >
                    {country.name}
                </li>
            ))}
        </ul>
    );
};

export default CountryList;

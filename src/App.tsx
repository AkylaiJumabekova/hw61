import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList/CountryList';
import CountryDetails from './components/CountryDetails/CountryDetails';

interface Country {
  countryCode: string;
  name: string;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get<{ alpha3Code: string, name: string }[]>('https://restcountries.com/v2/all?fields=alpha3Code,name');
      const fetchedCountries: Country[] = response.data.map(country => ({
        countryCode: country.alpha3Code,
        name: country.name,
      }));
      setCountries(fetchedCountries);
    };

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <CountryList countries={countries} setSelectedCountry={setSelectedCountry} />
      <CountryDetails countryCode={selectedCountry} />
    </div>
  );
};

export default App;

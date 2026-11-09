import React, { useEffect, useState } from "react";
import "./CountryPicker.css";

import { fetchCountries } from "../api";

function CountryPicker({ handleCountryChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };

    getCountries();
  }, []);

  return (
    <div className="countryContainer">
      <select
        className="countrySelect"
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>

        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryPicker;
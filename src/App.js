 import React, { useEffect, useState } from "react";
import "./App.css";

import { fetchData } from "./api";

import Cards from "./components/Cards";
import Chart from "./components/Chart";
import CountryPicker from "./components/CountryPicker";

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    loadGlobalData();
  }, []);

  const loadGlobalData = async () => {
    const result = await fetchData();
    setData(result);
  };

  const handleCountryChange = async (country) => {
    const result = await fetchData(country);

    setData(result);
    setCountry(country);
  };

  return (
    <div className="container">
      <img
        className="image"
        src="https://i.ibb.co/7QpKsCX/covid.png"
        alt="COVID-19"
      />

      <Cards data={data} />

      <CountryPicker handleCountryChange={handleCountryChange} />

      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
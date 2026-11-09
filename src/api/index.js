import axios from "axios";

const BASE_URL = "https://disease.sh/v3/covid-19";

// Fetch Global Data or Country Data
export const fetchData = async (country = "") => {
  try {
    let url = `${BASE_URL}/all`;

    if (country) {
      url = `${BASE_URL}/countries/${country}`;
    }

    const { data } = await axios.get(url);

    return {
      confirmed: data.cases,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.updated,
    };
  } catch (error) {
    console.log(error);
  }
};

// Fetch Historical Data
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/historical/all?lastdays=all`
    );

    const dailyData = Object.keys(data.cases).map((date) => ({
      date,
      confirmed: data.cases[date],
      deaths: data.deaths[date],
    }));

    return dailyData;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Country List
export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/countries`);

    return data.map((country) => country.country);
  } catch (error) {
    console.log(error);
  }
};
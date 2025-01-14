import { useState } from "react";
import AutocompleteInput from "./components/AutoCompleteInput";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (lat, lng) => {
    const apiKey = "46ab3ee6761473ead7689a5ec159263d";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
    setSelectedLocation(location);
    fetchWeather(location.lat, location.lng);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Weather App</h1>
      <AutocompleteInput onLocationSelect={handleLocationSelect} />
      {selectedLocation && (
        <div>
          <h2>Selected Location:</h2>
          <p>Name: {selectedLocation.name}</p>
          <p>Latitude: {selectedLocation.lat}</p>
          <p>Longitude: {selectedLocation.lng}</p>
        </div>
      )}
      {weatherData && (
        <div>
          <h2>Weather Data:</h2>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;

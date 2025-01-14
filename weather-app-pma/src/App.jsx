import { useState, useEffect } from "react";
import AutocompleteInput from "./components/AutocompleteInput";
import WeatherBox from "./components/WeatherBox";
import { createWeatherRecord, deleteWeatherRecord, updateWeatherRecord, fetchWeather } from "./utils/api";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const data = await fetchWeather();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to load weather data:", error.message);
      }
    };

    loadWeatherData(); // Fetch weather data on component mount
  }, []);

  const handleLocationSelect = async (location) => {
    console.log("Selected location:", location);
    setSelectedLocation(location);

    try {
      await createWeatherRecord(location.lat, location.lng);
      const updatedData = await fetchWeather(); // Reload data
      setWeatherData(updatedData);
    } catch (error) {
      console.error("Failed to create weather record:", error.message);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateWeatherRecord(id, updatedData);
  
      // Use a different name for the variable to avoid shadowing
      const updatedWeatherData = await fetchWeather(); // Reload data
      setWeatherData(updatedWeatherData);
    } catch (error) {
      console.error("Failed to update weather record:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWeatherRecord(id);
      const updatedData = await fetchWeather(); // Reload data
      setWeatherData(updatedData);
    } catch (error) {
      console.error("Failed to delete weather record:", error.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Ebrahim Al-Yousefi&apos;s Weather App</h1>
      <button><a href="https://www.linkedin.com/school/pmaccelerator/">PM Accelerator Description</a></button>
      <AutocompleteInput onLocationSelect={handleLocationSelect} />
      {weatherData.length > 0 ? (
        weatherData.map((data) => (
          <WeatherBox
            key={data._id}
            weather={data}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No weather data available</p>
      )}
      {selectedLocation && (
        <div>
          <h2>Selected Location:</h2>
          <p>Name: {selectedLocation.name}</p>
          <p>Latitude: {selectedLocation.lat}</p>
          <p>Longitude: {selectedLocation.lng}</p>
        </div>
      )}
    </div>
  );
};

export default App;

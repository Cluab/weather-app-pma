import { useState, useEffect } from "react";
import AutocompleteInput from "./components/AutoCompleteInput";
import WeatherBox from "./components/WeatherBoc";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    const url = `http://localhost:5000/api/read/`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
  
      // Only update state if there are records
      if (data.length > 0) {
        setWeatherData(data);
      } else {
        console.warn("No weather data found");
        setWeatherData(null); // Clear any existing data
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const deleteWeatherRecord = async (id) => {
    const url = `http://localhost:5000/api/delete/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete weather record");
      }
  
      console.log("Weather record deleted successfully");
    } catch (error) {
      console.error("Error deleting weather record:", error.message);
    }
  };
  const updateWeatherRecord = async (id, updatedData) => {
    const url = `http://localhost:5000/api/update/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Convert the updated data to a JSON string
      });
  
      if (!response.ok) {
        throw new Error("Failed to update weather record");
      }
  
      const updatedRecord = await response.json();
      console.log("Weather record updated successfully:", updatedRecord);
  
    } catch (error) {
      console.error("Error updating weather record:", error.message);
    }
  }
  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
    setSelectedLocation(location);
    fetchWeather(location.lat, location.lng);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Ebrahim Al-Yousefi&apos;s Weather App</h1>
      <h2></h2>
      <AutocompleteInput onLocationSelect={handleLocationSelect} />
      {weatherData && weatherData.length > 0 ? (
  weatherData.map((data) => (
    <WeatherBox
      key={data._id}
      weather={data}
      onUpdate={updateWeatherRecord}
      onDelete={deleteWeatherRecord}
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

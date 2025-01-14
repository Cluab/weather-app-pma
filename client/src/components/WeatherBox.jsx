import { useState } from "react";
import PropTypes from "prop-types";

const WeatherBox = ({ weather, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWeather, setEditedWeather] = useState(weather);

  const handleUpdate = () => {
    onUpdate(weather._id, editedWeather);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(weather._id);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedWeather.location}
            onChange={(e) => setEditedWeather({ ...editedWeather, location: e.target.value })}
          />
          <input
            type="number"
            value={editedWeather.temperature}
            onChange={(e) => setEditedWeather({ ...editedWeather, temperature: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{weather.location}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
          <p>Date: {weather.createdAt.slice(0, 10)} </p>
          <button onClick={() => setIsEditing(true)}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};
WeatherBox.propTypes = {
  weather: PropTypes.shape({
    location: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WeatherBox;

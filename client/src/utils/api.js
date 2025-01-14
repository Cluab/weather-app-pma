const BASE_URL = 'https://weather-app-pma.onrender.com/api';

const fetchWeather = async () => {
  const url = `${BASE_URL}/read`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const data = await response.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
};

const createWeatherRecord = async (lat, lon) => {
  const url = `${BASE_URL}/weather/create`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lon }),
    });

    if (!response.ok) {
      throw new Error('Failed to create weather record');
    }

    const createdRecord = await response.json();
    console.log('Weather record created successfully:', createdRecord);
  } catch (error) {
    console.error('Error creating weather record:', error.message);
  }
};

const deleteWeatherRecord = async (id) => {
  const url = `${BASE_URL}/delete/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete weather record');
    }

    console.log('Weather record deleted successfully');
  } catch (error) {
    console.error('Error deleting weather record:', error.message);
  }
};

const updateWeatherRecord = async (id, updatedData) => {
  const url = `${BASE_URL}/update/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update weather record');
    }

    const updatedRecord = await response.json();
    console.log('Weather record updated successfully:', updatedRecord);
  } catch (error) {
    console.error('Error updating weather record:', error.message);
  }
};

export {
  fetchWeather,
  createWeatherRecord,
  deleteWeatherRecord,
  updateWeatherRecord,
};

import PropTypes from "prop-types";
import { useLoadScript } from "@react-google-maps/api";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";

const libraries = ["places"]; // Add 'places' library for Places API

const AutocompleteInput = ({ onLocationSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "", // Replace with your API key
    libraries,
  });

  const handlePlaceSelect = async (place) => {
    try {
      const geocodeResults = await geocodeByPlaceId(place.value.place_id);
      const { lat, lng } = await getLatLng(geocodeResults[0]);

      const location = {
        lat,
        lng,
        name: place.label,
      };

      onLocationSelect(location); // Pass the location to the parent component
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "1rem", width: "80%" }}>
      <GooglePlacesAutocomplete
        selectProps={{
          onChange: handlePlaceSelect,
          placeholder: "Enter a location",
        }}
      />
    </div>
  );
};

AutocompleteInput.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};

export default AutocompleteInput;

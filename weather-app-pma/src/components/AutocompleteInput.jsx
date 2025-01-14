import PropTypes from "prop-types";
import { useLoadScript } from "@react-google-maps/api";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";

const libraries = ["places"];

const AutocompleteInput = ({ onLocationSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEAPIKEY,
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

      onLocationSelect(location);
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
    styles: {
      input: (provided) => ({
        ...provided,
        backgroundColor: "#2C2C2C", // Dark background for input field
        color: "#FFFFFF", // White text
        padding: "10px",
        borderRadius: "5px",
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: "#1F1F1F", // Dark background for dropdown
        color: "#FFFFFF", // White text
        borderRadius: "5px",
        marginTop: "5px",
        zIndex: 9999, // Ensure it's above other components
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#444444" : "#1F1F1F", // Highlight focused option
        color: state.isFocused ? "#FFFFFF" : "#CCCCCC", // White text for focused, gray for others
        padding: "10px",
      }),
    },
  }}
      />
    </div>
  );
};

AutocompleteInput.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};

export default AutocompleteInput;

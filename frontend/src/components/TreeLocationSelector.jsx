import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import LoadingSpinner from "./LoadingSpinner";

function TreeLocationSelector({ onLocationSelected }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const onMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <GoogleMap
        zoom={13}
        center={{ lat: 54.5973, lng: -5.9301 }}
        mapContainerClassName="map-container"
        onClick={onMapClick}
      >
        {selectedLocation && (
          <MarkerF
            key={selectedLocation.lat}
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />
        )}
      </GoogleMap>
      {selectedLocation && (
        <button onClick={() => onLocationSelected(selectedLocation)}>
          Confirm Location
        </button>
      )}
    </>
  );
}

export default TreeLocationSelector;

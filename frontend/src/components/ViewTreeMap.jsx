import React from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import LoadingSpinner from "./LoadingSpinner";

function ViewTreeMap({ location }) {
  //use API key to access maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  //map container
  const containerStyle = {
    width: "300px",
    height: "400px",
  };

  //set tree co-ordinates to be used for marker display
  const coordinates = {
    lat: location.coordinates[1],
    lng: location.coordinates[0],
  };

  if (!isLoaded) {
    return (
      <div className="spinnerContainer">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={15}
        options={{ gestureHandling: "greedy", draggable: true }}
      >
        <MarkerF position={coordinates} />
      </GoogleMap>
    </>
  );
}

export default ViewTreeMap;

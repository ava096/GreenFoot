import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Button from "react-bootstrap/Button";

function TreeLocationSelector() {
  const navigate = useNavigate();
  //state setter for user location
  const [currentLocation, setCurrentLocation] = useState(null);
  //state setter for nearby trees
  const [nearbyTrees, setNearbyTrees] = useState([]);
  //set state so InfoWindow can be called when a marker is clicked
  const [selectedTree, setSelectedTree] = useState(null);

  //load in google script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  //Get logged in user details
  const { user } = useSelector((state) => state.auth);

  //define the centre point for the map to automatically focus on Belfast
  const center = useMemo(() => ({ lat: 54.5973, lng: -5.9301 }), []);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    const getNearbyTrees = async () => {
      if (!currentLocation) return;

      const response = await axios.get(
        "http://localhost:8000/api/trees/nearby/",
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming `user` is available in the component or from a context
          },
          params: {
            longitude: currentLocation.lng,
            latitude: currentLocation.lat,
          },
        }
      );
      setNearbyTrees(response.data);
    };

    getNearbyTrees();
  }, [currentLocation]);

  //set clicked marker to the selected tree
  const onOpenClick = (tree) => {
    setSelectedTree(tree);
  };

  //reset selected tree state when info window is closed
  const onCloseClick = () => {
    setSelectedTree(null);
  };

  //navigate to view tree's page when button is clicked
  const onButtonClick = () => {
    navigate(`/submitForm/${selectedTree._id}`);
  };

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerClassName="map-container"
      options={{ gestureHandling: "greedy", draggable: true }}
    >
      {currentLocation && (
        <MarkerF
          position={currentLocation}
          icon={{
            url: "/icons/location.png",
            scaledSize: new window.google.maps.Size(35, 41),
          }}
        />
      )}
      {nearbyTrees.map((tree, idx) => (
        <MarkerF
          key={idx}
          position={{
            lat: tree.location.coordinates[1],
            lng: tree.location.coordinates[0],
          }}
          onClick={() => onOpenClick(tree)}
        />
      ))}
      {selectedTree && (
        <InfoWindowF
          position={{
            lat: selectedTree.location.coordinates[1],
            lng: selectedTree.location.coordinates[0],
          }}
          onCloseClick={onCloseClick}
        >
          <div>
            <img className="cardImg" src={selectedTree.imageURI} />
            <h5>{selectedTree.treeType}</h5>
            <p>{selectedTree.treeDescription}</p>
            <Button variant="success" onClick={onButtonClick}>
              Create Report
            </Button>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

export default TreeLocationSelector;

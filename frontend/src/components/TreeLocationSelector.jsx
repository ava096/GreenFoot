import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TreeLocationSelector({ onLocationSelected }) {
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setShowModal(true);
  }, []);

  const handleClose = () => setShowModal(false);
  const handleConfirm = () => {
    onLocationSelected(selectedLocation);
    setShowModal(false);
    navigate("/selectTree");
  };

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
        options={{ gestureHandling: "greedy", draggable: true }}
      >
        {selectedLocation && (
          <MarkerF
            key={selectedLocation.lat}
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />
        )}
      </GoogleMap>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Location</Modal.Title>
        </Modal.Header>
        {selectedLocation && (
          <>
            <Modal.Body>
              {`You selected the location: ${selectedLocation.lat}, ${selectedLocation.lng}. Is this correct?`}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Reselect
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}

export default TreeLocationSelector;

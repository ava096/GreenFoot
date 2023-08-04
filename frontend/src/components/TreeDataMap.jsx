import { React, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TreeDataMap({ trees }) {
  //define navigate for use
  const navigate = useNavigate();

  //set state so InfoWindow can be called when a marker is clicked
  const [selectedTree, setSelectedTree] = useState(null);

  //use API key to access maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  //loading state for actual TreeDataMap chil is handled in the parent
  //loading state for useLoadScript still has to be handled within child
  if (!isLoaded) {
    return (
      <>
        <div>
          <LoadingSpinner />
        </div>
      </>
    );
  }

  //define the centre point for the map to automatically focus on Belfast
  const center = useMemo(() => ({ lat: 54.5973, lng: -5.9301 }), []);

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
    navigate(`/viewTree/${selectedTree._id}`);
  };

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      {trees.map((tree) => (
        <MarkerF
          key={tree._id}
          position={{ lat: tree.treeLatitude, lng: tree.treeLongitude }}
          onClick={onOpenClick(tree)}
        />
      ))}

      {selectedTree && (
        <InfoWindowF
          position={{
            lat: selectedTree.treeLatitude,
            lng: selectedTree.treeLongitude,
          }}
          onCloseClick={onCloseClick}
        >
          <div>
            <h5>{selectedTree.treeType}</h5>
            <p>{selectedTree.treeDescription}</p>
            <Button variant="success" onClick={onButtonClick}>
              View Tree
            </Button>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

export default TreeDataMap;

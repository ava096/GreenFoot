import { React, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  HeatmapLayerF,
} from "@react-google-maps/api";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//to access heatmap
const GOOGLE_MAPS_LIBRARIES = ["visualization"];

function TreeDataMap({ trees }) {
  //define navigate for use
  const navigate = useNavigate();

  //set state so InfoWindow can be called when a marker is clicked
  const [selectedTree, setSelectedTree] = useState(null);

  //set state to toggle heatmap on and off
  const [showHeatmap, setShowHeatmap] = useState(false);

  //use API key to access maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    //include visualisation library for heatmap
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  //define the centre point for the map to automatically focus on Belfast
  const center = useMemo(() => ({ lat: 54.5973, lng: -5.9301 }), []);

  //convert tree data to heatmap data as maps api expects an array of LatLng objects
  //heatmap data will only be generated when maps api is loaded
  const heatmapData = isLoaded
    ? trees.map(
        (tree) =>
          new window.google.maps.LatLng(
            tree.location.coordinates[1],
            tree.location.coordinates[0]
          )
      )
    : [];

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

  //control heatmap display
  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };

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

  return (
    <>
      <Button variant="success" onClick={toggleHeatmap}>
        {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
      </Button>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="map-container"
      >
        {!showHeatmap &&
          trees.map((tree) => (
            <MarkerF
              key={tree._id}
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
              <h5>{selectedTree.treeType}</h5>
              <p>{selectedTree.treeDescription}</p>
              <Button variant="success" onClick={onButtonClick}>
                View Tree
              </Button>
            </div>
          </InfoWindowF>
        )}

        {showHeatmap && (
          <HeatmapLayerF
            data={heatmapData}
            options={
              {
                // Optional heatmap options
              }
            }
          />
        )}
      </GoogleMap>
    </>
  );
}

export default TreeDataMap;

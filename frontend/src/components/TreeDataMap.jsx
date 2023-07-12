import { React, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { useQuery } from "react-query";

function TreeDataMap() {
  async function getTrees() {
    const response = await axios.get("http://localhost:8000/api/trees");
    return response.data;
  }

  const { isLoading, error, data } = useQuery("trees", getTrees);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded || isLoading) {
    return <div>Loading...</div>;
  }

  return <Map trees={data} />;

  function Map({ trees }) {
    const center = useMemo(() => ({ lat: 54.5973, lng: -5.9301 }), []);

    return (
      <GoogleMap
        zoom={10}
        center={{ lat: 54.5973, lng: -5.9301 }}
        mapContainerClassName="map-container"
      >
        {trees.map((tree) => (
          <MarkerF
            key={tree._id}
            position={{ lat: tree.treeLatitude, lng: tree.treeLongitude }}
          />
        ))}
      </GoogleMap>
    );
  }
}

export default TreeDataMap;

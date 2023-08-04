import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import TreeDataMap from "../components/TreeDataMap";
import LoadingSpinner from "../components/LoadingSpinner";

function DatabaseMapView() {
  //API call to get trees from database
  const getTrees = async () => {
    const response = await axios.get("http://localhost:8000/api/trees");

    return response.data;
  };

  //Query the database, so data can be passed as props
  const { isLoading, error, data } = useQuery("trees", getTrees);

  //if loading, display loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="container">
        <TreeDataMap trees={data} />
      </div>
    </>
  );
}

export default DatabaseMapView;

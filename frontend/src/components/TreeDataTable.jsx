import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

async function getTrees() {
  const response = await axios.get("http://localhost:8000/api/trees");
  return response.data;
}

function TreeDataTable() {
  const { isLoading, error, data } = useQuery("trees", getTrees);

  if (isLoading) return "Loading...";
  if (error) return `An error occurred: ${error.message}`;

  return (
    <table className="treeTable">
      <thead>
        <tr>
          <th>Location</th>
          <th>Species</th>
          <th>Scientific Name</th>
          <th>Age</th>
          <th>Description</th>
          <th>Surroundings</th>
          <th>Vigour</th>
          <th>Condition</th>
          <th>Diameter (cm)</th>
          <th>Radius (m)</th>
          <th>Height (m)</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((tree) => (
            <tr key={tree._id}>
              <td>{tree.treeType}</td>
              <td>{tree.speciesType}</td>
              <td>{tree.species}</td>
              <td>{tree.age}</td>
              <td>{tree.description}</td>
              <td>{tree.treeSurround}</td>
              <td>{tree.vigour}</td>
              <td>{tree.condition}</td>
              <td>{tree.diameterCentimetres}</td>
              <td>{tree.radiusMetres}</td>
              <td>{tree.treeHeightMetres}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TreeDataTable;

import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

function TreeDataTable({ filters }) {
  const navigate = useNavigate();

  const getTrees = async () => {
    const response = await axios.get("http://localhost:8000/api/trees", {
      params: filters,
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery(
    JSON.stringify(filters) === "{}" ? "trees" : JSON.stringify(filters),
    getTrees
  );

  if (isLoading) return "Loading...";
  if (error) return `An error occurred: ${error.message}`;

  if (data && data.length === 0) {
    return (
      <Row className="selectorRow">
        <h5 className="noDataMessage">
          Sorry, but we couldn't find any matches...
        </h5>
      </Row>
    );
  }

  //link to the page for the tree detailed in the table row
  const onClick = () => {
    navigate(`/viewTree/${tree._id}`);
  };

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
          <th>Spread Radius (m)</th>
          <th>Height (m)</th>
          <th>View Tree</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((tree) => (
            <tr key={tree._id}>
              <td>{tree.treeLocationType}</td>
              <td>{tree.treeType}</td>
              <td>{tree.treeScientificName}</td>
              <td>{tree.treeAge}</td>
              <td>{tree.treeDescription}</td>
              <td>{tree.treeSurroundings}</td>
              <td>{tree.treeVigour}</td>
              <td>{tree.treeCondition}</td>
              <td>{tree.treeDiameterCentimetres}</td>
              <td>{tree.treeSpreadRadiusMetres}</td>
              <td>{tree.treeHeightMetres}</td>
              <td>
                <Button variant="success" onClick={onClick}>
                  View Tree
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TreeDataTable;

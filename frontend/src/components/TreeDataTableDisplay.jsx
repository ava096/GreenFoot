import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TreeDataTableDisplay({ tree }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/viewTree/${tree._id}`);
  };

  return (
    <>
      <Table striped bordered hover>
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
        </tbody>
      </Table>
    </>
  );
}

export default TreeDataTableDisplay;

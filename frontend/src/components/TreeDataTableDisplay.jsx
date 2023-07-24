import React from "react";
import { Table } from "react-bootstrap";

function TreeDataTableDisplay({ tree }) {
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
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TreeDataTableDisplay;

import React from "react";
import { useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";

function SelectTreeCard({ tree }) {
  const dispatch = useDispatch();

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{tree.treeType}</Card.Title>
          <Card.Text>{tree.treeDescription}</Card.Text>
          <Button variant="success">Create Report</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default SelectTreeCard;

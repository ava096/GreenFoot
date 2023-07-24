import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function TreeCard({ tree }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/view/${tree._id}`);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{tree.treeType}</Card.Title>
          <Card.Text>{tree.treeScientificName}</Card.Text>
          <Button variant="success" onClick={onClick}>
            View Tree
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default TreeCard;
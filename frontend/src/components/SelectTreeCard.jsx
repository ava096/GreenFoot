import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function SelectTreeCard({ tree }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/submitForm/${tree._id}`);
  };

  return (
    <>
      <Card className="cardDisplay">
        <Card.Img variant="top" src={tree.imageURI} />
        <Card.Body>
          <Card.Title>{tree.treeType}</Card.Title>
          <Card.Text>{tree.treeDescription}</Card.Text>
          <Button variant="success" onClick={onClick}>
            Create Report
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default SelectTreeCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

function SelectTreeCard({ tree }) {
  const navigate = useNavigate();

  const onCreateClick = () => {
    navigate(`/submitForm/${tree._id}`);
  };

  const onViewClick = () => {
    navigate(`/viewTree/${tree._id}`);
  };

  return (
    <>
      <Card className="cardDisplay">
        <Card.Img variant="top" src={tree.imageURI} />
        <Card.Body>
          <Card.Title>{tree.treeType}</Card.Title>
          <Card.Text>{tree.treeDescription}</Card.Text>
          <Row>
            <Col>
              <div>
                <Button
                  className="selectButton"
                  variant="success"
                  onClick={onViewClick}
                >
                  View Tree
                </Button>
              </div>
            </Col>
            <Col>
              <div>
                <Button
                  className="selectButton"
                  variant="success"
                  onClick={onCreateClick}
                >
                  Create Report
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default SelectTreeCard;

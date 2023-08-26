import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NewTreeForm from "../components/NewTreeForm";

function NewTree() {
  //set state for location info
  const [currentLocation, setCurrentLocation] = useState({});

  //find current location to be assigned to new tree
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Container className="displayContainer">
        <Row>
          <Col>
            <div className="pageTitle">
              <h1>Suggest a New Tree</h1>
            </div>
            <div className="pageText">
              <p>
                Nature is constantly changing, and we're more than happy to add
                a new tree to our database if you've found one! Once you have
                submitted this suggestion of a new tree, it will be reviewed by
                an admin before being formally accepted. Thank you for helping
                this project grow!
              </p>
            </div>
            <NewTreeForm currentLocation={currentLocation} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewTree;

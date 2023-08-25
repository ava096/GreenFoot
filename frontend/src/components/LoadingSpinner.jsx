import React from "react";
import { Spinner, Container } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <>
      <Container className="spinnerContainer">
        <Spinner animation="border" />
      </Container>
    </>
  );
}

export default LoadingSpinner;

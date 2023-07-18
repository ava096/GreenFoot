import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TreeLocationSelector from "../components/TreeLocationSelector";

function SubmitReportLocation() {
  return (
    <>
      <Container>
        <Row className="selectorRow">
          <Col>
            <h2>Let's Get Started!</h2>
          </Col>
          <Col>
            <p>Please indicate the location of the tree on the map.</p>
          </Col>
        </Row>
        <div>
          <TreeLocationSelector />
        </div>
      </Container>
    </>
  );
}

export default SubmitReportLocation;

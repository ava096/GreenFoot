import React from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../features/trees/treeSlice";
import { Container, Row, Col } from "react-bootstrap";
import TreeLocationSelector from "../components/TreeLocationSelector";

function SubmitReportLocation() {
  const dispatch = useDispatch();

  const onLocationSelected = (location) => {
    console.log(location);
    dispatch(setLocation(location));
  };

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>Let's Get Started!</h2>
          </Col>
          <Col className="textDisplay">
            <h5>
              Please indicate the location of the tree you'd like to make a
              report for on the map.
            </h5>
          </Col>
        </Row>
        <div>
          <TreeLocationSelector onLocationSelected={onLocationSelected} />
        </div>
      </Container>
    </>
  );
}

export default SubmitReportLocation;

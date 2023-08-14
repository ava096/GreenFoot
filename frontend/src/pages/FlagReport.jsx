import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FlagForm from "../components/FlagForm";

function FlagReport() {
  //get the report id
  const { id } = useParams();

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h1>Flagging a Report</h1>
          </Col>
        </Row>
        <Row>
          <Col className="textDisplay">
            <div>
              <p>
                We'd like to know some more information about your reason for
                flagging this report. This will help our admins during the
                review process.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <FlagForm reportID={id} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FlagReport;

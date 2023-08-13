import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UpdateFlagForm from "../components/UpdateFlagForm";

function UpdateFlag() {
  //get flag ID
  const { id } = useParams();

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h1>Updating a Flag's Status</h1>
          </Col>
        </Row>
        <Row>
          <Col className="textDisplay">
            <div>
              <p>
                Please fill out all areas of this form. Here are some guidelines
                on how to choose a new status for the flag: resolved flags will
                require you to take an action, which may be updating the
                report's information or hiding the report from view. If you find
                that no action is required for the report, you may reject the
                flag.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <UpdateFlagForm flagID={id} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateFlag;

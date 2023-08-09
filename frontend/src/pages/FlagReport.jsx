import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFlag } from "../features/flags/flagSlice";
import { Container, Col, Row, Form } from "react-bootstrap";
import FlagForm from "../components/FlagForm";

function FlagReport() {
  const dispatch = useDispatch();

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
          <Col>
            <div>
              <FlagForm />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FlagReport;

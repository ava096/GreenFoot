import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NewRecordForm from "../components/NewRecordForm";

function SubmitRecordForm() {
  //get id for tree associated with report
  const { treeID } = useParams();

  //creating a report, using create route rather than update
  const isEditMode = false;

  return (
    <Container>
      <Row>
        <Col>
          <div className="pageTitle">
            <h1>Submit a new record</h1>
          </div>
          <div className="pageText">
            <p>
              This is a crowdsourced database that relies on reports from the
              general public to continue growing. The form below will guide you
              in what information you should submit for each field. Thank you
              for contributing to this project!
            </p>
          </div>
          <NewRecordForm id={treeID} isEditMode={isEditMode} />
        </Col>
      </Row>
    </Container>
  );
}

export default SubmitRecordForm;

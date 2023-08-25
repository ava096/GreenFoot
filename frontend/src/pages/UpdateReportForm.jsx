import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NewRecordForm from "../components/NewRecordForm";

function UpdateReportForm() {
  //get id of report that is being updated
  const { reportID } = useParams();

  console.log("report ID: ", reportID);

  //report is being updated so switch report form to edit mode
  const isEditMode = true;

  return (
    <Container className="displayContainer">
      <Row>
        <Col>
          <div className="pageTitle">
            <h1>Update a Record</h1>
          </div>
          <div className="pageText">
            <p>
              If you spot an error in a report, or if there is simply some
              information that you wish to change, please submit any ammendments
              through this form!
            </p>
          </div>
          <NewRecordForm id={reportID} isEditMode={isEditMode} />
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateReportForm;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

function FlaggedReportCard({ flag }) {
  const navigate = useNavigate();

  const onViewClick = () => {
    navigate(`/viewReport/${flag.reportFlagged._id}`);
  };

  const onUpdateClick = (e) => {
    e.preventDefault();
    //useNavigate() would not work in this instance, window.location.href
    //is here as a work around
    window.location.href = `/updateStatus/${flag._id}`;
  };

  return (
    <>
      <Card className="cardDisplay">
        <Card.Body>
          <Card.Title>Flagged by {flag.userName}</Card.Title>
          <Card.Text>
            {new Date(flag.createdAt).toLocaleString("en-US")}
            <br />
            Reason for flagging: {flag.reasonForFlag}
            <br />
            User comments: {flag.additionalInfo}
          </Card.Text>
          <Row>
            <Col>
              <Button variant="success" onClick={onViewClick}>
                View Report
              </Button>
            </Col>
            <Col>
              <Button variant="success" onClick={onUpdateClick}>
                Update Status
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default FlaggedReportCard;

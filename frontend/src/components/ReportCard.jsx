import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function ReportCard({ report }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/viewReport/${report._id}`);
  };

  return (
    <>
      <Card className="cardDisplay">
        <Card.Body>
          <Card.Img
            style={{ height: "250px" }}
            variant="top"
            src={report.reportImage.url}
          />
          <Card.Title>
            {new Date(report.createdAt).toLocaleString("en-US")}
          </Card.Title>
          <Card.Text>{report.reportTreeDescription}</Card.Text>
          <Button variant="success" onClick={onClick}>
            View Report
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ReportCard;

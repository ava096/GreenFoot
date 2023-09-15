import React from "react";
import { Card, Button } from "react-bootstrap";

function ReportCard({ report }) {
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
          <Button variant="success">View Report</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ReportCard;

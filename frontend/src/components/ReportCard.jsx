import React from "react";
import { Card, Button } from "react-bootstrap";

function ReportCard({ report }) {
  return (
    <>
      <Card>
        <Card.Body>
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

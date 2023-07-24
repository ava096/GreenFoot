import React from "react";
import { Card } from "react-bootstrap";

function ReportCard({ report }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {new Date(report.createdAt).toLocaleString("en-US")}
          </Card.Title>
          <Card.Text>{report.reportTreeDescription}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default ReportCard;

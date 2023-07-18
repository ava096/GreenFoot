import React from "react";
import { useDispatch } from "react-redux";
import { deleteReport } from "../features/reports/reportSlice";
import { Button, Card, SplitButton } from "react-bootstrap";

function UserReportCard({ report }) {
  const dispatch = useDispatch();

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{report.reportTreeType}</Card.Title>
          <Card.Text>
            Created : {new Date(report.createdAt).toLocaleString("en-US")}
          </Card.Text>
          <Button variant="success">See Report</Button>
          <button
            variant="success"
            className="close"
            onClick={() => dispatch(deleteReport(report._id))}
          >
            X
          </button>
        </Card.Body>
      </Card>
    </>
  );
}

export default UserReportCard;

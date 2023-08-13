import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function FlaggedReportCard({ flag }) {
  const navigate = useNavigate();

  const onViewClick = () => {
    navigate(`/viewReport/${flag.reportFlagged._id}`);
  };

  const onUpdateClick = (e) => {
    e.preventDefault();
    console.log("Clicked!");
    //useNavigate() would not work in this instance, window.location.href
    //is here as a work around
    window.location.href = `/updateStatus/${flag._id}`;
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Flagged by {flag.userName}</Card.Title>
          <Card.Text>
            {new Date(flag.createdAt).toLocaleString("en-US")}
            {"\n"}
            Reason for flagging: {flag.reasonForFlag}
          </Card.Text>
          <Button variant="success" onClick={onViewClick}>
            View Report
          </Button>
          <Button variant="success" onClick={onUpdateClick}>
            Update Status
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default FlaggedReportCard;

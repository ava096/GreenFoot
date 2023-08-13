import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function FlaggedReportCard({ flag }) {
  const navigate = useNavigate();

  const onViewClick = () => {
    navigate(`/viewReport/${flag.reportFlagged._id}`);
  };

  const onUpdateClick = () => {
    navigate(`updateStatus/${flag._id}`);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Flagged by {flag.userName}</Card.Title>
          <Card.Text>
            {new Date(flag.createdAt).toLocaleString("en-US")}
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

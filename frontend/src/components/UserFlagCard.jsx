import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function UserFlagCard({ flag }) {
  const navigate = useNavigate();

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (flag) {
      switch (flag.flagStatus) {
        case "pendingReview":
          setStatusMessage("Pending Review");
          break;
        case "resolved":
          setStatusMessage("Resolved");
          break;
        case "rejected":
          setStatusMessage("Rejected");
          break;
        default:
          setStatusMessage("Unknown");
          break;
      }
    }
  });

  const onViewClick = () => {
    navigate(`/viewReport/${flag.reportFlagged}`);
  };

  return (
    <>
      <Card className="cardDisplay">
        <Card.Body>
          <Card.Title>Status: {statusMessage}</Card.Title>
          <Card.Text>
            {new Date(flag.createdAt).toLocaleString("en-US")}
            <br />
            Reason for flagging: {flag.reasonForFlag}
            <br />
            Your comments: {flag.additionalInfo}
          </Card.Text>
          <Button variant="success" onClick={onViewClick}>
            View Report
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default UserFlagCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function UserFlagCard({ flag }) {
  const navigate = useNavigate();

  const onViewClick = () => {
    navigate(`/viewReport/${flag.reportFlagged._id}`);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Status: {flag.flagStatus}</Card.Title>
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { upvoteReport } from "../features/reports/reportSlice";
import { Button } from "react-bootstrap";
import AlertMessage from "./AlertMessage";

function UpvoteButton({ reportId, checkIfUserLoggedIn, onSuccessfulUpvote }) {
  //bring in dispatch for use
  const dispatch = useDispatch();

  // State setters for alert visibility and message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //event handler for upvoting
  const handleUpvote = async () => {
    if (checkIfUserLoggedIn()) {
      const action = await dispatch(upvoteReport(reportId));

      if (upvoteReport.rejected.match(action)) {
        setAlertMessage(action.payload);
        setShowAlert(true);
      } else if (onSuccessfulUpvote) {
        onSuccessfulUpvote();
      }
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleUpvote}>
        Upvote
      </Button>
      <AlertMessage
        show={showAlert}
        variant="warning"
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </>
  );
}

export default UpvoteButton;

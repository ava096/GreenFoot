import React from "react";
import { useDispatch } from "react-redux";
import { upvoteReport } from "../features/reports/reportSlice";
import { Button } from "react-bootstrap";

function UpvoteButton({ reportId, checkIfUserLoggedIn }) {
  //bring in dispatch for use
  const dispatch = useDispatch();

  //event handler for upvoting
  const handleUpvote = () => {
    if (checkIfUserLoggedIn()) {
      dispatch(upvoteReport(reportId));
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleUpvote}>
        Upvote
      </Button>
    </>
  );
}

export default UpvoteButton;

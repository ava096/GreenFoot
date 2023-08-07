import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function UpvoteButton() {
  //API request for upvote information
  const addUpvotes = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/reports/upvoteReport/:id"
    );
    return response.data;
  };
  return (
    <>
      <Button variant="Success" onClick={onClick}>
        Upvote
      </Button>
    </>
  );
}

export default UpvoteButton;

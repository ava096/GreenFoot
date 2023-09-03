import React from "react";
import { useDispatch } from "react-redux";
import { upvoteReport } from "../features/reports/reportSlice";
import { Button } from "react-bootstrap";
import AlertMessage from "./AlertMessage";

function UpvoteButton({ reportId, checkIfUserLoggedIn }) {
  //bring in dispatch for use
  const dispatch = useDispatch();

  // State setters for alert visibility and message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //event handler for upvoting
  const handleUpvote = () => {
    if (checkIfUserLoggedIn()) {
      dispatch(upvoteReport(reportId))
        // if user has already upvoted
        .catch((rejectedAction) => {
          if (rejectedAction.payload) {
            setAlertMessage(rejectedAction.payload);
            //show alert
            setShowAlert(true);
          }
        });
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

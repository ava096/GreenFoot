import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFlag, reset } from "../features/flags/flagSlice";
import { Form, Button, Col } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import AlertMessage from "./AlertMessage";

function FlagForm({ reportID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //set state for form data
  const [formData, setFormData] = useState({
    reasonForFlagging: "",
    additionalInfo: "",
  });

  //set state for alert
  const [showAlert, setShowAlert] = useState("");
  //set state for alert message
  const [alertMessage, setAlertMessage] = useState("");

  //imports from flagSlice
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.flag
  );

  //get user info
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //reset form if there's an error
    if (isError) {
      if (message) {
        setAlertMessage(message);
        setShowAlert(true);
      }

      dispatch(reset());
    }

    //redirect to dash if successful
    if (isSuccess) {
      user.userRole === "admin" ? navigate("/adminDash") : navigate("/dash");
    }
  }, [isError, isSuccess, user, navigate, dispatch]);

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //send info to database
  const handleSubmit = (e) => {
    e.preventDefault();

    //alert user if they are sending an empty submission
    if (!formData.reasonForFlagging || formData.reasonForFlagging === "") {
      setAlertMessage("Please provide information for all fields!");
      setShowAlert(true);
      return;
    }

    const flagData = {
      reasonForFlag: formData.reasonForFlagging,
      additionalInfo: formData.additionalInfo,
    };

    dispatch(createFlag(reportID, flagData));
  };

  if (isLoading) {
    return (
      <div className="spinnerContainer">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="flagForm">
      <Form.Select
        aria-label="flagDropdown"
        onChange={handleDropdownChange}
        value={formData.reasonForFlagging}
        className="reportSubmissionControl"
        name="reasonForFlagging"
      >
        <option>Please select a reason</option>
        <option value="inaccurate">Inaccurate information</option>
        <option value="spam">Spam</option>
        <option value="other">Other</option>
      </Form.Select>

      <Form.Group className="mb-3" controlId="flagTextArea">
        <Form.Label>Additional Information</Form.Label>
        <Form.Control
          className="reportSubmissionControl"
          as="textarea"
          rows={3}
          name="additionalInfo"
          placeholder="Please elaborate on your reason for flagging, particularly if you have selected 'Other'"
          value={formData.additionalInfo}
          onChange={handleDropdownChange}
        />
      </Form.Group>
      <Col>
        <div>
          <AlertMessage
            show={showAlert}
            variant="warning"
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        </div>
      </Col>
      <Col className="buttonCol">
        <Button type="submit" variant="success">
          Submit Flag
        </Button>
      </Col>
    </Form>
  );
}

export default FlagForm;

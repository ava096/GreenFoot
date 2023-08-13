import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFlag, reset } from "../features/flags/flagSlice";
import { Form, Button } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import AlertMessage from "./AlertMessage";

function UpdateFlagForm({ flagID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state setters for form data
  const [formData, setFormData] = useState({
    flagStatus: "",
    isHidden: false,
    adminComments: "",
  });
  //state setters for alert
  const [show, setShow] = useState(false);
  //state setters for alertMessage
  //allows a message for front and backend error
  const [alertMessage, setAlertMessage] = useState("");

  //imports from flagSlice
  const { isLoading, isError, isSuccess } = useSelector((state) => state.flag);

  //get user info
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //reset form if there's an error
    if (isError) {
      setAlertMessage("There was an error processing your request.");
      setShow(true);
      dispatch(reset());
    }

    //redirect to dash if successful
    if (isSuccess) {
      navigate("/adminDash");
    }
  }, [isError, isSuccess, user, navigate, dispatch]);

  //as user makes changes with form
  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;

    //handle change for switch slightly differently
    if (name === "isHidden") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      //handle change for other aspects of form data
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //send info to database
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for required fields
    if (!formData.flagStatus || formData.adminComments === "") {
      setAlertMessage("Please fill out all fields!");
      setShow(true);
      return;
    }

    dispatch(updateFlag({ id: flagID, flagData: formData }));
  };

  //onClose for error message
  const onClose = () => {
    setShow(false);
  };

  //spinner if loading
  if (isLoading) {
    return (
      <div className="spinnerContainer">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          aria-label="flagDropdown"
          onChange={handleFormChange}
          value={formData.flagStatus}
          name="flagStatus"
        >
          <option>Please select a reason</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </Form.Select>

        <Form.Check
          type="switch"
          label="Do you want to hide this report?"
          checked={formData.isHidden}
          name="isHidden"
          onChange={handleFormChange}
        />

        <Form.Group className="mb-3" controlId="flagTextArea">
          <Form.Label>Admin's Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="adminComments"
            placeholder="Please elaborate on the reasoning for your choice."
            value={formData.adminComments}
            onChange={handleFormChange}
          />
        </Form.Group>
        <AlertMessage
          dismissible
          show={show}
          variant="danger"
          message={alertMessage}
          onClose={onClose}
        />

        <Button type="submit" variant="success">
          Submit Flag
        </Button>
      </Form>
    </>
  );
}

export default UpdateFlagForm;

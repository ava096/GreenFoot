import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFlag, reset } from "../features/flags/flagSlice";
import { Form, Button } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";

function FlagForm({ reportID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //set state for form data
  const [formData, setFormData] = useState({
    reasonForFlagging: "",
    additionalInfo: "",
  });

  //imports from flagSlice
  const { isLoading, isError, isSuccess } = useSelector((state) => state.flag);

  //get user info
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //reset form if there's an error
    if (isError) {
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
      alert("Please select a reason for flagging!");
      return;
    }

    const flagData = {
      reasonForFlag: formData.reasonForFlagging,
      additionalInfo: formData.additionalInfo,
    };

    console.log(flagData);
    console.log(reportID);

    dispatch(createFlag({ id: reportID, flagData: flagData }));
  };

  if (isLoading) {
    return (
      <div className="spinnerContainer">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Select
        aria-label="flagDropdown"
        onChange={handleDropdownChange}
        value={formData.reasonForFlagging}
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
          as="textarea"
          rows={3}
          name="additionalInfo"
          placeholder="Please elaborate on your reason for flagging, particularly if you have selected 'Other'"
          value={formData.additionalInfo}
          onChange={handleDropdownChange}
        />
      </Form.Group>
      <Button type="submit" variant="success">
        Submit Flag
      </Button>
    </Form>
  );
}

export default FlagForm;

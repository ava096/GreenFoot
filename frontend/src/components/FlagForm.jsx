import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFlag } from "../features/flags/flagSlice";
import { Form } from "react-bootstrap";

function FlagForm() {
  return (
    <Form>
      {["checkbox"].map((type) => {
        <div key={`default-${type}`} className="mb-3">
          <Form.Check
            type={type}
            id={`default-${type}`}
            label="Information is innaccurate"
          />
          <Form.Check type={type} id={`default-${type}`} label="Spam" />
          <Form.Check type={type} id={`default-${type}`} label="Other" />

          <Form.Group className="mb-3" controlId="flagTextArea">
            <Form.Label>Additional Information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Please elaborate on your reason for flagging, particularly if you have selected 'Other'"
            />
          </Form.Group>
        </div>;
      })}
    </Form>
  );
}

export default FlagForm;

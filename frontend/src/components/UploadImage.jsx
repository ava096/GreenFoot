import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

function UploadImage({ onUpload }) {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    axios
      .post("http://localhost:8000/uploadImage/upload", formData)
      .then((res) => {
        onUpload(res.data.url);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Please upload an image of the tree.</Form.Label>
        <Form.Control type="file" onChange={uploadImage} />
      </Form.Group>
    </>
  );
}

export default UploadImage;

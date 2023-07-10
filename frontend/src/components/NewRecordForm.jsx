import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import UploadImage from "./UploadImage";

function NewRecordForm() {
  const [formData, setFormData] = useState({
    treeType: "",
    speciesType: "",
    species: "",
    age: "",
    description: "",
    surrounding: "",
    vigour: "",
    condition: "",
    diameter: "",
    radius: "",
    height: "",
    imageUrl: "",
  });

  const {
    treeType,
    speciesType,
    species,
    age,
    description,
    surrounding,
    vigour,
    condition,
    diameter,
    radius,
    height,
    imageUrl,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onImageUpload = (url) => {
    setFormData((prevState) => ({
      ...prevState,
      imageUrl: url,
    }));
  };

  return (
    <>
      <section className="form">
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formTreeType">
                <Form.Label>Where is this tree located?</Form.Label>
                <Form.Control
                  type="text"
                  name="treeType"
                  value={treeType}
                  placeholder="Eg. Park tree, street tree"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSpeciesType">
                <Form.Label>What species of tree is it?</Form.Label>
                <Form.Control
                  type="text"
                  name="speciesType"
                  value={speciesType}
                  placeholder="Eg. English Oak"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formSpecies">
                <Form.Label>
                  What is the scientific name for the species?
                </Form.Label>
                <Form.Control
                  type="text"
                  name="species"
                  value={species}
                  placeholder="Eg. Quercus robur"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formAge">
                <Form.Label>How old is this tree?</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={age}
                  placeholder="Eg. Juvenile, Mature, Snag"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formDescription">
                <Form.Label>Please give a visual description.</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  name="description"
                  value={description}
                  placeholder="Is there any damage to the tree? Is it flowering?"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formSurrounding">
                <Form.Label>
                  Describe the environmental context of the tree.
                </Form.Label>
                <Form.Control
                  type="text"
                  name="surrounding"
                  value={surrounding}
                  placeholder="Eg. Grass, concrete, bare ground"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formVigour">
                <Form.Label>Describe the vigour of the tree.</Form.Label>
                <Form.Control
                  type="text"
                  name="vigour"
                  value={vigour}
                  placeholder="Eg. High, fair, low"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formCondition">
                <Form.Label>How is the condition of the tree?</Form.Label>
                <Form.Control
                  type="text"
                  name="condition"
                  value={condition}
                  placeholder="Eg. Good, bad"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formDiameter">
                <Form.Label>Estimate the diameter of the tree (cm).</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="diameter"
                  value={diameter}
                  placeholder="Eg. 80"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formRadius">
                <Form.Label>Estimate the radius of the tree (m).</Form.Label>
                <Form.Control
                  type="text"
                  name="radius"
                  value={radius}
                  placeholder="Eg. 0.4"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formHeight">
                <Form.Label>Estimate the height of the tree (m).</Form.Label>
                <Form.Control
                  type="text"
                  name="height"
                  value={height}
                  placeholder="Eg. 1.5"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <UploadImage onUpload={onImageUpload} />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Button type="submit" className="customButton">
              Submit
            </Button>
          </Row>
        </Form>
      </section>
    </>
  );
}

export default NewRecordForm;

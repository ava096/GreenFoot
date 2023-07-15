import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import UploadImage from "./UploadImage";

function NewRecordForm() {
  const [formData, setFormData] = useState({
    reportTreeLocationType: "",
    reportTreeType: "",
    reportTreeScientificName: "",
    reportTreeAge: "",
    reportTreeDescription: "",
    reportTreeSurroundings: "",
    reportTreeVigour: "",
    reportTreeCondition: "",
    reportTreeDiameterCentimetres: "",
    reportTreeSpreadRadiusMetres: "",
    reportTreeHeightMetres: "",
    reportImageUrl: "",
  });

  const {
    reportTreeLocationType,
    reportTreeType,
    reportTreeScientificName,
    reportTreeAge,
    reportTreeDescription,
    reportTreeSurroundings,
    reportTreeVigour,
    reportTreeCondition,
    reportTreeDiameterCentimetres,
    reportTreeSpreadRadiusMetres,
    reportTreeHeightMetres,
    reportImageUrl,
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
      reportImageUrl: url,
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
                  name="reportTreeLocationType"
                  value={reportTreeLocationType}
                  placeholder="Eg. Park tree, street tree"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSpeciesType">
                <Form.Label>What type of tree is it?</Form.Label>
                <Form.Control
                  type="text"
                  name="reportTreeType"
                  value={reportTreeType}
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
                  name="reportTreeScientificName"
                  value={reportTreeScientificName}
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
                  name="reportTreeAge"
                  value={reportTreeAge}
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
                  name="reportTreeDescription"
                  value={reportTreeDescription}
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
                  name="reportTreeSurroundings"
                  value={reportTreeSurroundings}
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
                  name="reportTreeVigour"
                  value={reportTreeVigour}
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
                  name="reportTreeCondition"
                  value={reportTreeCondition}
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
                  name="reportTreeDiameterCentimetres"
                  value={reportTreeDiameterCentimetres}
                  placeholder="Eg. 80"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formRadius">
                <Form.Label>
                  Estimate the spread radius of the tree (m).
                </Form.Label>
                <Form.Control
                  type="text"
                  name="reportTreeSpreadRadiusMetres"
                  value={reportTreeSpreadRadiusMetres}
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
                  name="reportTreeHeightMetres"
                  value={reportTreeHeightMetres}
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

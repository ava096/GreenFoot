import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createReport } from "../features/reports/reportSlice";
import { Form, Button, Row, Col, Accordion } from "react-bootstrap";

function NewRecordForm({ treeID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state setters for form data to be provided by user
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
  });

  //state setter for URI provided by cloudinary
  const [uri, setUri] = useState(null);

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
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Make sure tree ID is included with form data
    let completeFormData = {
      ...formData,
      reportImage: uri,
      id: treeID,
    };

    console.log(completeFormData);

    dispatch(createReport(completeFormData));
    setFormData({
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
    });

    //set uri state back to null
    setUri(null);
    //navigate to dash to see submitted report
    navigate("/dash");
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    axios
      .post("http://localhost:8000/uploadImage/upload", { image: base64 })
      .then((res) => {
        setUri(res.data);
        console.log(uri);
      })
      .catch(console.log);
  };

  return (
    <>
      <section className="form">
        <Form onSubmit={onSubmit} className="reportSubmissionForm">
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeType"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      Where is the tree located?
                    </Accordion.Header>
                    <Accordion.Body>
                      We'd love some location context. Is this tree in the park?
                      Is it in the street? This will help us know where to look!
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeLocationType"
                  value={reportTreeLocationType}
                  placeholder="Garden tree"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formSpeciesType"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      What type of tree is it?
                    </Accordion.Header>
                    <Accordion.Body>
                      When we say type, we mean the name that this tree is
                      commonly known by. Think sycamore, horse chestnut - you'll
                      be surprised how much you actually know!
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeType"
                  value={reportTreeType}
                  placeholder="English Oak"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formSpecies"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      What is the scientific name for the species?
                    </Accordion.Header>
                    <Accordion.Body>
                      You might need to run to Google for this one. A scientific
                      name is the taxonomic name of an organism, consisting of
                      genus and species. In layman's terms, the English Oak is
                      referred to as Quercus robur.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeScientificName"
                  value={reportTreeScientificName}
                  placeholder="Populus tremula"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group controlId="formAge" className="reportSubmissionGroup">
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      How old is this tree?
                    </Accordion.Header>
                    <Accordion.Body>
                      You don't have to tell us in years. We want to know what
                      stage of growth this tree is at. For example, a juvenile
                      tree is when the tree is generally around a meter tall,
                      but not producing any fruit or flowers. A fully mature
                      tree is able to do these things. Each tree has its own
                      length of life cycle, too.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeAge"
                  value={reportTreeAge}
                  placeholder="Mature"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formDescription"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      Please give a visual description.
                    </Accordion.Header>
                    <Accordion.Body>
                      Tell us what we need to know that you might not capture in
                      a photo. Is the tree flowering? Is there any damage? Has
                      any wildlife made its home there? This will help us to
                      gather more context for the health and condition for the
                      tree, and also its relationship with the world around it.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  as="textarea"
                  style={{ height: "100px" }}
                  name="reportTreeDescription"
                  value={reportTreeDescription}
                  placeholder="Is there any fruit? Any broken branches?"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formSurrounding"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      Describe the environmental context.
                    </Accordion.Header>
                    <Accordion.Body>
                      Tell us a little more about where this tree is growing. Is
                      it surrounded by grass, or growing through the pavement?
                      This can give us some more clues as to the condition of
                      the tree, and why it might be doing well or not so well.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeSurroundings"
                  value={reportTreeSurroundings}
                  placeholder="Bare ground"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formVigour"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      Describe the vigour of the tree.
                    </Accordion.Header>
                    <Accordion.Body>
                      In scientific terms, this is a measure of health or
                      hardiness. In a botanical context like this, we mean a
                      measure of the increase in plant groweth or foliage volume
                      through time after planting.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeVigour"
                  value={reportTreeVigour}
                  placeholder="High, fair, low"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formCondition"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      How is the condition of the tree
                    </Accordion.Header>
                    <Accordion.Body>
                      This tells us more about the health or safety of trees,
                      and refers to defects like disease or decay.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeCondition"
                  value={reportTreeCondition}
                  placeholder="Good, poor"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formDiameter"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      Estimate the diameter of the tree (cm)
                    </Accordion.Header>
                    <Accordion.Body>
                      The diameter is the width of the tree - imagine drawing a
                      straight line from one side of the trunk to the other,
                      passing through the centre. Please give us your answer in
                      centimetres.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeDiameterCentimetres"
                  value={reportTreeDiameterCentimetres}
                  placeholder="80"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formRadius"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      Estimate the spread radius of the tree (m).
                    </Accordion.Header>
                    <Accordion.Body>
                      Take a look at the tree's crown - that is, the branches!
                      This measures the length of branches spreading out from
                      the trunk at the widest point. If you multiply this by
                      two, you'll get the diameter of the spread. Don't worry
                      about being perfectly accurate, your best guess is fine!
                      Please provide your answer in metres.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeSpreadRadiusMetres"
                  value={reportTreeSpreadRadiusMetres}
                  placeholder="4"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formHeight"
                className="reportSubmissionGroup"
              >
                <Accordion className="reportAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="reportAccordionHeader">
                      Estimate the height of the tree (m)
                    </Accordion.Header>
                    <Accordion.Body>
                      How tall is that tree? This information can help us track
                      a tree's growth over time. Please give us your answer in
                      metres.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Control
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeHeightMetres"
                  value={reportTreeHeightMetres}
                  placeholder="1.5"
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formImage"
                className="reportSubmissionGroup"
              >
                <Form.Label>Please Upload an Image</Form.Label>
                <Form.Control
                  type="file"
                  className="reportSubmissionControl"
                  name="reportImage"
                  onChange={uploadImage}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="paddedRow">
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

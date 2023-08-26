import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewTree } from "../features/trees/treeSlice";
import { Form, Button, Row, Col, Accordion } from "react-bootstrap";

function NewTreeForm({ currentLocation }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [treeData, setTreeData] = useState({
    treeLocationType: "",
    treeType: "",
    treeScientificName: "",
    treeAge: "",
    treeDescription: "",
    treeSurroundings: "",
    treeVigour: "",
    treeCondition: "",
    treeDiameterCentimetres: "",
    treeSpreadRadiusMetres: "",
    treeHeightMetres: "",
  });

  // errors for form data validation
  const [errors, setErrors] = useState({});

  //Grab user info
  const { user } = useSelector((state) => state.auth);

  const {
    treeLocationType,
    treeType,
    treeScientificName,
    treeAge,
    treeDescription,
    treeSurroundings,
    treeVigour,
    treeCondition,
    treeDiameterCentimetres,
    treeSpreadRadiusMetres,
    treeHeightMetres,
    location,
  } = treeData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setTreeData({
      ...treeData,
      [name]: value,
    });
  };

  useEffect(() => {
    setTreeData((prevTreeData) => ({
      ...prevTreeData,
      location: {
        type: "Point",
        coordinates: [currentLocation.latitude, currentLocation.longitude],
      },
    }));
  }, [currentLocation]);

  // function for error checking each field
  const validate = () => {
    const newErrors = {};

    if (!treeLocationType) {
      newErrors.treeLocationType = "Please provide information!";
    }

    if (!treeType) {
      newErrors.treeType = "Please provide information!";
    }

    if (!treeScientificName) {
      newErrors.treeScientificName = "Please provide information!";
    }

    if (!treeAge) {
      newErrors.treeAge = "Please provide information!";
    }

    if (!treeDescription) {
      newErrors.treeDescription = "Please provide information!";
    }

    if (!treeSurroundings) {
      newErrors.treeSurroundings = "Please provide information!";
    }

    if (!treeVigour) {
      newErrors.treeVigour = "Please provide information!";
    }

    if (!treeCondition) {
      newErrors.treeCondition = "Please provide information!";
    }

    if (isNaN(treeDiameterCentimetres)) {
      newErrors.treeDiameterCentimetres = "Please enter a number!";
    }

    if (isNaN(treeSpreadRadiusMetres)) {
      newErrors.treeSpreadRadiusMetres = "Please enter a number!";
    }

    if (isNaN(treeHeightMetres)) {
      newErrors.treeHeightMetres = "Please enter a number!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //run validation
    if (!validate()) {
      return;
    }

    dispatch(addNewTree(treeData));

    {
      user.userRole === "admin" ? navigate("/adminDash") : navigate("/dash");
    }
  };

  return (
    <>
      <section className="form">
        <Form onSubmit={onSubmit} className="reportSubmissionForm">
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeLocationType"
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
                  isInvalid={errors.treeLocationType}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeLocationType"
                  value={treeLocationType}
                  placeholder="Garden tree"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeLocationType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeType"
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
                  isInvalid={errors.treeType}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeType"
                  value={treeType}
                  placeholder="English Oak"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formScientificName"
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
                  isInvalid={errors.treeScientificName}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeScientificName"
                  value={treeScientificName}
                  placeholder="Populus tremula"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeScientificName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeAge"
                className="reportSubmissionGroup"
              >
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
                  isInvalid={errors.treeAge}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeAge"
                  value={treeAge}
                  placeholder="Mature"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeAge}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeDescription"
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
                  isInvalid={errors.treeDescription}
                  className="reportSubmissionControl"
                  as="textarea"
                  style={{ height: "100px" }}
                  name="treeDescription"
                  value={treeDescription}
                  placeholder="Is there any fruit? Any broken branches?"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeDescription}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeSurroundings"
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
                  isInvalid={errors.treeSurroundings}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeSurroundings"
                  value={treeSurroundings}
                  placeholder="Bare ground"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeSurroundings}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeVigour"
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
                  isInvalid={errors.treeVigour}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeVigour"
                  value={treeVigour}
                  placeholder="High, fair, low"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeVigour}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeCondition"
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
                  isInvalid={errors.treeCondition}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeCondition"
                  value={treeCondition}
                  placeholder="Good, poor"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeCondition}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeDiameterCentimetres"
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
                  isInvalid={errors.treeDiameterCentimetres}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeDiameterCentimetres"
                  value={treeDiameterCentimetres}
                  placeholder="80"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeDiameterCentimetres}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="reportSubmissionRow">
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeSpreadRadiusMetres"
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
                  isInvalid={errors.treeSpreadRadiusMetres}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeSpreadRadiusMetres"
                  value={treeSpreadRadiusMetres}
                  placeholder="4"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeSpreadRadiusMetres}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="reportSubmissionCol">
              <Form.Group
                controlId="formTreeHeightMetres"
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
                  isInvalid={errors.treeHeightMetres}
                  className="reportSubmissionControl"
                  type="text"
                  name="treeHeightMetres"
                  value={treeHeightMetres}
                  placeholder="1.5"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.treeHeightMetres}
                </Form.Control.Feedback>
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

export default NewTreeForm;

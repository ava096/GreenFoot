import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createReport, updateReport } from "../features/reports/reportSlice";
import { Form, Button, Row, Col, Accordion } from "react-bootstrap";

function NewReportForm({ id, isEditMode }) {
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

  //state setters for image upload status to prevent form from being submitted with incomplete form data
  const [uploadingImage, setUploadingImage] = useState(false);

  // errors for form data validation
  const [errors, setErrors] = useState({});

  //Grab user info
  const { user } = useSelector((state) => state.auth);

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

  //if in edit mode, load the pre-existing data to populate formData
  useEffect(() => {
    if (isEditMode && id) {
      //Fetch existing data with axios
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/reports/report/${id}`
          );

          setFormData(response.data);
        } catch (error) {
          console.error("An error occured while fetching report: ", error);
        }
      };
      fetchData();
    }
  }, [isEditMode, id]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //run validation
    if (!validate()) {
      return;
    }

    // Make sure the right ID is included with form data along with image URI
    let completeFormData = {
      ...formData,
      //decide on the ID to use depending on the mode set
      ...(isEditMode ? { reportID: id } : { treeID: id }),
    };

    // Only include the reportImage field if uri is not null
    if (uri) {
      completeFormData.reportImage = uri;
    }

    if (isEditMode) {
      console.log("ID inside NewRecordForm:", id);
      //update report if in edit mode
      dispatch(updateReport({ id, reportData: completeFormData }));

      //reset form data
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
      //navigate to report to see the updates
      navigate(`/viewReport/${id}`);
    } else {
      //create report if not in edit mode
      dispatch(createReport(completeFormData));

      //reset form data
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
      {
        user.userRole === "admin" ? navigate("/adminDash") : navigate("/dash");
      }
    }
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
    setUploadingImage(true);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    axios
      .post("http://localhost:8000/uploadImage/upload", { image: base64 })
      .then((res) => {
        setUri({ url: res.data.url, public_id: res.data.public_id });
        setUploadingImage(false);
      })
      .catch(console.log);
  };

  // function for error checking each field
  const validate = () => {
    const newErrors = {};

    if (!reportTreeLocationType) {
      newErrors.reportTreeLocationType = "Please provide information!";
    }

    if (!reportTreeType) {
      newErrors.reportTreeType = "Please provide information!";
    }

    if (!reportTreeScientificName) {
      newErrors.reportTreeScientificName = "Please provide information!";
    }

    if (!reportTreeAge) {
      newErrors.reportTreeAge = "Please provide information!";
    }

    if (!reportTreeDescription) {
      newErrors.reportTreeDescription = "Please provide information!";
    }

    if (!reportTreeSurroundings) {
      newErrors.reportTreeSurroundings = "Please provide information!";
    }

    if (!reportTreeVigour) {
      newErrors.reportTreeVigour = "Please provide information!";
    }

    if (!reportTreeCondition) {
      newErrors.reportTreeCondition = "Please provide information!";
    }

    if (isNaN(reportTreeDiameterCentimetres)) {
      newErrors.reportTreeDiameterCentimetres = "Please enter a number!";
    }

    if (isNaN(reportTreeSpreadRadiusMetres)) {
      newErrors.reportTreeSpreadRadiusMetres = "Please enter a number!";
    }

    if (isNaN(reportTreeHeightMetres)) {
      newErrors.reportTreeHeightMetres = "Please enter a number!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
                <Form.Select
                  aria-label="Default select example"
                  isInvalid={errors.reportTreeLocationType}
                  className="reportSubmissionControl"
                  name="reportTreeLocationType"
                  value={reportTreeLocationType}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Select location type
                  </option>
                  <option value="Park Tree">Park Tree</option>
                  <option value="Street Tree">Street Tree</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeLocationType}
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
                  isInvalid={errors.reportTreeType}
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeType"
                  value={reportTreeType}
                  placeholder="English Oak"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeType}
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
                  isInvalid={errors.reportTreeScientificName}
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeScientificName"
                  value={reportTreeScientificName}
                  placeholder="Populus tremula"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeScientificName}
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
                <Form.Select
                  aria-label="Default select example"
                  isInvalid={errors.reportTreeAge}
                  className="reportSubmissionControl"
                  name="reportTreeAge"
                  value={reportTreeAge}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Select Tree Age
                  </option>
                  <option value="Juvenile">Juvenile</option>
                  <option value="Young">Young</option>
                  <option value="Young Mature">Young Mature</option>
                  <option value="Semi-Mature">Semi-Mature</option>
                  <option value="Mature">Mature</option>
                  <option value="Fully Mature">Fully Mature</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeAge}
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
                  isInvalid={errors.reportTreeDescription}
                  className="reportSubmissionControl"
                  as="textarea"
                  style={{ height: "100px" }}
                  name="reportTreeDescription"
                  value={reportTreeDescription}
                  placeholder="Is there any fruit? Any broken branches?"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeDescription}
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
                  isInvalid={errors.reportTreeSurroundings}
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeSurroundings"
                  value={reportTreeSurroundings}
                  placeholder="Bare ground"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeSurroundings}
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
                      measure of the increase in plant growth or foliage volume
                      through time after planting.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Select
                  aria-label="Default select example"
                  isInvalid={errors.reportTreeVigour}
                  className="reportSubmissionControl"
                  name="reportTreeVigour"
                  value={reportTreeVigour}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Select Vigour
                  </option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeVigour}
                </Form.Control.Feedback>
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
                <Form.Select
                  aria-label="Default select example"
                  isInvalid={errors.reportTreeCondition}
                  className="reportSubmissionControl"
                  name="reportTreeCondition"
                  value={reportTreeCondition}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Select Tree Condition
                  </option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Very Poor">Very Poor</option>
                  <option value="Dying">Dying</option>
                  <option value="Dead">Dead</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeCondition}
                </Form.Control.Feedback>
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
                  isInvalid={errors.reportTreeDiameterCentimetres}
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeDiameterCentimetres"
                  value={reportTreeDiameterCentimetres}
                  placeholder="80"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeDiameterCentimetres}
                </Form.Control.Feedback>
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
                  isInvalid={errors.reportTreeSpreadRadiusMetres}
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeSpreadRadiusMetres"
                  value={reportTreeSpreadRadiusMetres}
                  placeholder="4"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeSpreadRadiusMetres}
                </Form.Control.Feedback>
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
                  isInvalid={errors.reportTreeHeightMetres}
                  className="reportSubmissionControl"
                  type="text"
                  name="reportTreeHeightMetres"
                  value={reportTreeHeightMetres}
                  placeholder="1.5"
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportTreeHeightMetres}
                </Form.Control.Feedback>
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
            <Button
              type="submit"
              className="customButton"
              disabled={uploadingImage}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </section>
    </>
  );
}

export default NewReportForm;

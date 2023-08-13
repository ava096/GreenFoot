import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateReport, deleteReport } from "../features/reports/reportSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";
import UpvoteButton from "../components/UpvoteButton";
import { FaTriangleExclamation, FaCheck } from "react-icons/fa6";

function ViewReport() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state setter for the modal that will ask for user confirmation of actions
  const [showModal, setShowModal] = useState(false);
  //state setter to re-render page when admin approves record
  const [updateKey, setUpdateKey] = useState(0);

  //Get logged in user info
  const { user } = useSelector((state) => state.auth);

  //report id
  const { id } = useParams();

  //axios request to get info from selected report
  const getReport = async () => {
    try {
      const reportResponse = await axios.get(
        `http://localhost:8000/api/reports/report/${id}`
      );
      return reportResponse.data;
    } catch (error) {
      throw error;
    }
  };

  //axios request to get info from tree associated with report
  //request needs treeId from first request to get report data
  const getTree = async (treeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/trees/${treeId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //useQuery for report
  const {
    isLoading: reportLoading,
    error: reportError,
    data: reportData,
  } = useQuery(["report", id, updateKey], getReport);

  //useQuery for tree
  //reportData?.tree passed to ensure the tree is unique
  //enabled set to !!reportData and so will not run until this data is defined
  const {
    isLoading: treeLoading,
    error: treeError,
    data: treeData,
  } = useQuery(
    ["tree", reportData?.tree, updateKey],
    () => getTree(reportData.tree),
    {
      enabled: !!reportData,
    }
  );

  if (reportLoading || treeLoading) {
    return <LoadingSpinner />;
  }

  if (reportError) {
    return <h3>An error occured: {reportError.message}</h3>;
  }

  if (treeError) {
    return <h3>An error occured: {treeError.message}</h3>;
  }

  //will set a report's moderated status to true
  const onClick = () => {
    dispatch(
      updateReport({
        id: reportData._id,
        reportData: { isModerated: true },
      })
      //refresh to reflect change
    ).then(() => setUpdateKey((prevKey) => prevKey + 1));
  };

  //triggered when 'Delete Report' is clicked
  const onDeleteClick = () => {
    setShowModal(true);
  };

  //triggered when 'Update Report' is clicked
  const onUpdateClick = () => {
    navigate(`/updateReport/${reportData._id}`);
  };

  //redirects user to flagging page
  const onFlagClick = (e) => {
    e.preventDefault();
    navigate(`/flagReport/${reportData._id}`);
  };

  //triggered when user confirms deletion through modal
  const handleDelete = () => {
    setShowModal(false);
    dispatch(deleteReport(reportData._id));
    navigate(`/viewTree/${reportData.tree}`);
  };

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>{treeData.treeType}</h2>
          </Col>
          <Col className="textDisplay">
            <p>
              <em>{treeData.treeScientificName}</em>
            </p>
          </Col>
        </Row>
        <Row>
          <img
            src={reportData.reportImage.url}
            alt={`Image of ${treeData.treeType}`}
          />
        </Row>
        <Row>
          <Col className="textDisplay">
            <div>
              {reportData.isModerated === false ? (
                <p>
                  <FaTriangleExclamation /> Please note that this report is
                  unmoderated and therefore information may be inaccurate.
                </p>
              ) : (
                <p>
                  <FaCheck /> This report has been approved by an admin
                </p>
              )}
              <p>
                <strong>Description</strong>
              </p>
              <p>{reportData.reportTreeDescription}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <p>
                <strong>Age:</strong> {reportData.reportTreeAge}
              </p>
              <p>
                <strong>Surroundings:</strong>{" "}
                {reportData.reportTreeSurroundings}
              </p>
              <p>
                <strong>Condition:</strong> {reportData.reportTreeCondition}
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <p>
                <strong>Diameter:</strong>{" "}
                {reportData.reportTreeDiameterCentimetres}cm
              </p>
              <p>
                <strong>Spread Radius:</strong>{" "}
                {reportData.reportTreeSpreadRadiusMetres}m
              </p>
              <p>
                <strong>Height:</strong> {reportData.reportTreeHeightMetres}m
              </p>
            </div>
          </Col>
        </Row>
        {user.userRole === "admin" || user.id === reportData.user ? (
          <Row>
            <Col>
              {reportData.isModerated === false ? (
                <Button variant="success" onClick={onClick}>
                  Approve Report
                </Button>
              ) : null}
              <Button variant="success" onClick={onDeleteClick}>
                Delete Report
              </Button>
              {user.userRole === "admin" || user.id === reportData.user ? (
                <Button variant="success" onClick={onUpdateClick}>
                  Update Report
                </Button>
              ) : null}
            </Col>
          </Row>
        ) : null}
        <ConfirmModal
          show={showModal}
          title="Delete Report?"
          message="Are you sure you want to delete this report? Once deleted, you will be unable to recover it."
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      </Container>
      <Row className="titleRow">
        <Col className="textDisplay">
          <h5>Like This Report?</h5>
          <p>
            We use reports as a way to guide us in keeping our information as
            accurate and up-to-date as possible. If you think this report
            contains valuable information, let us know with an upvote.
          </p>
        </Col>
        <Col>
          <UpvoteButton reportId={id} />
        </Col>
        <Col>
          <p>{reportData.upvoteCount || 0} Upvotes</p>
        </Col>
      </Row>
      <Row className="titleRow">
        <Col className="textDisplay">
          <h5>See a Problem?</h5>
          <p>
            If there is a problem with this report, such as any inaccuracies or
            junk data, please let us know.
          </p>
        </Col>
        <Col>
          <Button variant="success" onClick={onFlagClick}>
            Flag Report
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ViewReport;

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";

function ViewReport() {
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
  } = useQuery(["report", id], getReport);

  //useQuery for tree
  //reportData?.tree passed to ensure the tree is unique
  //enabled set to !!reportData and so will not run until this data is defined
  const {
    isLoading: treeLoading,
    error: treeError,
    data: treeData,
  } = useQuery(["tree", reportData?.tree], () => getTree(reportData.tree), {
    enabled: !!reportData,
  });

  if (reportLoading || treeLoading) {
    return <LoadingSpinner />;
  }

  if (reportError || treeError) {
    return <h3>An error occured: {error.message}</h3>;
  }

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>{treeData.treeType}</h2>
          </Col>
          <Col className="textDisplay">
            <p>
              <i>{treeData.treeScientificName}</i>
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
            <p>{reportData.reportTreeDescription}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewReport;

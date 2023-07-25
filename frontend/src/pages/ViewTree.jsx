import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import TreeDataTableDisplay from "../components/TreeDataTableDisplay";
import ReportCard from "../components/ReportCard";

function ViewTree() {
  const { id } = useParams();

  //Request to get info associated with selected tree
  const getTree = async () => {
    const response = await axios.get(`http://localhost:8000/api/trees/${id}`);
    const locationResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${response.data.location.coordinates
        .slice()
        .reverse()
        .join(",")}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    response.data.locationName =
      locationResponse.data.results[0].formatted_address;
    return response.data;
  };

  //Request to get reports associated with selected tree
  const getReports = async () => {
    const treeResponse = await axios.get(
      `http://localhost:8000/api/reports/treeReports/${id}`
    );

    return treeResponse.data;
  };

  //useQuery for info associated with specific tree
  const { isLoading, error, data } = useQuery(["tree", id], getTree);

  //useQuery for reports associated with specific tree
  const {
    isLoading: reportsLoading,
    error: reportsError,
    data: reportsData,
  } = useQuery(["reports", id], getReports);

  if (isLoading || reportsLoading) {
    return <LoadingSpinner />;
  }

  if (reportsError) {
    return <h3>An error occured: {reportsError.message}</h3>;
  }

  if (error) {
    return <h3>An error occured: {error.message}</h3>;
  }

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>{data.treeType}</h2>
          </Col>
          <Col className="textDisplay">
            <p style={{ textAlign: "center" }}>
              <i>Located at {data.locationName}</i>
            </p>
          </Col>
        </Row>
        <Row>
          <TreeDataTableDisplay key={data._id} tree={data} />
        </Row>
        <Row>
          <Col>
            <p>
              <i>
                This record was last updated at :{"  "}
                {new Date(data.updatedAt).toLocaleString("en-US")}
              </i>
            </p>
          </Col>
        </Row>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>Reports for this tree</h2>
          </Col>
          <Col>
            {reportsData.length > 0 ? (
              <div className="cardDiv">
                {reportsData.map((reportsData) => (
                  <ReportCard key={reportsData._id} report={reportsData} />
                ))}
              </div>
            ) : (
              <h3>There are no reports for this tree yet!</h3>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewTree;

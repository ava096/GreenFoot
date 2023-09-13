import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import TreeDataTableDisplay from "../components/TreeDataTableDisplay";
import ReportCard from "../components/ReportCard";
import ViewTreeMap from "../components/ViewTreeMap";
import AlertMessage from "../components/AlertMessage";

function ViewTree() {
  //tree id
  const { id } = useParams();
  //for showing level of concern
  const [alertMessage, setAlertMessage] = useState("");
  //for setting colour variant
  const [variant, setVariant] = useState("primary");

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

  useEffect(() => {
    if (data) {
      switch (data.levelOfConcern) {
        case "Green":
          setAlertMessage(
            "This tree's level of concern is GREEN. However, we would love to make sure that the information we have is as accurate as possible. Please consider making a new report if you see this tree, and tell us how it's doing!"
          );
          setVariant("success");
          break;
        case "Yellow":
          setAlertMessage(
            "This tree's level of concern is YELLOW. This record is missing some information, most likely the specific name of the species. Can you help us identify exactly what kind of tree this is?"
          );
          setVariant("warning");
          break;
        case "Amber":
          setAlertMessage(
            "This tree's level of concern is AMBER. We're missing quite a bit of information on it. Can you help us fill in the missing fields?"
          );
          setVariant("custom-amber");
          break;
        case "Red":
          setAlertMessage(
            "This tree's level of concern is RED. It is missing valuable information that would greatly improve its reliability. Please help us improve this record."
          );
          setVariant("danger");
          break;
        default:
          setAlertMessage("No information found for level of concern.");
          setVariant("primary");
          break;
      }
    }
  }, [data]);

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
      <Container className="displayContainer">
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
          <Col className="textDisplay">
            <div>
              <ViewTreeMap location={data.location} />
            </div>
          </Col>
        </Row>
        <Row>
          <div className="textDisplay" style={{ paddingTop: "15px" }}>
            <h2>Tree Record</h2>
            <p>Here's all the information we have on this tree.</p>
          </div>
          <div className="scrollableContainer">
            <TreeDataTableDisplay key={data._id} tree={data} />
          </div>
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
            <div>
              <AlertMessage
                show={true}
                variant={variant}
                message={alertMessage}
              />
            </div>
          </Col>
        </Row>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>Reports for this tree</h2>
          </Col>
          <Col>
            {reportsData.length > 0 ? (
              <div className="cardDiv">
                {reportsData.map(
                  (reportsData) =>
                    !reportsData.isHidden && (
                      <ReportCard key={reportsData._id} report={reportsData} />
                    )
                )}
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

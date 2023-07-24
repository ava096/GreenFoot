import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";

function ViewTree() {
  const { id } = useParams();

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

  const { isLoading, error, data } = useQuery(["tree", id], getTree);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <h3>An error occured: ${error.message}</h3>;
  }

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>{data.treeType}</h2>
          </Col>
          <Col className="textDisplay">
            <p>
              <i>Located at {data.locationName}</i>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewTree;

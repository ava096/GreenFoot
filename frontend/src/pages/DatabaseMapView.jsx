import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import TreeDataMap from "../components/TreeDataMap";
import LoadingSpinner from "../components/LoadingSpinner";
import { Container, Row, Col } from "react-bootstrap";

function DatabaseMapView() {
  //API call to get trees from database
  const getTrees = async () => {
    const response = await axios.get("http://localhost:8000/api/trees");

    return response.data;
  };

  //Query the database, so data can be passed as props
  const { isLoading, error, data } = useQuery("trees", getTrees);

  //if loading, display loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Container className="displayContainer">
        <Row>
          <Col className="textDisplay">
            <div>
              <h1>Map View</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="textDisplay">
            <div>
              <p>
                This map provides a cartographic representation of the trees
                within our database. Explore the distribution of trees in the
                Belfast area with the heatmap view, or toggle the markers to
                allow you to view specific trees and their details.
              </p>
            </div>
          </Col>
        </Row>
        <TreeDataMap trees={data} />
      </Container>
    </>
  );
}

export default DatabaseMapView;

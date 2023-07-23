import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Container, Col, Row } from "react-bootstrap";
import TreeCard from "../components/TreeCard";
import LoadingSpinner from "../components/LoadingSpinner";

function ViewAllTrees() {
  const getTrees = async () => {
    const response = await axios.get("http://localhost:8000/api/trees");
    return response.data;
  };

  const { isLoading, error, data } = useQuery("trees", getTrees);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) return `An error occurred: ${error.message}`;

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h1>All Trees</h1>
          </Col>
        </Row>
        <Row>
          <Col className="textDisplay">
            <p>
              Below are all trees currently existing in our database. Click an
              individual record to view its current information and report
              history.
            </p>
          </Col>
        </Row>
        <Row className="cardRow">
          {data &&
            data.map((tree) => (
              <Col sm={12} md={6} lg={3} className="cardCol" key={tree._id}>
                <TreeCard tree={tree} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default ViewAllTrees;

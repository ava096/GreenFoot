import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import TreeDropdown from "./TreeDropdown";

function TreeDataSelector() {
  return (
    <>
      <Container>
        <Row className="selectorRow">
          <Col>
            <TreeDropdown label="Tree Type" dataKey="treeType" />
          </Col>
          <Col>
            <TreeDropdown label="Species" dataKey="speciesType" />
          </Col>
          <Col>
            <TreeDropdown label="Scientific Name" dataKey="species" />
          </Col>
        </Row>
        <Row className="selectorRow">
          <Col>
            <TreeDropdown label="Age" dataKey="age" />
          </Col>
          <Col>
            <TreeDropdown label="Surroundings" dataKey="treeSurround" />
          </Col>
          <Col>
            <TreeDropdown label="Vigour" dataKey="vigour" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TreeDataSelector;

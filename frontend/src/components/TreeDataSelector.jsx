import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TreeDropdown from "./TreeDropdown";
import axios from "axios";

function TreeDataSelector({ onFiltersChange }) {
  //state setters for filters
  const [treeType, setTreeType] = useState(null);
  const [speciesType, setSpeciesType] = useState(null);
  const [species, setSpecies] = useState(null);
  const [age, setAge] = useState(null);
  const [treeSurround, setTreeSurround] = useState(null);
  const [vigour, setVigour] = useState(null);
  const [condition, setCondition] = useState(null);
  const [diameter, setDiameter] = useState(null);
  const [radius, setRadius] = useState(null);
  const [height, setHeight] = useState(null);
  //state setter for storing results
  const [results, setResults] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    onFiltersChange({
      treeType: treeType,
      speciesType: speciesType,
      species: species,
      age: age,
      treeSurround: treeSurround,
      vigour: vigour,
      condition: condition,
      diameterCentimetres: diameter,
      radiusMetres: radius,
      treeHeightMetres: height,
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Container>
          <Row className="selectorRow">
            <Col>
              <TreeDropdown
                label="Location"
                dataKey="treeType"
                onSelect={setTreeType}
              />
            </Col>
            <Col>
              <TreeDropdown
                label="Species"
                dataKey="speciesType"
                onSelect={setSpeciesType}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col>
              <TreeDropdown
                label="Scientific Name"
                dataKey="species"
                onSelect={setSpecies}
              />
            </Col>
            <Col>
              <TreeDropdown label="Age" dataKey="age" onSelect={setAge} />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col>
              <TreeDropdown
                label="Surroundings"
                dataKey="treeSurround"
                onSelect={setTreeSurround}
              />
            </Col>
            <Col>
              <TreeDropdown
                label="Vigour"
                dataKey="vigour"
                onSelect={setVigour}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col>
              <TreeDropdown
                label="Condition"
                dataKey="condition"
                onSelect={setCondition}
              />
            </Col>
            <Col>
              <TreeDropdown
                label="Diameter (cm)"
                dataKey="diameterCentimetres"
                onSelect={setDiameter}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col>
              <TreeDropdown
                label="Radius (m)"
                dataKey="radiusMetres"
                onSelect={setRadius}
              />
            </Col>
            <Col>
              <TreeDropdown
                label="Height (m)"
                dataKey="treeHeightMetres"
                onSelect={setHeight}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Button type="submit" className="customButton">
              Search
            </Button>
          </Row>
        </Container>
      </Form>
    </>
  );
}

export default TreeDataSelector;

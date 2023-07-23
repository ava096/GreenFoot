import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TreeDropdown from "./TreeDropdown";

function TreeDataSelector({ onFiltersChange }) {
  //state setters for filters
  const [treeLocationType, setTreeLocationType] = useState(null);
  const [treeType, setTreeType] = useState(null);
  const [treeScientificName, setTreeScientificName] = useState(null);
  const [treeAge, setTreeAge] = useState(null);
  const [treeSurroundings, setTreeSurroundings] = useState(null);
  const [treeVigour, setTreeVigour] = useState(null);
  const [treeCondition, setTreeCondition] = useState(null);
  const [treeDiameterCentimetres, setTreeDiameterCentimetres] = useState(null);
  const [treeSpreadRadiusMetres, setTreeSpreadRadiusMetres] = useState(null);
  const [treeHeightMetres, setTreeHeightMetres] = useState(null);
  //state setter for storing results
  const [results, setResults] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    onFiltersChange({
      treeLocationType: treeLocationType,
      treeType: treeType,
      treeScientificName: treeScientificName,
      treeAge: treeAge,
      treeSurroundings: treeSurroundings,
      treeVigour: treeVigour,
      treeCondition: treeCondition,
      treeDiameterCentimetres: treeDiameterCentimetres,
      treeSpreadRadiusMetres: treeSpreadRadiusMetres,
      treeHeightMetres: treeHeightMetres,
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Container>
          <Row className="selectorRow">
            <Col className="selectorCol">
              <TreeDropdown
                label="Location Type"
                dataKey="treeLocationType"
                onSelect={setTreeLocationType}
              />
            </Col>
            <Col className="selectorCol">
              <TreeDropdown
                label="Tree Type"
                dataKey="treeType"
                onSelect={setTreeType}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col className="selectorCol">
              <TreeDropdown
                label="Scientific Name"
                dataKey="treeScientificName"
                onSelect={setTreeScientificName}
              />
            </Col>
            <Col className="selectorCol">
              <TreeDropdown
                label="Age"
                dataKey="treeAge"
                onSelect={setTreeAge}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col className="selectorCol">
              <TreeDropdown
                label="Surroundings"
                dataKey="treeSurroundings"
                onSelect={setTreeSurroundings}
              />
            </Col>
            <Col className="selectorCol">
              <TreeDropdown
                label="Vigour"
                dataKey="treeVigour"
                onSelect={setTreeVigour}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col className="selectorCol">
              <TreeDropdown
                label="Condition"
                dataKey="treeCondition"
                onSelect={setTreeCondition}
              />
            </Col>
            <Col className="selectorCol">
              <TreeDropdown
                label="Diameter (cm)"
                dataKey="treeDiameterCentimetres"
                onSelect={setTreeDiameterCentimetres}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col className="selectorCol">
              <TreeDropdown
                label="Radius (m)"
                dataKey="treeSpreadRadiusMetres"
                onSelect={setTreeSpreadRadiusMetres}
              />
            </Col>
            <Col className="selectorCol">
              <TreeDropdown
                label="Height (m)"
                dataKey="treeHeightMetres"
                onSelect={setTreeHeightMetres}
              />
            </Col>
          </Row>
          <Row className="selectorRow">
            <Col className="selectorCol">
              <Button type="submit" className="customButton">
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
}

export default TreeDataSelector;

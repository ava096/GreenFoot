import React from "react";
import { Accordion, Col } from "react-bootstrap";
import TreeCard from "./TreeCard";

function GraphAccordion({ trees, categories, filterKey }) {
  return (
    <>
      <Accordion>
        {categories.map((category, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{category}</Accordion.Header>
            <Accordion.Body>
              {trees
                .filter((tree) => tree[filterKey] === category)
                .map((tree) => (
                  <Col sm={12} md={6} lg={3} className="cardCol" key={tree._id}>
                    <TreeCard tree={tree} />
                  </Col>
                ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

export default GraphAccordion;

import React from "react";
import { Accordion } from "react-bootstrap";
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
                  <TreeCard key={tree._id} tree={tree} />
                ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

export default GraphAccordion;

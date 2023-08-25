import React, { useState } from "react";
import TreeDataTable from "../components/TreeDataTable";
import TreeDataSelector from "../components/TreeDataSelector";
import { Link } from "react-router-dom";
import { FaSeedling } from "react-icons/fa";
import { Accordion, Container } from "react-bootstrap";

function DatabaseTableView() {
  const [filters, setFilters] = useState({});

  const onFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Container className="displayContainer">
        <div className="pageTitle">
          <h1>Our Database</h1>
        </div>
        <div className="pageText">
          <p>
            This is a crowdsourced database that relies on reports from the
            general public to continue growing. Below is a table view of current
            records. To see a map view of records,{" "}
            <Link to="/dbmap">click here.</Link> If you want to contribute to
            our project, you can submit a report <Link to="/submit">here.</Link>
          </p>
        </div>
        <div className="pageDivider">
          <FaSeedling /> <FaSeedling /> <FaSeedling />
        </div>
        <div className="selectFilter">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter results by...</Accordion.Header>
              <Accordion.Body>
                <TreeDataSelector onFiltersChange={onFiltersChange} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="scrollableContainer">
          <TreeDataTable filters={filters} />
        </div>
      </Container>
    </>
  );
}

export default DatabaseTableView;

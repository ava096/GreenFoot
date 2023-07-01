import React from "react";
import TreeDataTable from "../components/TreeDataTable";
import TreeDataSelector from "../components/TreeDataSelector";
import { Link } from "react-router-dom";
import { FaSeedling } from "react-icons/fa";

function DatabaseTableView() {
  return (
    <>
      <div className="container">
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
          <h5>Filter results by...</h5>
          <TreeDataSelector />
        </div>
        <div>
          <TreeDataTable />
        </div>
      </div>
    </>
  );
}

export default DatabaseTableView;

import React from "react";
import NewRecordForm from "../components/NewRecordForm";

function SubmitRecordForm() {
  return (
    <>
      <div className="container">
        <div className="pageTitle">
          <h1>Submit a new record</h1>
        </div>
        <div className="pageText">
          <p>
            This is a crowdsourced database that relies on reports from the
            general public to continue growing. The form below will guide you in
            what information you should submit for each field. Thank you for
            contributing to this project!
          </p>
        </div>
        <NewRecordForm />
      </div>
    </>
  );
}

export default SubmitRecordForm;

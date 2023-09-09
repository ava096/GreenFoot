import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllReports, reset } from "../features/reports/reportSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import UserReportCard from "../components/UserReportCard";

function ViewAllReports() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { report, isLoading, isError, message } = useSelector(
    (state) => state.report
  );

  useEffect(() => {
    dispatch(getAllReports());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // onClick to navigate to report contents
  const onClick = () => {
    navigate(`/viewReport/${report._id}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Container className="displayContainer">
        <Row className="titleRow">
          <Col className="displayText">
            <div>
              <h1>All Reports</h1>
            </div>
            <p>
              Here you'll find reports that users have submitted for trees in
              the database.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {report.map((report) => (
              <Col sm={12} md={6} lg={3} className="cardCol" key={report._id}>
                <UserReportCard report={report} />
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewAllReports;

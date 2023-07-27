import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { getReports, reset } from "../features/reports/reportSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import UserReportCard from "../components/UserReportCard";
import "../index.css";

function UserDash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { report, isLoading, isError, message } = useSelector(
    (state) => state.report
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getReports());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const onClick = () => {
    navigate("/suggestTree");
  };

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h1>Welcome back, {user && user.userName}</h1>
            <div className="pageDivider">
              <FaSeedling /> <FaSeedling /> <FaSeedling />
            </div>
          </Col>
        </Row>
        <Row className="titleRow">
          <Col className="textDisplay">
            <div className="">
              <h2>My Reports</h2>
            </div>
            {report.length > 0 ? (
              <div className="cardDiv">
                {report.map((report) => (
                  <UserReportCard key={report._id} report={report} />
                ))}
              </div>
            ) : (
              <>
                <div>
                  <h3>You haven't created any reports yet.</h3>
                </div>
                <div>
                  <Button variant="success" onClick={onClick}>
                    Get started!
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
        <Row className="paddedRow">
          <div className="imageDiv">
            <img src="/sammy-line-biotech.png" />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default UserDash;

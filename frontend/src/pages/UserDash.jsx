import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { getUserReports, reset } from "../features/reports/reportSlice";
import { userFlagged } from "../features/flags/flagSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import UserReportCard from "../components/UserReportCard";
import UserFlagCard from "../components/UserFlagCard";
import "../index.css";

function UserDash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { report, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  const { flag } = useSelector((state) => state.flag);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getUserReports());
    dispatch(userFlagged());

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
      <Container className="displayContainer">
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
            <div>
              <h2>My Reports</h2>
            </div>
            {report.length > 0 ? (
              <div className="cardDiv">
                {report.map(
                  (report) =>
                    !report.isHidden && (
                      <Col
                        sm={12}
                        md={6}
                        lg={3}
                        className="cardCol"
                        key={report._id}
                      >
                        <UserReportCard report={report} />
                      </Col>
                    )
                )}
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
        <Row className="titleRow">
          <Col className="textDisplay">
            <div>
              <h2>My Flags</h2>
            </div>
            {flag.length > 0 ? (
              <div className="cardDiv">
                {flag.map((flag) => (
                  <Col sm={12} md={6} lg={3} className="cardCol" key={flag._id}>
                    <UserFlagCard flag={flag} />
                  </Col>
                ))}
              </div>
            ) : (
              <>
                <div>
                  <h3>You haven't flagged any reports yet.</h3>
                </div>
                <div>
                  <p>
                    If you ever see a problem with a report, please let us know.
                    You can check back here for any updates on your flag's
                    status.
                  </p>
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

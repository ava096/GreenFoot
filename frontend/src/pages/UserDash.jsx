import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa";
import "../index.css";

function UserDash() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // We will use dummyData for now
  const dummyData = [
    { title: "Report 1", content: "Some content" },
    { title: "Report 2", content: "Some other content" },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="welcome-message">
              <h1>Welcome back, {user && user.userName}</h1>
            </div>
            <div className="page-divider">
              <FaSeedling /> <FaSeedling /> <FaSeedling />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="reports-header">
              <h2>My Reports</h2>
            </div>
            {dummyData.length ? (
              dummyData.map((report, index) => (
                <Card className="report-card" key={index}>
                  <Card.Body>
                    <Card.Title>{report.title}</Card.Title>
                    <Card.Text>{report.content}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>You haven't created any reports yet.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserDash;

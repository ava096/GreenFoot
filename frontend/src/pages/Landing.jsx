import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { FaMapLocationDot, FaChartPie, FaSeedling } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/aboutGreenFoot");
  };
  return (
    <>
      <div id="landingContainer">
        <div className="landingText">
          <h1>Green Foot</h1>
          <h3>Care for the trees in your community.</h3>
        </div>
        <div>
          <Button className="customButtonLanding" onClick={onClick}>
            About Us
          </Button>
        </div>
      </div>
      <Container className="displayContainer">
        <Row>
          <Col>
            <div className="landingDiv">
              <h5>View Our Map</h5>
              <h1 className="mapIcon">
                <Link to="dbmap" className="landingLink">
                  <FaMapLocationDot />
                </Link>
              </h1>
              <p>See our database represented on a map</p>
            </div>
          </Col>
          <Col>
            <div className="landingDiv">
              <h5>View Pie Chart</h5>
              <h1 className="mapIcon">
                <Link to="/viewConcernChart" className="landingLink">
                  <FaChartPie />
                </Link>
              </h1>
              <p>See a graphical breakdown</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="landingDiv">
              <h5>Planting Seeds of Caring</h5>
              <h1 className="mapIcon">
                <FaSeedling />
              </h1>
              <p>Take care of nature, and nature will take care of you</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Landing;

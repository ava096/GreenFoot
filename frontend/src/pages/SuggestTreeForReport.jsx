import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa6";
import SelectTreeCard from "../components/SelectTreeCard";
import TreeLocationSelector from "../components/TreeLocationSelector";
import LoadingSpinner from "../components/LoadingSpinner";

function SuggestTreeForReport() {
  return (
    <>
      <>
        <Container className="displayContainer">
          <Row className="titleRow">
            <Col className="textDisplay">
              <div>
                <h1>Is It Tree You're Looking For?</h1>
              </div>
              <div>
                <p>
                  Here are the ten closest trees based on your location, which
                  is indicated by the green marker.
                </p>
              </div>
              <div>
                <Link to="/newTree">Can't find it?</Link>
              </div>
              <div className="pageDivider">
                <FaSeedling /> <FaSeedling /> <FaSeedling />
              </div>
            </Col>
          </Row>
          <Row>
            <div>
              <TreeLocationSelector />
            </div>
          </Row>
        </Container>
      </>
    </>
  );
}

export default SuggestTreeForReport;

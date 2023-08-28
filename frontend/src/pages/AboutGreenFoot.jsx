import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import {
  FaSeedling,
  FaTree,
  FaMessage,
  FaMagnifyingGlassChart,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function AboutGreenFoot() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };
  return (
    <>
      <Container className="displayContainer">
        <Row className="titleRow">
          <Col>
            <div className="welcomeHeading">
              <h1>Welcome to GreenFoot!</h1>
            </div>
          </Col>
          <Col>
            <div className="pageDivider">
              <FaSeedling /> <FaSeedling /> <FaSeedling />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="aboutCol">
            <div className="aboutDiv">
              <h5>Who are we?</h5>
              <p>
                Green Foot is a project aimed at helping Belfast keep track of
                its green spaces, with the help of the local community. You'll
                find our database through this application that contains records
                on the tree population in the Belfast area. This dataset is open
                to the public for whatever purposes you need - but we need your
                help.
              </p>
            </div>
            <div className="iconDiv">
              <FaTree />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="aboutCol">
            <div className="aboutDiv">
              <h5>How can you help?</h5>
              <p>
                Our aim is to keep the dataset as up-to-date as possible, to
                really allow users to get an accurate snapshot of Belfast's
                trees at a given moment in time. Our platform allows you to view
                our current records, and submit reports on trees where our
                records may need correcting. Or perhaps a tree has been damaged,
                and you want to let the appropriate authorities to know. Any
                knowledge you can share would be greatly appreciated!
              </p>
            </div>
            <div className="iconDiv">
              <FaMessage />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="aboutCol">
            <div className="aboutDiv">
              <h5>What are our categories?</h5>
              <p>
                You'll notice that a tree is classed as Green, Yellow, Amber or
                Red. But what does this mean?
              </p>
              <br />
              <ul>
                <li>
                  <strong>Red: </strong>These records are the most incomplete,
                  and are quite hard to glean useful information from. You'll
                  notice that these records don't have a common name or
                  scientific name associated with them, so they're very hard to
                  identify.
                </li>
                <li>
                  <strong>Amber: </strong>These records are slightly more
                  complete, but still in a concerning state. In particular,
                  so-called "Mixed Broadleaf" trees are classed as such, because
                  this is not a recognised species. Help us identify them
                  correctly!
                </li>
                <li>
                  <strong>Yellow: </strong>Trees that have a genus identified
                  but not a particular species make up the bulk of this
                  category. We just need a little extra help to correctly
                  identify them!
                </li>
                <li>
                  <strong>Green: </strong>It's not to say that these records are
                  perfect and without flaw - they are simply the most complete.
                  But we'd like your help in making sure that they are as
                  current as possible, so please don't assume we don't want to
                  know anything about these trees!
                </li>
              </ul>
              <br />
              <p>
                You can see a representation of the current state of our
                database <Link to="/viewConcernChart">here</Link>. We'd love for
                it to be as green as possible!
              </p>
            </div>
            <div className="iconDiv">
              <FaMagnifyingGlassChart />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="aboutCol">
            <div className="buttonDiv">
              <Button variant="success" onClick={onClick}>
                Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutGreenFoot;

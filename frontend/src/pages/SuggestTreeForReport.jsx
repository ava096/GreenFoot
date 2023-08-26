import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { FaSeedling } from "react-icons/fa6";
import SelectTreeCard from "../components/SelectTreeCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SuggestTreeForReport() {
  const navigate = useNavigate();

  //State setters for user location
  const [currentLocation, setCurrentLocation] = useState({});
  //State setters for nearby trees
  const [nearbyTrees, setNearbyTrees] = useState([]);
  //State setters for loading status
  const [isLoading, setIsLoading] = useState(true);

  //Get logged in user details
  const { user } = useSelector((state) => state.auth);

  //Get user's location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
    });
  };

  //Get nearby trees with axios
  const getNearbyTrees = async () => {
    //set loading status to true
    setIsLoading(true);

    const response = await axios.get(
      "http://localhost:8000/api/trees/nearby/",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude,
        },
      }
    );
    setNearbyTrees(response.data);

    //set loading status to false
    setIsLoading(false);
  };

  //Check user is logged in before grabbing location
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  //Grab location
  useEffect(() => {
    getLocation();
  }, []);

  //Check that current location has been set and find nearest trees
  useEffect(() => {
    if (currentLocation.latitude && currentLocation.longitude) {
      getNearbyTrees();
    }
  }, [currentLocation.latitude, currentLocation.longitude]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
                <p>Here are the ten closest trees based on your location.</p>
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
            {nearbyTrees.length > 0 ? (
              <div>
                {nearbyTrees.map((tree) => (
                  <Col sm={12} md={6} lg={3} className="cardCol" key={tree._id}>
                    <SelectTreeCard tree={tree} />
                  </Col>
                ))}
              </div>
            ) : (
              <div>
                <h3>Sorry, we can't seem to find any matches...</h3>
              </div>
            )}
          </Row>
        </Container>
      </>
    </>
  );
}

export default SuggestTreeForReport;

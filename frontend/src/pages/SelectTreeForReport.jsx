import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findTrees, reset } from "../features/trees/treeSlice";
import SelectTreeCard from "../components/SelectTreeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col, Container } from "react-bootstrap";

function SelectTreeForReport() {
  //navigate and dispatch for Redux state management
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //for accessing user token
  const { user } = useSelector((state) => state.auth);

  //access the location data from previous page, stored in state
  const selectedLocation = useSelector((state) => state.tree.selectedLocation);
  const { tree, isLoading, isError, message } = useSelector(
    (state) => state.tree
  );

  // useEffect for user login check
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // useEffect for fetching trees
  useEffect(() => {
    if (selectedLocation) {
      dispatch(findTrees(selectedLocation));
    }

    return () => {
      dispatch(reset());
    };
  }, [selectedLocation, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) return `An error occurred: ${message}`;

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h2>Is This the Tree You're Looking For?</h2>
          </Col>
        </Row>
        <Col>
          <div>
            {tree.length > 0 ? (
              <div className="cardDiv">
                {tree.map((tree) => (
                  <SelectTreeCard key={tree._id} tree={tree} />
                ))}
              </div>
            ) : (
              <h3>Sorry, but there doesn't seem to be any matches.</h3>
            )}
          </div>
        </Col>
      </Container>
    </>
  );
}

export default SelectTreeForReport;

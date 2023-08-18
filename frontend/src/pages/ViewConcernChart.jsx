import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrees, reset } from "../features/trees/treeSlice";
import { Row, Container, Col, Button } from "react-bootstrap";
import PieChart from "../components/PieChart";
import LoadingSpinner from "../components/LoadingSpinner";

function ViewConcernChart() {
  const dispatch = useDispatch();

  // state setters for data to be used in charts
  const [treeData, setTreeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number found in Belfast Area:",
      },
    ],
  });

  //styling for PieChart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  //colours to map over concern categories
  const graphColours = {
    Red: "rgba(255, 99, 132, 0.2)",
    Yellow: "rgba(255, 205, 86, 0.2)",
    Green: "rgba(75, 192, 192, 0.2)",
  };

  // Get trees from redux functions
  const { tree, isLoading, isError } = useSelector((state) => state.tree);

  //get the trees
  useEffect(() => {
    //run getAllTrees function
    dispatch(getAllTrees());
  }, [dispatch]);

  //run countSpeciesData on the trees
  useEffect(() => {
    if (tree && tree.length > 0) {
      const concernData = countConcernData(tree);
      //tree species that occur in database
      const labels = Object.keys(concernData);
      //count for each species
      const data = Object.values(concernData);

      const colours = labels.map((label) => graphColours[label]);

      setTreeData((prevData) => ({
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data,
            backgroundColor: colours,
            borderColor: colours,
            hoverOffset: 10,
          },
        ],
      }));
    }

    // reset to tie up loose ends
    return () => {
      dispatch(reset());
    };
  }, [tree, dispatch]);

  // Reduce method to aggregate data ie. get a count for each individual species
  const countConcernData = (trees) => {
    return trees.reduce((acc, tree) => {
      const name = tree.levelOfConcern;
      if (!acc[name]) {
        acc[name] = 1;
      } else {
        acc[name] += 1;
      }

      return acc;
    }, {});
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <div>
              <h1>Graphical View</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="textDisplay">
            <div>
              <p>
                Here you'll find a graphical representation of our database.
                There are multiple views to toggle through: a breakdown of
                species data, of categories - just choose which one you want!
                Click through to see a breakdown of a particular category.
              </p>
            </div>
            <div></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="chartContainer">
              <PieChart treeData={treeData} options={options} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewConcernChart;

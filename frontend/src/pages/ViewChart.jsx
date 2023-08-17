import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrees, reset } from "../features/trees/treeSlice";
import chroma from "chroma-js";
import { Row, Container, Col } from "react-bootstrap";
import PieChart from "../components/PieChart";
import LoadingSpinner from "../components/LoadingSpinner";

function ViewChart() {
  const dispatch = useDispatch();

  // state setters for data to be used in charts
  const [treeData, setTreeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Species found in Belfast Area",
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
      const speciesData = countSpeciesData(tree);
      //tree species that occur in database
      const labels = Object.keys(speciesData);
      //count for each species
      const data = Object.values(speciesData);

      // Generate color palette based on data length
      const colors = chroma
        .scale("YlGn")
        .gamma(0.5)
        .mode("lch")
        .colors(data.length);

      setTreeData((prevData) => ({
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data,
            backgroundColor: colors,
            borderColor: colors,
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
  const countSpeciesData = (trees) => {
    return trees.reduce((acc, tree) => {
      const name = tree.treeScientificName;
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
          <Col className="displayText">
            <div>
              <h1>Graphical View</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="displayText">
            <div>
              <p>
                Here you'll find a graphical representation of our database.
              </p>
            </div>
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

export default ViewChart;

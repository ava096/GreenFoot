import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrees, reset } from "../features/trees/treeSlice";
import chroma from "chroma-js";
import { Row, Container, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PieChart from "../components/PieChart";
import LoadingSpinner from "../components/LoadingSpinner";
import GraphAccordion from "../components/GraphAccordion";

function ViewSpeciesChart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state setters for data to be used in charts
  const [treeData, setTreeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number found in Belfast Area",
      },
    ],
  });

  //state setters for categories to be used in pie chart and accordion elements
  const [categories, setCategories] = useState([]);

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

      //set labels to categories
      setCategories(labels);

      // Generate color palette based on data length
      const colours = chroma
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
            backgroundColor: colours,
            borderColor: colours,
            hoverOffset: 10,
          },
        ],
      }));
    }
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

  //if concern button is clicked
  const onConcernClick = () => {
    navigate("/viewConcernChart");
  };

  //if species button is clicked
  const onSpeciesClick = () => {
    navigate("/viewSpeciesChart");
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
            <div>
              <div>
                <Button variant="success" onClick={onConcernClick}>
                  Quality Concern
                </Button>
              </div>
              <div>
                <Button variant="success" onClick={onSpeciesClick}>
                  Species Breakdown
                </Button>
              </div>
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
        <Row>
          <Col>
            <div>
              <GraphAccordion trees={tree} categories={categories} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewSpeciesChart;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrees, reset } from "../features/trees/treeSlice";
import { useNavigate } from "react-router-dom";
import { Row, Container, Col, Button, Accordion } from "react-bootstrap";
import PieChart from "../components/PieChart";
import LoadingSpinner from "../components/LoadingSpinner";
import GraphAccordion from "../components/GraphAccordion";
import { FaSeedling } from "react-icons/fa6";

function ViewConcernChart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state setters for data to be used in charts
  const [treeData, setTreeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number found in Belfast Area:",
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

  //colours to map over concern categories
  const graphColours = {
    Red: "rgba(255, 99, 132, 0.2)",
    Yellow: "rgba(255, 205, 86, 0.2)",
    Green: "rgba(75, 192, 192, 0.2)",
    Amber: "rgba(255, 159, 64, 0.2)",
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

      //set labels to categories
      setCategories(labels);

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
  }, [tree]);

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

  //if concern button is clicked
  const onConcernClick = () => {
    navigate("/viewConcernChart");
  };

  //if species button is clicked
  const onSpeciesClick = () => {
    navigate("/viewSpeciesChart");
  };

  //if condition button is clicked
  const onConditionClick = () => {
    navigate("/viewConditionChart");
  };

  //if age button is clicked
  const onAgeClick = () => {
    navigate("/viewAgeChart");
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
      <Container className="displayContainer">
        <Row className="titleRow">
          <Col className="textDisplay">
            <div>
              <h1>Quality Concern Breakdown</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="textDisplay">
            <div>
              <p>
                This is a representation of the data quality of the Green Foot
                database. Whilst we have many records available, they are all of
                varying levels of quality. Please see here for more information
                on our quality key. This is where you come in: with your help in
                improving the data quality and reliablity, we hope that more
                records will be classed as 'Green', the lowest level of data
                quality concern. Help us in achieving this goal!
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
              <div>
                <Button variant="success" onClick={onConditionClick}>
                  Condition Breakdown
                </Button>
              </div>
              <div>
                <Button variant="success" onClick={onAgeClick}>
                  Age Breakdown
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="pageDividerPadding">
              <FaSeedling /> <FaSeedling /> <FaSeedling />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="chartContainerSmaller">
              <PieChart treeData={treeData} options={options} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="textDisplay">
              <h3>Have a closer look at the categories...</h3>
            </div>
            <div>
              <GraphAccordion
                trees={tree}
                categories={categories}
                filterKey="levelOfConcern"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="pageDividerPadding">
              <FaSeedling /> <FaSeedling /> <FaSeedling />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewConcernChart;

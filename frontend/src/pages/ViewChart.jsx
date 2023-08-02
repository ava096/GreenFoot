import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import BarChartViewTrees from "../components/BarChartViewTrees";

function ViewChart() {
  //variables for if user wants bar or pie chart
  const chartType1 = "BarChart";
  const chartType2 = "PieChart";

  //variables for what data user wants to see in chart
  const userChoice1 = "treeLocationType";
  const userChoice2 = "treeType";
  const userChoice3 = "treeAge";
  const userChoice4 = "treeVigour";
  const userChoice5 = "treeCondition";
  const userChoice6 = "treeDiameterCentimetres";
  const userChoice7 = "treeSpreadRadiusMetres";
  const userChoice8 = "treeHeightMetres";

  //state setters for chart type
  const [chartType, setChartType] = useState(chartType1);
  //state setters for user choice
  const [userChoice, setUserChoice] = useState(userChoice2);

  //API call to get tree data
  const getTrees = async () => {
    try {
      const treeResponse = await axios.get("http://localhost:8000/api/trees/");

      return treeResponse.data;
    } catch (error) {
      throw error;
    }
  };

  //define ranges for centimetres - will improve viewability of diameter data
  const getCentimetreRange = (centimetres) => {
    if (centimetres <= 10) return "0-10cm";
    if (centimetres <= 20) return "11-20cm";
    if (centimetres <= 30) return "21-30cm";
    if (centimetres <= 40) return "31-40cm";
    if (centimetres <= 50) return "41-50cm";
    if (centimetres <= 60) return "51-60cm";
    if (centimetres <= 70) return "61-70cm";
    if (centimetres <= 80) return "71-80cm";
    if (centimetres <= 90) return "81-90cm";
    if (centimetres <= 100) return "91-100cm";
  };

  //define ranges for metres to improve viewability of height data
  const getMetreRange = (metres) => {
    if (metres <= 5) return "0-5m";
    if (metres <= 10) return "6-10m";
    if (metres <= 15) return "11-15m";
    if (metres <= 20) return "16-20m";
    if (metres <= 25) return "21-25m";
    if (metres <= 30) return "26-30m";
    if (metres <= 35) return "31-35m";
  };

  //function to help build option object
  const getChartOptions = (title, chartType) => {
    //pie chart only needs a title
    let options = {
      title: title,
    };

    //must define other properties for bar chart
    if (chartType === chartType1) {
      options.width = 600;
      options.height = 400;
      options.bar = { groupWidth: "95%" };
      options.legend = { position: "none" };
    }

    return options;
  };

  //determine title from view choice
  const getTitleFromViewChoice = (viewChoice) => {
    switch (viewChoice) {
      case userChoice1:
        return "Breakdown for Location of Trees";
      case userChoice2:
        return "Breakdown for Tree Species";
      case userChoice3:
        return "Breakdown for Tree Age";
      case userChoice4:
        return "Breakdown for Vigour of Trees";
      case userChoice5:
        return "Breakdown for Condition of Trees";
      case userChoice6:
        return "Breakdown for Diameter of Trees (cm)";
      case userChoice7:
        return "Breakdown for Spread Radius of Trees (m)";
      case userChoice8:
        return "Breakdown for Heights of Trees (m)";
      default:
        return "Unable to find title";
    }
  };

  const processTreeData = (viewChoice, treeResponse) => {
    //Headers needed for chart
    const data = [["Category", "Count"]];

    const processData = (propertyName, rangeFunction = null) => {
      const counts = treeResponse.reduce((acc, tree) => {
        // Apply the range function if provided
        const value = rangeFunction
          ? rangeFunction(tree[propertyName])
          : tree[propertyName];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});

      for (const [type, count] of Object.entries(counts)) {
        data.push([type, count]);
      }
    };

    //Switch statement to pass correct processData depending on user choice
    switch (viewChoice) {
      case userChoice1:
        processData("treeLocationType");
        break;
      case userChoice2:
        processData("treeType");
        break;
      case userChoice3:
        processData("treeAge");
        break;
      case userChoice4:
        processData("treeVigour");
        break;
      case userChoice5:
        processData("treeCondition");
        break;
      case userChoice6:
        processData("treeDiameterCentimetres", getCentimetreRange);
        break;
      case userChoice7:
        processData("treeSpreadRadiusMetres");
        break;
      case userChoice8:
        processData("treeHeightMetres", getMetreRange);
        break;
    }
    // Determine the title based on viewChoice or any other criteria you want to use
    const title = getTitleFromViewChoice(viewChoice);

    // Use the getChartOptions function to create the options object
    const options = getChartOptions(title, chartType);

    return { data, options };
  };

  return (
    <>
      <Container>
        <Row className="titleRow">
          <Col className="textDisplay">
            <h1>Data Breakdown</h1>
          </Col>
        </Row>
        <Row>
          <Col className="textDisplay">
            <p>
              We understand that it can be hard to glean data from just a table
              view. To improve readability, this page presents our data to you
              in a handy pie chart, or bar chart - your choice! You can filter
              data by category and see a breakdown according to species,
              location and more.
            </p>
          </Col>
        </Row>
        <Row>
          <BarChartViewTrees
            chartType={chartType}
            data={data}
            options={options}
          />
        </Row>
      </Container>
    </>
  );
}

export default ViewChart;

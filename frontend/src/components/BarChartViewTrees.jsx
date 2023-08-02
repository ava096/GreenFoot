import React from "react";
import { Chart } from "react-google-charts";

function BarChartViewTrees({ chartType, data, options }) {
  <>
    <Chart
      chartType={chartType}
      width="100px"
      height="400px"
      data={data}
      options={options}
    />
  </>;
}

export default BarChartViewTrees;

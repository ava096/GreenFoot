import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto";

function PieChart({ treeData, options }) {
  return <Pie data={treeData} options={options} />;
}

export default PieChart;

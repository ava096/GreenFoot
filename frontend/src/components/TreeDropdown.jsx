import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Form from "react-bootstrap/Form";

function TreeDropdown({ label, dataKey }) {
  async function getTrees() {
    const response = await axios.get("http://localhost:8000/api/trees");
    return response.data;
  }

  const { isLoading, error, data } = useQuery("trees", getTrees);

  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;

  const uniqueOptions = [...new Set(data.map((tree) => tree[dataKey]))];

  return (
    <Form.Select aria-label="Tree Selector">
      <option>Select {label}</option>
      {uniqueOptions.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}

export default TreeDropdown;

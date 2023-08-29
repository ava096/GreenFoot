import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Form from "react-bootstrap/Form";

function TreeDropdown({ label, dataKey, onSelect }) {
  async function getTrees() {
    const response = await axios.get("http://localhost:8000/api/trees");
    return response.data;
  }

  const { isLoading, error, data } = useQuery("trees", getTrees);

  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;

  const uniqueOptions = [...new Set(data.map((tree) => tree[dataKey]))];

  const handleSelect = (e) => {
    onSelect(e.target.value);
  };

  return (
    <Form.Select
      className="tableDropdown"
      aria-label="Tree Selector"
      onChange={handleSelect}
    >
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

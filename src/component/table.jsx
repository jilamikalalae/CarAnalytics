import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const TableComponent = ({ sortedBrands }) => {
  const [expandedBrands, setExpandedBrands] = useState({});

  const toggleExpand = (brand) => {
    setExpandedBrands((prev) => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Total Value (Baht)</th>
          <th>Total Amount</th>
          <th>Model</th>
        </tr>
      </thead>
      <tbody>
        {sortedBrands.map((brandData, index) => {
          const isExpanded = expandedBrands[brandData.brand];
          const totalValue = brandData.models.reduce(
            (acc, model) => acc + model.value,
            0
          );
          const totalAmount = brandData.models.reduce(
            (acc, model) => acc + model.count,
            0
          );

          return (
            <React.Fragment key={index}>
              <tr>
                <td>{brandData.brand}</td>
                <td>{totalValue.toLocaleString()}</td>
                <td>{totalAmount}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => toggleExpand(brandData.brand)}
                  >
                    {isExpanded ? "Hide Details" : "Show Details"}
                  </Button>
                </td>
              </tr>
              {isExpanded &&
                brandData.models.map((model, idx) => (
                  <tr key={idx}>
                    <td></td>
                    <td>{model.name}</td>
                    <td>{model.value.toLocaleString()}</td>
                    <td>{model.count}</td>
                  </tr>
                ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableComponent;

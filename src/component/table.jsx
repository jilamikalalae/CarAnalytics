import React from "react";
import { Table } from 'react-bootstrap';

const TableComponent = ({ sortedBrands }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Value (Baht)</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {sortedBrands.map((brandData, index) => (
          <React.Fragment key={index}>
            <tr>
              <td rowSpan={brandData.models.length}>{brandData.brand}</td>
              <td>{brandData.models[0]?.name}</td>
              <td>{brandData.models[0]?.value.toLocaleString()}</td>
              <td>{brandData.models[0]?.count}</td>
            </tr>
            {brandData.models.slice(1).map((model, idx) => (
              <tr key={idx}>
                <td>{model.name}</td>
                <td>{model.value.toLocaleString()}</td>
                <td>{model.count}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
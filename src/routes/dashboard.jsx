import React, { useEffect, useRef } from "react";
import PieChart from "../component/pieChart";
import StackedBarChart from '../component/StackedBarChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Container, Row, Col, Table } from 'react-bootstrap';
import carData from '../taladrod-cars.min.json'; //  JSON file

const formatPrice = (priceString) => {
  // Remove any non-numeric characters (like commas) and convert to number
  return parseFloat(priceString.replace(/,/g, ''));
};

const Dashboard = () => {
  const brands = carData.MMList;
  const cars = carData.Cars;

  // Aggregate data for the table
  const brandModels = {};
  const modelCounts = {};

  cars.forEach(car => {
    const brandName = brands.find(brand => brand.mkID === car.MkID)?.Name || 'Unknown';
    if (!brandModels[brandName]) {
      brandModels[brandName] = { totalValue: 0, models: [] };
    }
    const modelName = car.Model;
    const modelValue = formatPrice(car.Prc);

    // Update total value for the brand
    brandModels[brandName].totalValue += modelValue;

    // Update model value and count
    if (!modelCounts[modelName]) {
      modelCounts[modelName] = { value: 0, count: 0 };
    }
    modelCounts[modelName].value += modelValue;
    modelCounts[modelName].count += 1;

    // Add model information
    brandModels[brandName].models.push({
      name: modelName,
      value: modelValue,
      count: modelCounts[modelName].count
    });
  });

  // Convert brandModels to an array and sort it by brand name
  const sortedBrands = Object.keys(brandModels).sort().map(brand => ({
    brand,
    ...brandModels[brand]
  }));

  // Sort models within each brand by price
  sortedBrands.forEach(brandData => {
    brandData.models.sort((a, b) => b.value - a.value); // Sort models by value descending
  });

  // Prepare data for PieChart
  const pieChartData = sortedBrands.map(brand => ({
    brand: brand.brand,
    value: brand.totalValue
  }));

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} className="text-center">
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Car Table</Card.Title>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Pie Chart</Card.Title>
              <PieChart data={pieChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Stacked Bar Chart</Card.Title>
              <StackedBarChart data={carData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
import React from "react";
import PieChart from "../component/pieChart";
import StackedBarChart from '../component/StackedBarChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import carData from '../taladrod-cars.min.json';
import TableComponent from '../component/table';

const formatPrice = (priceString) => {
  return parseFloat(priceString.replace(/,/g, ''));
};

const Dashboard = () => {
  const brands = carData.MMList;
  const cars = carData.Cars;

  const brandModels = {};
  const modelCounts = {};

  cars.forEach(car => {
    const brandName = brands.find(brand => brand.mkID === car.MkID)?.Name || 'Unknown';
    if (!brandModels[brandName]) {
      brandModels[brandName] = { totalValue: 0, models: [] };
    }
    const modelName = car.Model;
    const modelValue = formatPrice(car.Prc);

    brandModels[brandName].totalValue += modelValue;

    if (!modelCounts[modelName]) {
      modelCounts[modelName] = { value: 0, count: 0 };
    }
    modelCounts[modelName].value += modelValue;
    modelCounts[modelName].count += 1;

    brandModels[brandName].models.push({
      name: modelName,
      value: modelValue,
      count: modelCounts[modelName].count
    });
  });

  const sortedBrands = Object.keys(brandModels).sort().map(brand => ({
    brand,
    ...brandModels[brand]
  }));

  sortedBrands.forEach(brandData => {
    brandData.models.sort((a, b) => b.value - a.value);
  });

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

      {/* Pie Chart and Stacked Bar Chart at the top */}
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

      {/* Car Table below the charts */}
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Car Table</Card.Title>
              <TableComponent sortedBrands={sortedBrands} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
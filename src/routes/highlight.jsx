import React, { useState, useEffect } from 'react';
import CarTable from './CarTable';
import carData from '../taladrod-cars.json';

const Highlight = () => {
    const [showCarList, setShowCarList] = useState(false);
    const [selectedCars, setSelectedCars] = useState([]);
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Load cars data from JSON
        setCars(carData.Cars);

        // Load selected cars from local storage
        const savedCars = localStorage.getItem('selectedCars');
        if (savedCars) {
            setSelectedCars(JSON.parse(savedCars));
        }
    }, []);

    useEffect(() => {
        // Save selected cars to local storage whenever they change
        localStorage.setItem('selectedCars', JSON.stringify(selectedCars));
    }, [selectedCars]);

    const handleSelectCar = (car) => {
        setSelectedCars((prevSelected) => [...prevSelected, car]);
        setShowModal(false);
    };

    const handleRemoveCar = (carId) => {
        setSelectedCars((prevSelected) =>
            prevSelected.filter((car) => car.Cid !== carId)
        );
    };

    const handleRemoveAllCars = () => {
        setSelectedCars([]);
    };

    const selectedCarIds = selectedCars.map(car => car.Cid);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => setShowModal(true)}
                >
                    Select a Car
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleRemoveAllCars}
                >
                    Clear All
                </button>
            </div>

            {selectedCars.length > 0 && (
                <div className="row">
                    {selectedCars.map((car) => (
                        <div key={car.Cid} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                    src={car.Img300}
                                    alt={car.Model}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{car.Model}</h5>
                                    <p className="card-text">
                                        <strong>Name:</strong> {car.NameMMT}<br />
                                        <strong>Year:</strong> {car.Yr}<br />
                                        <strong>Price:</strong> {car.Prc}
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveCar(car.Cid)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{ display: 'block' }}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Select a Car</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <CarTable
                                    cars={cars}
                                    onSelectCar={handleSelectCar}
                                    selectedCarIds={selectedCarIds}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Highlight;

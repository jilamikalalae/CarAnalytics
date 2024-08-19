import React from 'react';

const CarTable = ({ cars, onSelectCar, selectedCarIds }) => {
    // Filter out cars that are already selected
    const availableCars = cars.filter(car => !selectedCarIds.includes(car.Cid));

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Model</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {availableCars.length > 0 ? (
                        availableCars.map((car) => (
                            <tr key={car.Cid}>
                                <td>{car.Model}</td>
                                <td>{car.NameMMT}</td>
                                <td>{car.Yr}</td>
                                <td>{car.Prc}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => onSelectCar(car)}
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No available cars to select</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CarTable;

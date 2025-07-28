"use strict";
// Task 1 - Hello World
console.log("Hello World!");
const vehicle = {
    model: "Boring generic vehicle",
    color: "Red",
    year: 1993,
    power: 60
};
console.log("Task 2 - Vehicle:", vehicle);
const car = {
    model: "Ford focus",
    color: "Green",
    year: 2016,
    power: 150,
    bodyType: "Hatchback",
    wheelCount: 4
};
const plane = {
    model: "Boeing 777",
    color: "White",
    year: 2020,
    power: 170000,
    wingspan: 65
};
const boat = {
    model: "Bella",
    color: "Black",
    year: 2022,
    power: 100,
    draft: 0.42
};
console.log("Task 3 - Vehicles:");
console.log("Car:", car);
console.log("Plane:", plane);
console.log("Boat:", boat);
// Task 4 - Vehicle Services
class VehicleService {
    cars = [];
    boats = [];
    addCar(car) {
        this.cars.push(car);
    }
    addBoat(boat) {
        this.boats.push(boat);
    }
    getCars() {
        return this.cars;
    }
    getBoats() {
        return this.boats;
    }
}
const vehicleService = new VehicleService();
vehicleService.addCar(car);
vehicleService.addBoat(boat);
console.log("Task 4 - Vehicle Services:");
console.log("Cars:", vehicleService.getCars());
console.log("Boats:", vehicleService.getBoats());

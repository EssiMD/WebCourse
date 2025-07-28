// Task 1 - Hello World
console.log("Hello World!");

// Task 2 - TVehicle type
type TVehicle = {
    model: string;
    color: string;
    year: number;
    power: number;
};

const vehicle: TVehicle = {
    model: "Boring generic vehicle",
    color: "Red",
    year: 1993,
    power: 60
};

console.log("Task 2 - Vehicle:", vehicle);

// Task 3 - Vehicle types
interface ICar extends TVehicle {
    bodyType: string;
    wheelCount: number;
}

interface IPlane extends TVehicle {
    wingspan: number;
}

interface IBoat extends TVehicle {
    draft: number;
}

const car: ICar = {
    model: "Ford focus",
    color: "Green",
    year: 2016,
    power: 150,
    bodyType: "Hatchback",
    wheelCount: 4
};

const plane: IPlane = {
    model: "Boeing 777",
    color: "White",
    year: 2020,
    power: 170000,
    wingspan: 65
};

const boat: IBoat = {
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
    private cars: ICar[] = [];
    private boats: IBoat[] = [];

    addCar(car: ICar) {
        this.cars.push(car);
    }

    addBoat(boat: IBoat) {
        this.boats.push(boat);
    }

    getCars(): ICar[] {
        return this.cars;
    }

    getBoats(): IBoat[] {
        return this.boats;
    }
}

const vehicleService = new VehicleService();
vehicleService.addCar(car);
vehicleService.addBoat(boat);

console.log("Task 4 - Vehicle Services:");
console.log("Cars:", vehicleService.getCars());
console.log("Boats:", vehicleService.getBoats());
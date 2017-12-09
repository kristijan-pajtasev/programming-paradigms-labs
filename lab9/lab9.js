///////////////////////////////////////////////////////////////////////////////////
// PART 1
///////////////////////////////////////////////////////////////////////////////////
console.log("\n===================\nPart 1\n===================\n");

// read json
const fs = require("fs");
const path = require("path");
const vehicles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "vehicles.json")));

class Vehicle {
    constructor(engine = new Engine(), chasisNumber, owner, odometer, numberOfWheels) {
        this.engine = engine;
        this.chasisNumber = chasisNumber;
        this.owner = owner;
        this.odometer = odometer;
        this.numberOfWheels = numberOfWheels;
    }

    getTotalDistance() { return this.odometer; }

    getOwner() { return this.owner; }

    getTotalRunningTIme() {}

    updateVehicle(obj) {
        if(this.chasisNumber === obj.chassis && obj.owner === this.owner.name) {
            this.odometer = obj.distance;
            this.engine.setRunningTime(obj.runtime);
        } else if(this.chasisNumber === obj.chassis && obj.owner !== this.owner.name)
            console.log(`${obj.owner} is not owner for car with chasisNumber ${obj.chassis}`);
    }
}

class Person {
    constructor(name, address, vehicle) {
        this.name = name;
        this.address = address;
        this.vehicle = vehicle;
    }

    drive() {}

    readPoetry() {}

    addVehicle(v) { this.vehicle = v; }
}

class Engine {
    constructor(engineNumber, size, runningTime = 0) {
        this.runningTime = runningTime
    }

    setRunningTime(runningTime) {
        this.runningTime = runningTime;
    }

    getRunningTime() {
        return this.runningTime;
    }
}

const standardDerivation = (arr) => {
    const mean = arr => {
        return arr.reduce((sum, e) => sum + e, 0) / arr.length;
    };
    const populationVariance =(arr, mean) =>
        arr.map(e => Math.pow(e - mean, 2))
            .reduce((sum, e) => sum + e,0) / arr.length;
    return Math.sqrt(populationVariance(arr, mean(arr)))
};

// get all owners as { ownerName: ownerObj }
const allOwners = vehicles
    .map(vehicle => vehicle.owner)
    .filter((e, i, arr) => arr.indexOf(e) === i)
    .reduce((a, b) => { a[b] = new Person(b); return a; }, {});

let engine = new Engine('V6', 12);
let car = new Vehicle(engine, 'J9O 5P3', allOwners['Alexis']);

console.log("==================\nUpdate vehicle start");
vehicles.map(v => {
    car.updateVehicle(v);
});
console.log("Update vehicle end\n==================\n");

const averageRuntime =
    vehicles.reduce((sum, vehicle) => sum + vehicle.runtime, 0) / vehicles.length;
console.log(`Average runtime: ${averageRuntime}`);

const distanceStandardDerivation =
    standardDerivation(vehicles.map(vehicle => parseFloat(vehicle.distance)));
console.log(`Distance standard derivation: ${distanceStandardDerivation}`);

// get {person: total distance} object
const totalDistancesForPerson = vehicles.reduce((a, b) => {
    if(!a[b.owner]) a[b.owner] = 0;
    a[b.owner] += parseFloat(b.distance);
    return a;
}, {});

// get all names
const owners = vehicles.map(v => v.owner).filter((e, i, arr) => arr.indexOf(e) === i);

const personWhoDroveMost = owners
    .map(owner => ({ owner, distance: totalDistancesForPerson[owner]})) // [{owner, distance}] object
    .sort((a,b) => a.distance < b.distance ? 1 : -1) // sort by distance
    .filter((vehicle, index, arr) => vehicle.distance === arr[0].distance) // filter everyone with highest distance
    .map(vehicle => vehicle.owner); // get just names
console.log(`Person who drove most: ${personWhoDroveMost}`);

const numOfPeopleCalledAlexisOrAlex = vehicles.filter(vehicle => vehicle.owner.match(/Alex|Alexis/)).length;
console.log(`Number of people called Alex or Alexis: ${numOfPeopleCalledAlexisOrAlex}`);


///////////////////////////////////////////////////////////////////////////////////
// PART 2
///////////////////////////////////////////////////////////////////////////////////
console.log("\n===================\nPart 2\n===================\n");

const vehicle = {
    engine: "",
    chassisNumber: "",
    owner: "",
    odometer: "123",
    numberOfWheels: "",
    showTotalDistance: function() { console.log(this.odometer); },
    showOwner: function() { console.log(this.owner); },

};

const owner = {
    name: "",
    address: "",
    drive: function() { console.log("drive"); },
    readPoetry: function() { console.log("some poetry.") }
};

const carEngine = {
    number: "",
    size: "",
    totalRunningTime: "",
    getTotalRunningTIme: function() { return this.totalRunningTime; }
};

const smartCar = Object.assign(vehicle, owner, carEngine);
smartCar.readPoetry();
smartCar.showTotalDistance();
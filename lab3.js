let vehicles = require('./vehicles');
// 3.
let totalSpeed = vehicles.reduce((sum, car) => sum + car.speed, 0);

// 4.
let numOfTanks = vehicles.filter(vehicle => vehicle.type === 'tank').length;
numOfTanks = vehicles.reduce((count, vehicle) => count + (vehicle.type === 'tank' ? 1 : 0), 0);

// 5. fast vehicles
let fastVehicles = vehicles.filter(vehicle => vehicle.speed > 650).map(vehicle => vehicle.name).join(', ');

//6. speeds in km/h
let speedConverted = vehicles.map(vehicle => ({
    "name": vehicle.name,
    "type": vehicle.type,
    "speed": vehicle.speed * 1.609344
}));

console.log(`Number of cars is ${vehicles.length}`);
console.log(`Total speed is ${totalSpeed}`);
console.log(`Total number of tanks is ${numOfTanks}`);
console.log(`Fast vehicles are: ${fastVehicles}`);


speedConverted.forEach(vehicle => console.log(`${vehicle.name}, ${vehicle.type}, ${vehicle.speed}`))

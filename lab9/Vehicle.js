let Engine = require('./Engine');
class Vehicle {
    constructor(engine = new Engine(), chasisNumber, owner, odometer, numberOfWheels) {
        this.engine = engine;
        this.chasisNumber = chasisNumber;
        this.owner = owner;
        this.odometer = odometer;
        this.numberOfWheels = numberOfWheels;
    }

    getTotalDistance() {

    }

    getOwner() {

    }

    getTotalRunningTIme() {

    }

    updateVehicle(obj) {
        if(this.chasisNumber === obj.chassis && obj.owner === this.owner.name) {
            this.odometer = obj.distance;
            this.engine.setRunningTime(obj.runtime);
        } else if(this.chasisNumber === obj.chassis && obj.owner !== this.owner.name) {
            console.log(`${obj.owner} is not owner for car with chasisNumber ${obj.chassis}`);
        }
    }
}

module.exports = Vehicle;
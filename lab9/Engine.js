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

module.exports = Engine;
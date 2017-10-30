let fs = require('fs');

// Level 1
const people = JSON.parse(fs.readFileSync(__dirname + '/lab4WHODemographic.json', 'utf8'));

const heights = people.map(person => {
    person.height = Math.round(person.height * 100);
    console.log(person);
    return person;
});

const heightMean = people.reduce((sum, person) => sum + person.height, 0) / people.length;
console.log(`Height mean: ${heightMean}`);

const ageMean = people.reduce((sum, person) => sum + person.age, 0) / people.length;
console.log(`Age mean: ${ageMean}`);

// Level 2
// Height
const heightMedian = people.map(person => person.height).sort()[ Math.round((people.length + 1) / 2) ];
console.log(`Height median: ${heightMedian}`);

const heightCountMap = people
    .reduce((aggregate, person) => {
        aggregate[person.height] = aggregate[person.height] === undefined ? 0 : aggregate[person.height] += 1;
        return aggregate;
    }, {});
let heightMode = Object
    .keys(heightCountMap)
    .map(key => ({ height: key, count: heightCountMap[key] }))
    .sort((a,b) => a.count > b.count ? -1 : 1)
    .filter((height, index, arr) => height.count === arr[0].count)
    .map(height => height.height)
    .join(', ');
console.log(`Height mode: ${heightMode}`);

let heightPopulation = people
        .map(person => Math.pow(person.height - heightMean, 2))
        .reduce((sum, dif) => sum + dif) / people.length;
console.log(`Height population variance: ${heightPopulation}`);

let heightStandardDeviation = Math.sqrt(heightPopulation);
console.log(`Height standard deviation: ${heightStandardDeviation}`);

//Age
const ageMedian = people.map(person => person.age).sort()[ Math.round((people.length + 1) / 2) ];
console.log(`Age median: ${ageMedian}`);

const ageCountMap = people
    .reduce((aggregate, person) => {
        aggregate[person.age] = aggregate[person.age] === undefined ? 0 : aggregate[person.age] += 1;
        return aggregate;
    }, {});
let ageMode = Object
    .keys(ageCountMap)
    .map(key => ({ height: key, count: ageCountMap[key] }))
    .sort((a,b) => a.count > b.count ? -1 : 1)
    .filter((age, index, arr) => age.count === arr[0].count)
    .map(age => age.height)
    .join(', ');
console.log(`Age mode: ${ageMode}`);

let agePopulation = people
        .map(person => Math.pow(person.age - ageMean, 2))
        .reduce((sum, dif) => sum + dif) / people.length;
console.log(`Age population variance: ${agePopulation}`);

let ageStandardDeviation = Math.sqrt(agePopulation);
console.log(`Age standard deviation: ${ageStandardDeviation}`);

// brazil
let brazilians = people.filter(person => person.country === 'Brazil');
const brazilHeightMean = brazilians.reduce((sum, person) => sum + person.height, 0) / people.length;
console.log(`Brazilian height mean: ${heightMean}`);

let brazilianStandardDeviation = Math.sqrt(brazilians
    .map(person => Math.pow(person.height - brazilHeightMean, 2))
    .reduce((sum, dif) => sum + dif) / people.length);
console.log(`Brazilian height standard deviation: ${brazilianStandardDeviation}`);
console.log(`Population deviation - brazilian deviation = : ${heightStandardDeviation - brazilianStandardDeviation}`);


// Level 3
C = (
        people.length * people.reduce((sum, person) => sum + (person.height * person.age), 0) -
        people.reduce((sum, person) => sum + person.age, 0) * people.reduce((sum, person) => sum + person.height, 0)
    ) /
    Math.sqrt(
        (
            people.length *
            people.reduce((sum, p) => sum + p.height * p.height, 0) -
            Math.pow(people.reduce((sum, p) => sum + p.height, 0) , 2)
        ) *
        (
            people.length *
            people.reduce((sum, p) => sum + p.age * p.age, 0) -
            Math.pow(people.reduce((sum, p) => sum + p.age, 0) , 2)
        )
    );
console.log(`Pearson correlation coef: ${C}`);
// Load all people
let fs = require('fs');

// reusable function for mean, sum(x) / n
// receives just array of numbers
let mean = arr => {
    return arr.reduce((sum, e) => sum + e, 0) / arr.length;
};

// Level 1
const people = JSON.parse(fs.readFileSync(__dirname + '/lab4WHODemographic.json', 'utf8'));

// all heights
const heights = people.map(p => p.height);
console.log(`Heights: ${heights}`)

const heightsInCm = people.map(person => {
    person.height = Math.round(person.height * 100);
    return person.height;
});
console.log('Heights in cm: ', heightsInCm);

// get array of heights
const heightMean = mean(people.map(p => p.height));
console.log(`Height mean: ${heightMean}`);

// get array of ages
const ageMean = mean(people.map(p => p.age));
console.log(`Age mean: ${ageMean}`);

// Level 2

// reusable function for median
// receives array of numbers
// middle element of array
const median = arr => {
    // sorted array
    arr = arr.sort();

    // middle element if odd num of elements
    // avg of two middle elements if otherwise
    if(arr % 2 === 1) return arr[ Math.round((arr.length + 1) / 2) ];
    else return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
};

// reusable function for mode
const mode = arr => {
    // map with elements and number of occurrence
    const valueCountMap = arr
        .reduce((aggregate, e) => {
            aggregate[e] = aggregate[e] === undefined ? 1 : aggregate[e] += 1;
            return aggregate;
        }, {});

    // for each key
    // create { value, count } objects
    // sort it based on count
    // filter for ones with same max count
    // map to array of just values
    return Object
        .keys(valueCountMap)
        .map(key => ({ value: key, count: valueCountMap[key] }))
        .sort((a,b) => a.count > b.count ? -1 : 1)
        .filter((value, index, arr) => value.count === arr[0].count)
        .map(value => value.value)
};

// Height median
const heightMedian = median(people.map(p => p.height));
console.log(`Height median: ${heightMedian}`);

// Height mode
const heightMode = mode(people.map(p => p.height));
console.log(`Height mode: [ ${heightMode} ]`);

// Age median
const ageMedian = median(people.map(p => p.age));
console.log(`Age median: ${ageMedian}`);

// Age mode
const ageMode = mode(people.map(p => p.age));
console.log(`Age mode: [ ${ageMode} ]`);

// Reusable population function
// sum(el - mean) / num of elements
const populationVariance =(arr, mean) =>
    arr.map(e => Math.pow(e - mean, 2))
        .reduce((sum, e) => sum + e,0) / arr.length;

// Reusable population function
// sum(el - mean) / num of elements
const sampleVariance =(arr, mean) =>
    arr.map(e => Math.pow(e - mean, 2))
        .reduce((sum, e) => sum + e,0) / (arr.length - 1);

// age population variance and standard deviation
const agePopulation = populationVariance(people.map(p => p.age), ageMean);
const ageStd = Math.sqrt(agePopulation);
console.log(`Age population: ${agePopulation}`);
console.log(`Age standard deviation: ${ageStd}`);

// height population variance and standard deviation
const heightPopulation = populationVariance(people.map(p => p.height), heightMean);
const heightStd = Math.sqrt(heightPopulation);
console.log(`Height population: ${heightPopulation}`);
console.log(`Height standard deviation: ${heightStd}`);

// get people from brazil
const brazilians = people.filter(p => p.country === 'Brazil');
const brazilianHeights = brazilians.map(b => b.height);
const brazilianHeightsMean = mean(brazilianHeights);
console.log(`Brazilian height mean: ${brazilianHeightsMean}`);
const braziliansSampleStd = Math.sqrt(sampleVariance(brazilianHeights, brazilianHeightsMean));
console.log(`Brazilian sample std: ${braziliansSampleStd}`);

// Diff between population std and sample std
console.log(`Population std - sample std: ${heightStd - braziliansSampleStd}`);

// Level 3
C = (
        // n * sum(x * y)
        people.length * people.reduce((sum, person) => sum + (person.height * person.age), 0) -
        // sum(x) * sum(y)
        people.reduce((sum, person) => sum + person.age, 0) * people.reduce((sum, person) => sum + person.height, 0)
    ) /
    Math.sqrt(
        ( // n * (sum(x^2) - sum(x)^2)
            people.length *
            // (sum(x^2)
            people.reduce((sum, p) => sum + p.height * p.height, 0) -
            // sum(x)^2)
            Math.pow(people.reduce((sum, p) => sum + p.height, 0) , 2)
        ) *
        ( // n* (sum(y^2) - sum(y)^2)
            people.length *
            // (sum(y^2)
            people.reduce((sum, p) => sum + p.age * p.age, 0) -
            // sum(y)^2)
            Math.pow(people.reduce((sum, p) => sum + p.age, 0) , 2)
        )
    );
console.log(`Pearson correlation coef: ${C}`);
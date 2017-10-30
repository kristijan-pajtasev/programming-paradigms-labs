const pairs = (arr1, arr2) => {

    arr1 = arr1.filter((e, i, ar) => ar.indexOf(e) === i);
    let uniqueNums = arr2.filter(e => arr1.indexOf(e) , 0);
    return arr1.map(e => arr2.map(ee => [e, ee])).reduce((arr, e) => arr.concat(e), [])
};

console.log(pairs([1,2],[3,4]));
console.log(pairs([1,2,3],[3,4]));
console.log(pairs([1,2,3,3],[3,4]));

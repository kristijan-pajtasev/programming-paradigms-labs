const chat = require("./chatLogs")

const dieterMessages = chat.filter(m => m.uname === "Dieter").length;
console.log(`Num of Dieter messages: ${dieterMessages}`)


const dieterAndPieterMessages =
    chat.filter(m => m.uname === "Dieter" || m.uname === "Pieter").length;
console.log(`Num of Dieter and Pieter messages: ${dieterAndPieterMessages}`)

const totalTypedCharactersWithoutSpace =
    chat.reduce((a, b) => a + b.line.replace(/\s/gi, "").trim().length, 0);
console.log(`Number of characters typed: ${totalTypedCharactersWithoutSpace}`);

const totalNumberOfWords =
    chat.reduce((a, b) => a + b.line.match(/\w+/gi, " ").length, 0);
console.log(`Total number of words: ${totalNumberOfWords}`);

const peopleWhoWroteLobortis =
    chat.filter(msg => msg.line.match(/lobortis/) !== null)
        .map(msg => msg.uname);
console.log(`People who wrote lobortis: [${peopleWhoWroteLobortis}]`);

const timesNullaWasWritten =
    chat.filter(msg => msg.line.match(/nulla/) !== null)
        .reduce((a,b) => a + b.line.match(/nulla/g).length,0);
console.log(`Times nulla was written: ${timesNullaWasWritten}`);

const timesNullaOrnullaWasWritten =
    chat.filter(msg => msg.line.match(/[Nn]ulla/) !== null)
        .reduce((a,b) => a + b.line.match(/[Nn]ulla/g).length,0);
console.log(`Times nulla or Nulla was written: ${timesNullaOrnullaWasWritten}`);

const peopleWroteLinesStartingWithMagna =
    chat.filter(msg => msg.line.match(/^magna/) !== null)
        .map(msg => msg.uname);
console.log(`People who wrote starting with magna: ${peopleWroteLinesStartingWithMagna}`);

const peopleWhoLoggedInDuringFebruary =
    chat.filter(msg =>
        new Date(msg.timestamp).getMonth() === 1)
        .map(msg => msg.uname);
console.log(`People who logged in on Friday: ${peopleWhoLoggedInDuringFebruary}`);
const fs = require('fs');
const inputFilePath = './input.txt'

const file = fs.readFileSync(inputFilePath, 'utf8');
var separateLines = file.match(/[^\r\n]+/g);

const maxColorAmounts = {
    'red': 12,
    'green': 13,
    'blue': 14
}
let resultSum = 0;
separateLines.forEach(line => {
    const splitLine = line.split(":");
    const id = splitLine[0].match(/\d+/)[0];
    const matches = [...splitLine[1].matchAll(/(\d+) (\w+)/g)];
    if(isPossibleGame(matches)){
        resultSum += parseInt(id);
    }; 
})

function isPossibleGame(matches) {
    for (let match of matches) {
        if(maxColorAmounts[match[2]] < match[1]) {
            return false;
        }
    }
    return true;
}

let resultSum2 = 0;
separateLines.forEach(line => {
    const splitLine = line.split(":");
    const matches = [...splitLine[1].matchAll(/(\d+) (\w+)/g)];
    resultSum2 += calculateMinimumColorRequirements(matches);
})

console.log(resultSum2);

function calculateMinimumColorRequirements(matches) {
    let powerOfSet = 1;

    const maxColorValue = {
        'red': 0,
        'green': 0,
        'blue': 0,
    }

    for(let match of matches) {
        if(parseInt(match[1]) > maxColorValue[match[2]]) {
            maxColorValue[match[2]] = parseInt(match[1]);
        } 
    }

    Object.entries(maxColorValue).forEach(amount => {
        powerOfSet *= amount[1];
    })

    console.log(maxColorValue);
    return powerOfSet;
}

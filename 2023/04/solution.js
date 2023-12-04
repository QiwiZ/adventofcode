const fs = require('fs');
const inputFilePath = './input.txt'

const file = fs.readFileSync(inputFilePath, 'utf8');
var separateLines = file.match(/[^\r\n]+/g);

const numberRegex = /\d+/g

let resultSum = 0;

separateLines.forEach(line => {
    let numberOfWinningSelections = 0;

    const splitLine = line.split(":");
    const dividedLine = splitLine[1].split('|');
    const winningNumbers = [...dividedLine[0].matchAll(numberRegex)].map(match => {
        return parseInt(match[0])
    })
    const chosenNumbers = [...dividedLine[1].matchAll(numberRegex)].map(match => {
        return parseInt(match[0])
    })
    
    chosenNumbers.map(number => {
        if(winningNumbers.includes(number)) {
            numberOfWinningSelections++;
        }
    })
    if(numberOfWinningSelections > 0) {
        resultSum += Math.pow(2, numberOfWinningSelections-1);
    }
})

console.log(resultSum);

const fs = require('fs');
const inputFilePath = './input.txt'

const file = fs.readFileSync(inputFilePath, 'utf8');
var separateLines = file.match(/[^\r\n]+/g);

const lineLength = separateLines[0].length + 1;
const specialCharacterRegex = /[*]/g
const numberRegex = /\d+/g

const flatInput = separateLines.join(',');

const numberMatches = flatInput.matchAll(numberRegex);
const gearMatches = flatInput.matchAll(specialCharacterRegex);

let resultSum = 0;
const numbers = [...numberMatches];

[...gearMatches].forEach(gear => {
    let amountOfAdjescentNumbers = 0;
    let gearRatio = 1;

    numbers.forEach(number => {
        const startIndex = number.index;
        const matchLength = number[0].length;
        if(
            startIndex + matchLength === gear.index ||
            startIndex === gear.index + 1
        ) {
            amountOfAdjescentNumbers++;
            gearRatio *= parseInt(number[0]);
        }
        if(
            (gear.index + lineLength >= startIndex-1 && 
            gear.index + lineLength <= startIndex + matchLength)
        ) {
            amountOfAdjescentNumbers++;
            gearRatio *= parseInt(number[0]);
        }
        if(
            (gear.index - lineLength >= startIndex - 1 &&
            gear.index - lineLength <= startIndex + matchLength) 
        ) {
            amountOfAdjescentNumbers++;
            gearRatio *= parseInt(number[0]);
        }
    })
    
    if(amountOfAdjescentNumbers === 2) {
        resultSum += gearRatio;
    }
})

console.log(resultSum)


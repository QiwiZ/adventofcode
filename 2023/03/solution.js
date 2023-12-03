const fs = require('fs');
const inputFilePath = './input.txt'

const file = fs.readFileSync(inputFilePath, 'utf8');
var separateLines = file.match(/[^\r\n]+/g);

const lineLength = separateLines[0].length + 1;
const specialCharacterRegex = /[^.\d,]/g
const numberRegex = /\d+/g

const flatInput = separateLines.join(',');

const matches = flatInput.matchAll(numberRegex);
let resultSum = 0;
[...matches].forEach(match => {
    const startIndex = match.index;
    const matchLength = match[0].length;
    let isSuccess = false;

    if (
        flatInput.charAt(startIndex - 1).match(specialCharacterRegex) ||
        flatInput.charAt(startIndex + matchLength).match(specialCharacterRegex)
    ) {
        isSuccess = true;
    }
    if (!isSuccess) {
        for (let i = startIndex + lineLength - 1; i <= startIndex + lineLength + matchLength; i++) {
            if (flatInput.charAt(i).match(specialCharacterRegex)) {
                isSuccess = true;
            }
        }
    }

    if (!isSuccess) {
        for (let i = startIndex - lineLength - 1; i <= startIndex - lineLength + matchLength; i++) {
            if (flatInput.charAt(i).match(specialCharacterRegex)) {
                isSuccess = true;
            }
        }
    }
    if (isSuccess) {
        resultSum += parseInt(match[0]);
    }
})



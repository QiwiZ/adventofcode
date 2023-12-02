const fs = require('fs');
const inputFilePath = './input.txt'

const file = fs.readFileSync(inputFilePath, 'utf8');

var separateLines = file.match(/[^\r\n]+/g);
let sum = 0
separateLines.forEach(line => {
    const matches = [...line.matchAll(/(\d)|((?<=o)ne|(?<=t)wo|(?<=t)hree|(?<=f)our|(?<=f)ive|(?<=s)ix|(?<=s)even|(?<=e)ight)|(?<=n)ine/g)];
    const firstMatchValue = determineMatchValue(matches[0][0]);
    const lastMatchValue = determineMatchValue(matches[matches.length-1][0]); 
    sum += (parseInt(firstMatchValue+lastMatchValue));
})


console.log(sum);

function determineMatchValue(numberString) {
    const returnValues = {
        'ne': '1',
        'wo': '2',
        'hree': '3',
        'our': '4',
        'ive': '5',
        'ix': '6',
        'even': '7',
        'ight': '8',
        'ine': '9'
    }

    if (returnValues[numberString]) {
        return returnValues[numberString]
    } else {
        return numberString
    }
}
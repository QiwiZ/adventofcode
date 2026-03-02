import * as fs from 'fs';
const inputFilePath = './input.txt'

const file = fs.readFileSync(inputFilePath, 'utf8');


let result = 0;
let regex = /mul\((\d{1,3})\,(\d{1,3})\)/g;
let disableRegex = /don\'t\(\)/g
let enableRegex = /do\(\)/g


const matches = [...file.matchAll(regex)];
const disableMatches = [...file.matchAll(disableRegex)];
const enableMatches = [...file.matchAll(enableRegex)];

matches.forEach(match => {
    if(isMultEnabled(disableMatches, enableMatches, match)) {
        result += match[1] * match[2];
    }
})

function isMultEnabled(disableMatches, enableMatches, match) {
    let filteredDisableMatches = disableMatches.filter(disableMatch => disableMatch.index < match.index);
    let filteredEnableMatches = enableMatches.filter(enableMatch => enableMatch.index < match.index);
    
    if(!filteredDisableMatches.length) return true;
    return filteredEnableMatches.at(-1).index > filteredDisableMatches.at(-1).index
}

console.log(`result is ${result}`)
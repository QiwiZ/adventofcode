import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0;
let regex = /mul\((\d{1,3})\,(\d{1,3})\)/g;

separateLines.forEach(inputLine => {
    const matches = [...inputLine.matchAll(regex)];
    matches.forEach(match => {
        result += match[1] * match[2];
    })
})

console.log(`result is ${result}`)
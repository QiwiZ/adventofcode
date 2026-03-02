import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0
let leftNumbers = new Set([]);
let rightNumbers = {};

separateLines.forEach(line => {
    let numbersOnLine = line.split(' ');
    leftNumbers.add(numbersOnLine.at(0))
    let rightNumber = numbersOnLine.at(3);
    if(!rightNumbers[rightNumber]) {
        rightNumbers[rightNumber] = 0
    }
    rightNumbers[rightNumber] = rightNumbers[rightNumber] + 1
})

leftNumbers.forEach(number => {
    if(rightNumbers[number]) {
        result += number * rightNumbers[number]
    }
})

console.log("The result is: ", result)
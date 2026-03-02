import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0;
let word = ['X','M','A','S']
let matrix = []

separateLines.forEach(inputLine => {
    matrix.push(inputLine.split(""))
})

findWord(matrix)
console.log(`result is ${result}`)

function findWord(matrix) {
    let wordIndex = 0;
    for(let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        for(let letterIndex = 0; letterIndex < matrix[rowIndex].length; letterIndex++) {
            if(matrix[rowIndex][letterIndex] === word[wordIndex]) {
                console.log(`found letter X at rowIndex: ${rowIndex}, letterIndex: ${letterIndex}`)
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, 0, 1, wordIndex + 1) // forwards
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, 0, - 1, wordIndex + 1) // backwards
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, -1 , 0, wordIndex + 1) // up
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, 1, 0, wordIndex + 1) // down
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, -1, 1, wordIndex + 1) // diag up right
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, -1, -1, wordIndex + 1) // diag up left
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, 1, 1, wordIndex + 1) // diag down right
                result += findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex, letterIndex, 1, -1, wordIndex + 1) // diag down left   
            }
         }
    }
}

function findNextLetterInDirection(matrix, nextLetter, rowIndex, letterIndex, xDirection, yDirection, wordIndex) {
    if(!nextLetter){
        return 1;  
    } 
    if(! matrix[rowIndex + xDirection]) return 0;

    if(matrix[rowIndex + xDirection][letterIndex + yDirection] === nextLetter) {
        return findNextLetterInDirection(matrix, word[wordIndex+1], rowIndex + xDirection, letterIndex + yDirection, xDirection, yDirection, wordIndex + 1 )
    }

    return 0;
}
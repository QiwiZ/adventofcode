import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0;
let matrix = []

separateLines.forEach(inputLine => {
    matrix.push(inputLine.split(""))
})

findWord(matrix)
console.log(`result is ${result}`)

function findWord(matrix) {
    for(let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        for(let letterIndex = 0; letterIndex < matrix[rowIndex].length; letterIndex++) {
            result += isCrossPatternMAS(matrix, rowIndex, letterIndex);
         }
    }
}

function isCrossPatternMAS(matrix, rowIndex, letterIndex) {
    if(matrix[rowIndex][letterIndex] === 'A') {
                if(!matrix[rowIndex-1] || !matrix[rowIndex + 1]) {
                    return 0;
                }
                if(((matrix[rowIndex - 1][letterIndex - 1] === 'S' && matrix[rowIndex + 1][letterIndex + 1] === 'M')
                && (matrix[rowIndex - 1][letterIndex + 1] === 'S' && matrix[rowIndex + 1][letterIndex - 1] === 'M'))            
                || ((matrix[rowIndex - 1][letterIndex - 1] === 'M' && matrix[rowIndex + 1][letterIndex + 1] === 'S')
                && (matrix[rowIndex - 1][letterIndex + 1] === 'M' && matrix[rowIndex + 1][letterIndex - 1] === 'S'))
                || ((matrix[rowIndex - 1][letterIndex - 1] === 'M' && matrix[rowIndex + 1][letterIndex + 1] === 'S')
                && (matrix[rowIndex - 1][letterIndex + 1] === 'S' && matrix[rowIndex + 1][letterIndex - 1] === 'M'))
                || ((matrix[rowIndex - 1][letterIndex - 1] === 'S' && matrix[rowIndex + 1][letterIndex + 1] === 'M')
                && (matrix[rowIndex - 1][letterIndex + 1] === 'M' && matrix[rowIndex + 1][letterIndex - 1] === 'S'))
            ) {
                // console.log(`A at rowIndex: ${rowIndex} and letterIndex: ${letterIndex} is a cross. Adding 1 to result: ${result}`)
                    return 1;
                }
    }
    return 0;
}
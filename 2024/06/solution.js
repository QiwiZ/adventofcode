import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0;

let matrix = []

separateLines.forEach(inputLine => {
    matrix.push(inputLine.split(""))
})

function getStartIndex() {
    let startIndex = {};
    for(let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        if(matrix[rowIndex].includes('^')) startIndex[rowIndex] = matrix[rowIndex].indexOf('^'); 
    }

    return startIndex;
}

function determineDistinctGuardPositions() {
    let startIndex = getStartIndex();
    let initialRowIndex = Object.keys(startIndex)[0];
    let initialColumIndex = startIndex[initialRowIndex];

    return foo(initialRowIndex, initialColumIndex);
    
}

function foo(initialRowIndex, initialColumnIndex) {
    let visitedPositions = {};
    let rowLength = matrix[0].length;
    let walking = true;
    let direction = 'up';
    let currentRowIndex = initialRowIndex;
    let currentColumnIndex = initialColumnIndex;
    

    while(walking) {
        switch(direction){
            case 'up':
                for(currentRowIndex; currentRowIndex > 0; currentRowIndex--) {
                    addVisitedLocation(currentRowIndex, currentColumnIndex, visitedPositions);

                    if(matrix[currentRowIndex - 1][currentColumnIndex] === '#') {
                        console.log(`turning right at {${currentRowIndex}, ${currentColumnIndex}}`)
                        direction = 'right';
                        break;
                    }
                }
                break;
            case 'right':
                for(currentColumnIndex; currentColumnIndex < rowLength; currentColumnIndex++) {
                    addVisitedLocation(currentRowIndex, currentColumnIndex, visitedPositions);

                    if(matrix[currentRowIndex][currentColumnIndex + 1] === '#') {
                        console.log(`turning down at {${currentRowIndex}, ${currentColumnIndex}}`)
                        direction = 'down';
                        break;
                    }
                }
                break;
            case 'down':
                for(currentRowIndex; currentRowIndex < matrix.length; currentRowIndex++) {
                    addVisitedLocation(currentRowIndex, currentColumnIndex, visitedPositions);

                    if(currentRowIndex + 1 >= matrix.length) {
                        console.log(`exiting at: {${currentRowIndex}, ${currentColumnIndex}}`)
                        walking = false;
                        break;
                    }

                    if(matrix[currentRowIndex + 1][currentColumnIndex] === '#') {
                        console.log(`turning left at {${currentRowIndex}, ${currentColumnIndex}}`)
                        direction = 'left';
                        break;
                    }
                }
                break;
            case 'left':
                for(currentColumnIndex; currentColumnIndex > 0; currentColumnIndex--) {
                    addVisitedLocation(currentRowIndex, currentColumnIndex, visitedPositions);

                    if(matrix[currentRowIndex][currentColumnIndex - 1] === '#') {
                        console.log(`turning up at {${currentRowIndex}, ${currentColumnIndex}}`)
                        direction = 'up';
                        break;
                    }
                }
                break;
        }
    }
    return visitedPositions;
}

function addVisitedLocation(rowIndex, columnIndex, visitedPositions) {
    if(!visitedPositions[rowIndex]) {
        visitedPositions[rowIndex] = new Set([columnIndex]);
    } else {
        visitedPositions[rowIndex].add(columnIndex);
    }
}

Object.entries(determineDistinctGuardPositions()).forEach(row => {
    result += row[1].size;
})

console.log(`result is ${result}`)


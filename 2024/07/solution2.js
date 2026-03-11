import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0;

separateLines.forEach(inputLine => {
    let desiredNumber = parseInt(inputLine.split(":")[0], 10);
    
    let elements = inputLine.split(":")[1].split(" ");
    elements = elements.filter(element => element).map(number => parseInt(number, 10)) //remove undefined elements and convert to int

    if(isCalculatable(elements[0], 1, desiredNumber, elements)){
        console.log(`adding ${desiredNumber} to result`)
        result += desiredNumber;
    }
    
})

function isCalculatable(intermediateResult, rightTermIndex, desiredNumber, elements) {
    return (calulate(intermediateResult, rightTermIndex, desiredNumber, elements, '+')
    || calulate(intermediateResult, rightTermIndex, desiredNumber, elements, '*')
    || calulate(intermediateResult, rightTermIndex, desiredNumber, elements, '||'));
}

function calulate(intermediateResult, rightTermIndex, desiredNumber, elements, operator) {
    let result;
    let operand = elements[rightTermIndex];
    if(operator === '+') {
        result = intermediateResult + operand;
    } else if (operator === '*') {
        result = intermediateResult * operand;
    } else {
        result = parseInt(intermediateResult.toString() + operand.toString());
    }

    if(result > desiredNumber){
        return false;
    } 

    rightTermIndex += 1

    if(rightTermIndex >= elements.length){
        return result === desiredNumber;
    }

    return (calulate(result, rightTermIndex, desiredNumber, elements, '+')
    || calulate(result, rightTermIndex, desiredNumber, elements, '*')
    || calulate(result, rightTermIndex, desiredNumber, elements, '||'));
}



console.log(`result is ${result}`)


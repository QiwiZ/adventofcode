import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0;

let orderingRules = [];
let updates = [];

orderingRules = separateLines.filter(inputLine => inputLine.includes('|'));
updates = separateLines.filter(inputLine => inputLine.includes(',')).map(update => update.split(','));

let mappedRules = {}

orderingRules.forEach(rule => {
    let ruleElements = rule.split('|');
    let mapElement = ruleElements[1];
    let mandatoryPredecessor = ruleElements[0];

    if(!mappedRules[mapElement]) {
        mappedRules[mapElement] = [mandatoryPredecessor];
    } else {
        mappedRules[mapElement].push(mandatoryPredecessor);
    }
})



let invalidUpdates = updates.filter(update => 
    update.filter(pageNumber => {
        return mappedRules[pageNumber].filter(mandatoryPredecessor => {
            return update.indexOf(mandatoryPredecessor) > update.indexOf(pageNumber)}).length
    }).length
)

function fixOrdering(invalidUpdateSet) {
    invalidUpdateSet.sort((a, b) => {
        if(mappedRules[a].includes(b)) return -1

        return 1;
    })
}

invalidUpdates.map(invalidUpdateSet => fixOrdering(invalidUpdateSet));


invalidUpdates.forEach(validUpdate => result += Number(validUpdate[Math.floor(validUpdate.length / 2)]))

console.log(`result is ${result}`)


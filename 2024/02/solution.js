import readSeparateLinesFromPuzzleInput from "../../common/filereader.mjs"

let separateLines = readSeparateLinesFromPuzzleInput();
let result = 0;

separateLines.forEach(report => {
 let levels = report.split(" ").map(level => parseInt(level));
 if(isSafeReport(levels)) {
    result++;
 }
})

console.log(`result is ${result}`)

function isSafeReport(report) {
    if(isSafeDeminishingLevel(report, 0, 1)) return true;
    else if(isSafeIncreasingLevel(report, 0, 1)) return true;
    else return false;
}

function isSafeDeminishingLevel(report, currentIndex, nextIndex) {
    if(report[nextIndex] === undefined){
        return true;
    } 
    if(report[nextIndex] >= report[currentIndex] ||
        report[nextIndex] < report[currentIndex] - 3
    ) {
        return false;
    }
    return isSafeDeminishingLevel(report, nextIndex, nextIndex+1);
}

function isSafeIncreasingLevel(report, currentIndex, nextIndex) {
    if(report[nextIndex] === undefined) {
        return true;
    } 
    if(report[nextIndex] <= report[currentIndex] || 
        report[nextIndex] > report[currentIndex] + 3
    ) {
        return false;
    }
    return isSafeIncreasingLevel(report, nextIndex, nextIndex+1);
}
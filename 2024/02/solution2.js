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
    if(isSafeDeminishingLevel(report, 0, 1, true)) return true;
    else if(isSafeIncreasingLevel(report, 0, 1, true)) return true;
    else return false;
}

function isSafeDeminishingLevel(report, currentIndex, nextIndex, initialAtempt) {
    if(report[nextIndex] === undefined){
        return true;
    } 
    if(report[nextIndex] >= report[currentIndex] || 
        report[nextIndex] < report[currentIndex] - 3) {
        if(initialAtempt) {
            return isSafeDeminishingLevel(report, currentIndex-1, nextIndex, false) || 
            isSafeDeminishingLevel(report, currentIndex, nextIndex + 1, false);
        }
        return false;
    }
    return isSafeDeminishingLevel(report, nextIndex, nextIndex+1, initialAtempt);
}

function isSafeIncreasingLevel(report, currentIndex, nextIndex, initialAtempt) {
    if(report[nextIndex] === undefined) {
        return true;
    } 
    if(report[nextIndex] <= report[currentIndex] ||
        report[nextIndex] > report[currentIndex] + 3
    ) {
        if(initialAtempt) {
            return isSafeIncreasingLevel(report, currentIndex-1, nextIndex, false) || 
            isSafeIncreasingLevel(report, currentIndex, nextIndex + 1, false);
        }
        return false;
    } 
    return isSafeIncreasingLevel(report, nextIndex, nextIndex+1, initialAtempt);
}

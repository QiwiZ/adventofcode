const fs = require('fs');
const inputFilePath = './input.txt'

const file = fs.readFileSync(inputFilePath, 'utf8');
var separateLines = file.match(/[^\r\n]+/g);

const numberRegex = /\d+/g

const dividedCards = separateLines.map(line => {
    return line.split(':')[1].split('|');
})
let copiesPerCard = {};

dividedCards.map((card, index) => {
    if(copiesPerCard[index]===undefined) {
        copiesPerCard[index] = 0
    }
    copiesPerCard[index]++

    const cardWins = calculateCardWins(card);
    for(let i = 0; i < copiesPerCard[index]; i++) {
        for(let j = 0; j < cardWins; j++) {
            if(copiesPerCard[index+1+j]===undefined) {
                copiesPerCard[index+1+j] = 0
            }
            copiesPerCard[index+1+j]++
        }
    }
})

let resultSum = Object.entries(copiesPerCard).map(card => {
    return card[1]
}).reduce((acc, value) => acc + value, 0)

console.log(resultSum)

function calculateCardWins(dividedCard) {
    let numberOfWinningSelections = 0;

    const winningNumbers = [...dividedCard[0].matchAll(numberRegex)].map(match => {
        return parseInt(match[0]);
    });
    const chosenNumbers = [...dividedCard[1].matchAll(numberRegex)].map(match => {
        return parseInt(match[0]);
    });

    chosenNumbers.map(number => {
        if(winningNumbers.includes(number)) {
            numberOfWinningSelections++;
        }
    })
    return numberOfWinningSelections;
}
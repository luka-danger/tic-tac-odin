// Create Player Factor 
const createPlayer = (playerName, playerSymbol) => {
    return {
        playerName,
        playerSymbol
    }
}

// Game IIFE
const Game = (() => {

})();

let gameboard; 
const player1 = 'X';
const computer = 'O';
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const squares = document.querySelectorAll('.square');
// Turn to an IFFE
startGame();

function startGame() {
    // DELETE LATER??
    document.querySelector('.endgame').style.display = "none";

    gameboard = Array.from(Array(9).keys());
    console.log(gameboard);
    // change to a forEach
    squares.forEach((square) => {
        square.innerText = '';
        square.style.removeProperty('background-color');
        square.addEventListener('click', handleClick)
    })
}

function handleClick(square) {
    console.log(square.target.id)
}
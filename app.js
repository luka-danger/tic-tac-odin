// New Code

let gameBoard; 
const player1 = 'X';
const computerPlayer = 'O';
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


// Gameboard IIFE
const Gameboard = (() => {
    
})();

// Create Player Factory
const createPlayer = (playerName, playerSymbol) => {
    return {
        playerName,
        playerSymbol
    }
}

function startGame() {
    const squares = document.querySelectorAll('.cell');
    squares.forEach((square) => {
        square.addEventListener('click', handleClick)
    })
}

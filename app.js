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
    const startGame = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick)
        })
    }

    return {
        startGame
    }
})();

// Create Player Factory
const createPlayer = (playerName, playerSymbol) => {
    return {
        playerName,
        playerSymbol
    }
}

// Game IIFE
const Game = (() => {
    const handleClick = () => {
        let index;
        console.log((`Square clicked`))

    }

    return {
        handleClick
    }
})();


const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    let myName = document.querySelector('#player1').value;
    console.log(`${myName} started the game!`)
    Gameboard.startGame();
})
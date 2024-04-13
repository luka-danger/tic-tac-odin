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


function startGame() {
    // DELETE LATER??
    document.querySelector('.endgame').style.display = "none";

    gameboard = Array.from(Array(9).keys());
    // change to a forEach
    squares.forEach((square) => {
        square.innerText = '';
        square.style.removeProperty('background-color');
        square.addEventListener('click', handleClick)
    })
}
startGame();

function handleClick(square) {
    // If TypeOf Id is a number, it means that nobody has played in square
    if (typeof gameboard[square.target.id] =='number') {
        playerTurn(square.target.id, player1);
    }
    if (!checkTie()) turn(bestSpot(), computer);
}

function playerTurn(squareID, player){
    gameboard[squareID] = player;
    document.getElementById(squareID).innerHTML = player;
    let gameWon = checkForWin(gameboard)
    if (gameWon) {
        gameOver(gameWon) 
    } 
}

function checkForWin(board) {
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
    for (let i = 0; i < winningCombo.length; i++) {
        const [a, b, c] = winningCombo[i];
        if (board[a] && board[a] === board[b] &&  board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    squares.forEach((square) => {
        square.removeEventListener('click', handleClick)
    })
}


function emptySquares() {
    return gameboard.filter(s => typeof s == 'number')
}

// Play in first emptySquare
function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length == 0) {
        squares.forEach((square) => {
            square.backgroundColor = 'green'
        })
        declareWinner("Tie Game");
        return true;
    }
    return false;
}

const replayButton = document.querySelector('#replay-button');
replayButton.addEventListener('click', () => {
    startGame();
})



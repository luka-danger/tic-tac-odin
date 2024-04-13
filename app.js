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
        square.addEventListener('click', handleClick);
    })
}
startGame();

function handleClick(square) {
    // If TypeOf Id is a number, it means that nobody has played in square
    if (typeof gameboard[square.target.id] == 'number') {
        playerTurn(square.target.id, player1);
    }
        if (!checkTie()) {
            playerTurn(easyMode(), computer);
        }
}

function playerTurn(squareID, player){
    gameboard[squareID] = player;
    document.getElementById(squareID).innerHTML = player;
    let gameWon = checkForWin(gameboard, player)
    if (gameWon) {
        gameOver(gameWon) 
    } 
}


function checkForWin(board, player) {
	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winningCombo.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winningCombo[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == player1 ? "blue" : "red";
	}
	squares.forEach((square) => {
		square.removeEventListener('click', handleClick);
	})
	declareWinner(gameWon.player == player1 ? "You win!" : "Loser");
}

function emptySquares() {
    return gameboard.filter(s => typeof s == 'number')
}

// Play in first emptySquare
function easyMode() {
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



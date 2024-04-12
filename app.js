// New Code

let gameBoard; 
const player1 = 'X';
const computerPlayer = 'O';


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

// Game IIFE
const Game = (() => {
    let players = [];

    const startGame = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, 'X'),
            createPlayer(computerPlayer, 'O')
        ]


        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', handleClick)
        })
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
})();







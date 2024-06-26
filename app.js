// Create Player Factory
const createPlayer = (symbol) => {
    return symbol
}

// Game IIFE
const Game = (() => {
    let gameboard;

    const player1 = createPlayer('X');
    const computer = createPlayer('O');
    
    const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const squares = document.querySelectorAll('.square');
    startGame();

    function startGame() {
        document.querySelector('.endgame').style.display = "none";

        gameboard = Array.from(Array(9).keys());
        squares.forEach((square) => {
            square.innerText = '';
            square.style.removeProperty('background-color');
            square.addEventListener('click', handleClick);
        });
    }

    function handleClick(square) {
        if (typeof gameboard[square.target.id] == 'number') {
            playerTurn(square.target.id, player1);
            if (!checkForWin(gameboard, player1) && !checkTie()) playerTurn(computerPlay(), computer);
        }
    }

    function playerTurn(squareID, player){
        gameboard[squareID] = player;
        document.getElementById(squareID).innerText = player;
        let gameWon = checkForWin(gameboard, player);
        if (gameWon) {
            gameOver(gameWon);
        }
    }

    function checkForWin(board, player) {
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
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
                gameWon.player == player1 ? "gray" : "gray";
        }
        squares.forEach((square) => {
            square.removeEventListener('click', handleClick);
        });
        declareWinner(gameWon.player == player1 ? "You win!" : "Loser!");
    }

    function declareWinner(who) {
        document.querySelector('.endgame').style.display = "block";
        document.querySelector('.endgame #message').innerText = who;
    }

    function emptySquares() {
        return gameboard.filter(s => typeof s == 'number');
    }

    function computerPlay() {
        return minimax(gameboard, computer).index;
    }

    function checkTie() {
        if (emptySquares().length == 0) {
            squares.forEach((square) => {
                square.backgroundColor = 'gray';
                square.removeEventListener('click', handleClick);
            });
            declareWinner("Tie Game");
            return true;
        }
        return false;
    }

    function minimax(newBoard, player) {
        let availableSpots = emptySquares();

        if (checkForWin(newBoard, player1)) {
            return {score: -10};
        }
        else if (checkForWin(newBoard, computer)) {
            return {score: 10};
        }
        else if (availableSpots.length === 0) {
            return {score: 0};
        }
        let moves = [];
        for (let i = 0; i < availableSpots.length; i++) {
            let move = {};
            move.index = newBoard[availableSpots[i]];
            newBoard[availableSpots[i]] = player;

            if (player == computer) {
                let result = minimax(newBoard, player1);
                move.score = result.score;
            }
            else {
                let result = minimax(newBoard, computer);
                move.score = result.score;
            }

            newBoard[availableSpots[i]] = move.index;

            moves.push(move);
        }

        let bestMove;
        if (player === computer) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    // Replay Button
    const replayButton = document.querySelector('#replay-button');
    replayButton.addEventListener('click', () => {
        startGame();
    });
})();
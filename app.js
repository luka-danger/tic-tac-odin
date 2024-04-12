// Gameboard Factory Function / IIFE

const displayController = (() => {
    const displayMessage = (message) => {
        document.querySelector('#message').innerHTML = message;
    }
    return {
        displayMessage
    }
})();

const Gameboard = (() => {
    // Empty array with length of 9 
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const displayBoard = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        })
    }

    const updateBoard = (index, value) => {
        gameboard[index] = value;
        displayBoard();
    }

    const getGameboard = () => gameboard;

    return {
        displayBoard,
        updateBoard,
        getGameboard
    }
})();

const createPlayer = (playerName, symbol) => {
    return {
        playerName,
        symbol
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const startGame = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.displayBoard();
        
    }

    const handleClick = (event) => {
        // Split separates words ex: "Square", 1
        // instead of "s", "q", "u"...etc
        // Return [1] to only return index number
        let index = event.target.id.split("-")[1];

        // Prevent non-empty squares from being changed
        if (Gameboard.getGameboard()[index] !== "") {
            return 
        }
        Gameboard.updateBoard(index, players[currentPlayerIndex].symbol);

        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].symbol)) {
            gameOver = true;
            displayController.displayMessage(`${players[currentPlayerIndex].playerName} wins!`)
        }
        else if (checkForTie(Gameboard.getGameboard())){
            gameOver = true;
            displayController.displayMessage("It's a tie")
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
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

    function checkForTie(board) {
        return board.every(cell => cell !== "")
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) { 
            Gameboard.updateBoard(i, "");
        }
        Gameboard.displayBoard();
        document.querySelector('#message').innerText = "";
    }

    return {
        startGame,
        restart,
        handleClick
    }
})();

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    Game.startGame();
})

const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', () => {
    Game.restart();
})







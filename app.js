// Gameboard Factory Function / IIFE

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
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) { 
            Gameboard.updateBoard(i, "");
        }
        Gameboard.displayBoard();
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







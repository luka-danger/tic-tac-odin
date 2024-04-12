// Gameboard Factory Function / IIFE

const Gameboard = (() => {
    // Empty array with length of 9 
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const displayBoard = () => {
        let boardHTML = "";
        gameboard.forEach((grid, index) => {
            boardHTML += `<div class="grid" id="grid-${index}">${grid}</div>`
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
    }

    return {
        displayBoard,
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
    return {
        startGame,
    }
})();

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    Game.startGame();
})

const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', () => {
    console.log("You reset the game...");
})






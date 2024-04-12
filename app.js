// Gameboard Factory Function / IIFE

const gameBoard = (() => {
    // Empty array with length of 9 
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const displayBoard = () => {
        let boardHTML = "";
        gameboard.forEach((grid, index) => {
            boardHTML += `<div class="grid" id="grid-${index}">${grid}</div>`
        })
    }
    document.querySelector('#gameboard').innerHTML = boardHTML;

    return {
        displayBoard,
    }
})();

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    console.log("The game has started!")
})

const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', () => {
    console.log("You reset the game...");
})






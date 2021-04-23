//dark mode switch
const switchMode = (function () {
  let switchButton = document.getElementById("switch-button");
  const root = document.documentElement;
  let toggle = "off";
  switchButton.onclick = function () {
    if (toggle == "off") {
      console.log("light");
      toggle = "on";
      root.style.setProperty("--color-one", "white");
      root.style.setProperty("--color-two", "black");
    } else if (toggle == "on") {
      console.log("dark");
      toggle = "off";
      root.style.setProperty("--color-one", "black");
      root.style.setProperty("--color-two", "white");
    }
  };
})();

const gameboardModule = (function () {
  let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const winningCells = [
    [0, 1, 2],
    [5, 4, 3],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  console.log(winningCells);

  // player winner checker
  const checkArrays = function (arr2) {
    for (i = 0; i < 8; i++) {
      if (winningCells[i].every((val) => arr2.includes(val))) {
        return "win";
      }
    }
  };

  //bot move checker
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let randomNumber;
  let newMove;
  let botArray = [];

  const chooseRandomMove = function () {
    newRandom = getRandomInt(gameBoard.length);
    randomNumber = gameBoard[newRandom];
    console.log(`spliced ${randomNumber}`);
    botArray.push(randomNumber);
    gameBoard.splice(newRandom, 1);
  };

  //function for clicking on a cell
  const chooseCell = (function () {
    //document elements
    const root = document.documentElement;

    const roundStatusText = document.getElementById("round-status-text");
    // variables
    let playerArray = [];

    let botRandomMove = [];
    let gameOver = false;
    // choose symbol
    let playerChoice = "";
    let botChoice = "";
    const choosePlayer = (function () {
      document.addEventListener("click", (e) => {
        if (e.target.matches(".select-button")) {
          playerChoice = e.target.getAttribute("data-player-selection");
          console.log("player chose " + playerChoice);
          //hide buttons
          root.style.setProperty("--select-hidden", "hidden");
          // choose bot symbol
          if (playerChoice == "X") {
            botChoice = "O";
          } else {
            botChoice = "X";
          }
          console.log(`bot chose ${botChoice}`);
        }
      });
    })();
    //restart

    // choose cell
    document.addEventListener("click", (e) => {
      //if target matches cell hasnt been given chosen class yet and player has picked symbol run function
      if (
        e.target.matches(".cell") &&
        !e.target.matches(".chosen-cell") &&
        playerChoice != "" &&
        playerArray.length < 5 &&
        gameOver == false
      ) {
        const dataCell = e.target.getAttribute("data-cell");
        console.log("cell " + dataCell + " clicked");
        const _writeChoice = (function () {
          const _selectedCell = e.target;
          const _createChoice = document.createElement("p");
          const _addText = document.createTextNode(playerChoice);
          _createChoice.appendChild(_addText);
          _createChoice.setAttribute("id", dataCell);
          _selectedCell.appendChild(_createChoice);
          _selectedCell.classList.add("chosen-cell");
          //add cell to player's array and remove from gameboard
          playerArray.push(parseInt(e.target.getAttribute("data-cell")));
          gameBoard.splice(gameBoard.indexOf(parseInt(dataCell)), 1);
          console.log(`player spliced ${gameBoard}`);
          //check for tie
          if (gameBoard == []) {
            gameOver = true;
            root.style.setProperty("--restart-hidden", "visible");
            roundStatusText.appendChild(document.createTextNode("TIE"));
          }
          if (checkArrays(playerArray) == "win") {
            //check for win
            gameOver = true;
            root.style.setProperty("--restart-hidden", "visible");
            roundStatusText.appendChild(document.createTextNode("YOU WIN"));
          } else if (gameBoard.length == 0) {
            gameOver = true;
            root.style.setProperty("--restart-hidden", "visible");
            roundStatusText.appendChild(document.createTextNode("TIE"));
          } else {
            chooseRandomMove();
            let botSelectedCell = document.querySelector(
              `[data-cell="${randomNumber}"]`
            );

            console.log(gameBoard);
            let createBotChoice = document.createElement("p");
            let addBotText = document.createTextNode(botChoice);
            createBotChoice.appendChild(addBotText);
            createBotChoice.setAttribute("id", randomNumber);
            botSelectedCell.appendChild(createBotChoice);
            botSelectedCell.classList.add("chosen-cell");

            if (checkArrays(botArray) == "win") {
              gameOver = true;
              root.style.setProperty("--restart-hidden", "visible");
              roundStatusText.appendChild(document.createTextNode("BOT WINS"));
            }
          }
        })();
      }
    });
  })();
})();

const restartButton = document.getElementById("restart-button");
restartButton.onclick = function () {
  location.reload();
};

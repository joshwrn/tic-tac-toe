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
  let gameBoard = [];
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

  // div id's

  console.log(winningCells);

  const checkArrays = function (arr2) {
    for (i = 0; i < 8; i++) {
      console.log(winningCells[i]);
      if (winningCells[i].every((val) => arr2.includes(val))) {
        return "trusies";
      }
    }
  };

  console.log("check test " + checkArrays([4, 2, 6]));

  //function for clicking on a cell
  const chooseCell = (function () {
    // variables
    let playerArray = [];
    let pcArray = [];
    // choose symbol
    let playerChoice = "";
    const choosePlayer = (function () {
      document.addEventListener("click", (e) => {
        if (e.target.matches(".select-button")) {
          playerChoice = e.target.getAttribute("data-player-selection");
          console.log("player chose " + playerChoice);
          //hide buttons
          const root = document.documentElement;
          root.style.setProperty("--select-hidden", "hidden");
        }
      });
    })();
    // choose cell
    document.addEventListener("click", (e) => {
      //if target matches cell hasnt been given chosen class yet and player has picked symbol run function
      if (
        e.target.matches(".cell") &&
        !e.target.matches(".chosen-cell") &&
        playerChoice != "" &&
        playerArray.length < 5
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
          //add cell to player's array
          playerArray.push(e.target.getAttribute("data-cell"));
          console.log(playerArray);
          console.log(zero);
          if (
            (zero.textContent.includes(playerChoice) &&
              one.textContent.includes(playerChoice) &&
              two.textContent.includes(playerChoice)) ||
            (three.textContent.includes(playerChoice) &&
              four.textContent.includes(playerChoice) &&
              five.textContent.includes(playerChoice)) ||
            (six.textContent.includes(playerChoice) &&
              seven.textContent.includes(playerChoice) &&
              eight.textContent.includes(playerChoice)) ||
            (zero.textContent.includes(playerChoice) &&
              three.textContent.includes(playerChoice) &&
              six.textContent.includes(playerChoice)) ||
            (one.textContent.includes(playerChoice) &&
              four.textContent.includes(playerChoice) &&
              seven.textContent.includes(playerChoice)) ||
            (two.textContent.includes(playerChoice) &&
              five.textContent.includes(playerChoice) &&
              eight.textContent.includes(playerChoice)) ||
            (zero.textContent.includes(playerChoice) &&
              four.textContent.includes(playerChoice) &&
              eight.textContent.includes(playerChoice)) ||
            (six.textContent.includes(playerChoice) &&
              four.textContent.includes(playerChoice) &&
              two.textContent.includes(playerChoice))
          ) {
            const zero = document.getElementById("0");
            const one = document.getElementById("1");
            const two = document.getElementById("2");
            const three = document.getElementById("3");
            const four = document.getElementById("4");
            const five = document.getElementById("5");
            const six = document.getElementById("6");
            const seven = document.getElementById("7");
            const eight = document.getElementById("8");
            console.log("you win");
          }
        })();
      }
    });
  })();
})();

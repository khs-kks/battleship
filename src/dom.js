import Gameloop from "./gameloop";
import Player from "./player";

export default class UI {
  static newGameBtn = document.querySelector("button.new-game");

  static howToBtn = document.querySelector("button.how-to");
  // ###########################
  // HOW-TO-PLAY MODAL
  // ###########################

  static howToPlayModal = document.querySelector(".how-to-play-modal");

  static closeBtn = document.querySelector("span.close-button");
  // ##########################
  // PLACE SHIPS MODAL
  // ##########################

  static placeShipsModal = document.querySelector(".place-ships-modal");

  static shipInfoPara = document.querySelector(".info-ship-name-length");

  static inputRow = document.querySelector("#row");

  static inputColumn = document.querySelector("#column");

  static horizontalRadio = document.querySelector("#horizontal");

  static verticalRadio = document.querySelector("#vertical");

  static placeShipOrStartGameBtn = document.querySelector(".place-ship-button");

  static errorPlacingShip = document.querySelector(".error-placing");

  static #placedShipsCounter = 0;

  static #shipsToPlace = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
  ];

  // ##########################
  // WINNER ANNOUNCEMENT MODAL
  // ##########################

  static announcementModal = document.querySelector(".announcement-modal");

  static closeAnnouncementModal = document.querySelector("button.restart-game");

  static displayWinner = document.querySelector(
    ".announcement-modal-content p"
  );

  // ##########################
  // GAMEBOARDS
  // ##########################

  static selectShipsGrid = document.querySelector(".grid-select-ships");

  static aiBoardGrid = document.querySelector(".aiboard-grid");

  static yourBoardGrid = document.querySelector(".yourboard-grid");

  // ##########################
  // DRAW THE GAMEBOARDS
  // ##########################

  static renderAddShipGameboard() {
    UI.selectShipsGrid.innerHTML = "";
    UI.renderShipNameToPlace();

    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        const gameboardCell = document.createElement("div");
        gameboardCell.dataset.row = row.toString();
        gameboardCell.dataset.column = column.toString();
        gameboardCell.classList.add("cell-relative");
        UI.selectShipsGrid.appendChild(gameboardCell);

        const isShipPlaced = Gameloop.player.gameboard.grid.some(
          (cell) => cell[0] === row && cell[1] === column && cell[2]
        );
        if (isShipPlaced) {
          gameboardCell.textContent = "X";
          gameboardCell.classList.add("placed-ship");
        }
      }
    }
  }

  static renderShipNameToPlace() {
    if (UI.#placedShipsCounter < UI.#shipsToPlace.length) {
      const { name, length } = UI.#shipsToPlace[UI.#placedShipsCounter];
      UI.shipInfoPara.textContent = `Place your ${name}, length ${length}`;
    }
  }

  static handlePlaceShipOrStartGameClick() {
    const shipLength = UI.#shipsToPlace[UI.#placedShipsCounter].length;
    const row = +UI.inputRow.value;
    const column = +UI.inputColumn.value;
    const orientation = UI.horizontalRadio.checked ? "horizontal" : "vertical";

    if (!UI.inputRow.checkValidity() || !UI.inputColumn.checkValidity()) {
      UI.errorPlacingShip.textContent = "Invalid Input";
      UI.errorPlacingShip.classList.add("error-placing-visible");
      return;
    }

    try {
      Gameloop.player.gameboard.placeShip(shipLength, row, column, orientation);
      UI.#placedShipsCounter += 1;
      UI.renderAddShipGameboard();
      UI.renderShipNameToPlace();
      UI.errorPlacingShip.classList.remove("error-placing-visible");
    } catch (error) {
      UI.errorPlacingShip.textContent = error;
      UI.errorPlacingShip.classList.add("error-placing-visible");
    }

    if (UI.#placedShipsCounter === UI.#shipsToPlace.length) {
      UI.placeShipOrStartGameBtn.textContent = "Start game";
      UI.shipInfoPara.textContent = "All ships set! Ready to roll!";
    }
  }

  // ##########################
  // MAIN GAME AND BOARDS
  // ##########################

  static renderPlayerBoard() {
    UI.yourBoardGrid.innerHTML = "";
    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        const gameboardCell = document.createElement("div");
        gameboardCell.dataset.row = row.toString();
        gameboardCell.dataset.column = column.toString();
        
        UI.yourBoardGrid.appendChild(gameboardCell);

        const isShipPlaced = Gameloop.player.gameboard.grid.some(
          (cell) => cell[0] === row && cell[1] === column && cell[2]
        );
        if (isShipPlaced) {
          gameboardCell.textContent = "X";
          gameboardCell.classList.add("myships");
        }

        for (let i = 0; i < Gameloop.player.gameboard.attacks.length; i += 1) {
          if (
            Gameloop.player.gameboard.attacks[i][0] === row &&
            Gameloop.player.gameboard.attacks[i][1] === column
          ) {
            if (Gameloop.player.gameboard.attacks[i][2] === "+") {
              gameboardCell.classList.add("hit");
            } else if (Gameloop.player.gameboard.attacks[i][2] === "-") {
              gameboardCell.classList.add("miss");
            }
          }
        }
      }
    }
  }

  static renderComputerBoard() {
    UI.aiBoardGrid.innerHTML = "";
    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        const gameboardCell = document.createElement("div");
        gameboardCell.dataset.row = row.toString();
        gameboardCell.dataset.column = column.toString();
        
        UI.aiBoardGrid.appendChild(gameboardCell);

        for (
          let i = 0;
          i < Gameloop.computer.gameboard.attacks.length;
          i += 1
        ) {
          if (
            Gameloop.computer.gameboard.attacks[i][0] === row &&
            Gameloop.computer.gameboard.attacks[i][1] === column
          ) {
            if (Gameloop.computer.gameboard.attacks[i][2] === "+") {
              gameboardCell.classList.add("hit");
              gameboardCell.textContent = "X";
              gameboardCell.classList.add("already-clicked");
            } else if (Gameloop.computer.gameboard.attacks[i][2] === "-") {
              gameboardCell.classList.add("miss");
              gameboardCell.classList.add("already-clicked");
            }
          }
        }
      }
    }
  }

  // ##########################
  // ADD EVENT LISTENERS
  // ##########################

  static eventListeners() {
    UI.newGameBtn.addEventListener("click", () => {
      Gameloop.player = null;
      Gameloop.computer = null;
      Gameloop.winner = null;

      Gameloop.player = new Player("Kris");
      Gameloop.computer = new Player();

      UI.#placedShipsCounter = 0;
      UI.renderAddShipGameboard();
      UI.renderShipNameToPlace();
      UI.inputRow.value = "";
      UI.inputColumn.value = "";
      UI.placeShipOrStartGameBtn.textContent = "Place ship";

      UI.placeShipsModal.classList.add("place-ships-modal-visible");
    });

    UI.howToBtn.addEventListener("click", () => {
      UI.howToPlayModal.classList.add("how-to-play-modal-visible");
    });

    UI.closeBtn.addEventListener("click", () => {
      UI.howToPlayModal.classList.remove("how-to-play-modal-visible");
    });

    UI.placeShipOrStartGameBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (UI.placeShipOrStartGameBtn.textContent === "Start game") {
        UI.placeShipsModal.classList.remove("place-ships-modal-visible");
        Gameloop.computer.gameboard.placeShipAutomatically(5);
        Gameloop.computer.gameboard.placeShipAutomatically(4);
        Gameloop.computer.gameboard.placeShipAutomatically(3);
        Gameloop.computer.gameboard.placeShipAutomatically(3);
        Gameloop.computer.gameboard.placeShipAutomatically(2);

        UI.renderPlayerBoard();
        UI.renderComputerBoard();
        UI.gameStarted();
      } else {
        UI.handlePlaceShipOrStartGameClick();
      }
    });
  }

  // ##########################
  // MAIN GAME LOGIC
  // ##########################

  static gameStarted() {
    Gameloop.checkWinner();

    if (!Gameloop.winner) {
      UI.renderPlayerBoard();
      UI.renderComputerBoard();

      const aiBoard = [...document.querySelectorAll(".aiboard-grid div")];

      for (let i = 0; i < aiBoard.length; i += 1) {
        if (aiBoard[i].classList.length === 0) {
          // Get the value of the data-row attribute as a number
          const row = Number(aiBoard[i].dataset.row);

          // Get the value of the data-column attribute as a number
          const column = Number(aiBoard[i].dataset.column);

          aiBoard[i].addEventListener("click", () => {
            Gameloop.player.manualAttack(Gameloop.computer, row, column);
            Gameloop.computer.automaticAttack(Gameloop.player);

            UI.renderComputerBoard();
            UI.renderPlayerBoard();

            UI.gameStarted();
          });
        }
      }
    } else {
      UI.announcementModal.classList.add("announcement-modal-visible");
      if (Gameloop.winner.name === "Kris") {
        UI.displayWinner.textContent = "You won the battle!";
      } else {
        UI.displayWinner.textContent = "You lost the battle!";
      }

      UI.closeAnnouncementModal.addEventListener("click", () => {
        UI.announcementModal.classList.remove("announcement-modal-visible");
      });
    }
  }
}

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

  static restartGameBtn = document.querySelector("button.restart-game");

  // ##########################
  // GAMEBOARDS
  // ##########################

  static selectShipsGrid = document.querySelector(".grid-select-ships");

  static aiBoardGrid = document.querySelector(".aiboard-grid");

  static yourBoardGrid = document.querySelector(".yourboard-grid");

  // ##########################
  // DRAW THE GAMEBOARDS
  // ##########################

  static drawGameboards() {
    UI.selectShipsGrid.innerHTML = "";
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const singleCell = document.createElement("div");
        singleCell.dataset.row = i.toString();
        singleCell.dataset.column = j.toString();
        singleCell.classList.add("cell-relative");

        UI.selectShipsGrid.appendChild(singleCell);
      }
    }

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const singleCell = document.createElement("div");
        singleCell.dataset.row = i.toString();
        singleCell.dataset.column = j.toString();
        singleCell.classList.add("myships");
        // singleCell.textContent = "X";
        const singleCell2 = singleCell.cloneNode(true);
        UI.aiBoardGrid.appendChild(singleCell);
        UI.yourBoardGrid.appendChild(singleCell2);
      }
    }
  }

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
  // ADD EVENT LISTENERS
  // ##########################

  static eventListeners() {
    UI.newGameBtn.addEventListener("click", () => {
      Gameloop.player = null;
      Gameloop.computer = null;

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
        console.log("OK! Ready to start!");
        UI.placeShipsModal.classList.remove("place-ships-modal-visible");
        Gameloop.computer.gameboard.placeShipAutomatically(5);
        Gameloop.computer.gameboard.placeShipAutomatically(4);
        Gameloop.computer.gameboard.placeShipAutomatically(3);
        Gameloop.computer.gameboard.placeShipAutomatically(3);
        Gameloop.computer.gameboard.placeShipAutomatically(2);

        // DONE: set modal to display: none
        // DONE: generate the AI ships
        // render the player's ships on main page
      } else {
        UI.handlePlaceShipOrStartGameClick();
      }
    });
  }
}

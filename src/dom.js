import Gameloop from "./gameloop";
export default class UI {
  static newGameBtn = document.querySelector("button.new-game");
  static howToBtn = document.querySelector("button.how-to");

  // HOW-TO-PLAY MODAL
  static howToPlayModal = document.querySelector(".how-to-play-modal");
  static closeBtn = document.querySelector("span.close-button");

  // PLACE SHIPS MODAL
  static placeShipsModal = document.querySelector(".place-ships-modal");
  static shipInfoPara = document.querySelector(".info-ship-name-length");
  static inputRow = document.querySelector("#row");
  static inputColumn = document.querySelector("#column");
  static horizontalRadio = document.querySelector("#horizontal");
  static verticalRadio = document.querySelector("#vertical");
  static placeShipOrStartGameBtn = document.querySelector(".place-ship-button");
  static errorPlacingShip = document.querySelector(".error-placing");
  static placedShipsCounter = 0;
  static shipsToPlace = [
    ["Carrier", 5],
    ["Battleship", 4],
    ["Cruiser", 3],
    ["Submarine", 3],
    ["Destroyer", 2],
  ];

  // WINNER ANNOUNCEMENT MODAL
  static restartGameBtn = document.querySelector("button.restart-game");

  // GAMEBOARDS
  static selectShipsGrid = document.querySelector(".grid-select-ships");
  static aiBoardGrid = document.querySelector(".aiboard-grid");
  static yourBoardGrid = document.querySelector(".yourboard-grid");

  // DRAW THE GAMEBOARDS
  static drawGameboards() {
    UI.selectShipsGrid.innerHTML = "";
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const singleCell = document.createElement("div");
        singleCell.dataset.row = i.toString();
        singleCell.dataset.column = j.toString();
        // singleCell.textContent = "X";
        // singleCell.classList.add("placed-ship");
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

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const singleCell = document.createElement("div");
        singleCell.dataset.row = i.toString();
        singleCell.dataset.column = j.toString();

        singleCell.classList.add("cell-relative");
        UI.selectShipsGrid.appendChild(singleCell);

        const gridElement = Gameloop.player.gameboard.grid.find(
          (el) => el[0] === i && el[1] === j
        );
        if (gridElement && gridElement[2]) {
          singleCell.textContent = "X";
          singleCell.classList.add("placed-ship");
        }
      }
    }
  }

  static renderShipNameToPlace() {
    if (UI.placedShipsCounter < 5) {
      const shipName = UI.shipsToPlace[UI.placedShipsCounter][0];
      const shipLength = UI.shipsToPlace[UI.placedShipsCounter][1];
      UI.shipInfoPara.textContent = `Place your ${shipName}, length ${shipLength}`;
    } else {
      //Change button to start game ane actually start it
      console.log("OPS");
    }
  }

  // ADD EVENT LISTENERS
  static eventListeners() {
    UI.newGameBtn.addEventListener("click", () => {
      UI.placeShipsModal.classList.add("place-ships-modal-visible");
      UI.renderShipNameToPlace();
    });

    UI.howToBtn.addEventListener("click", () => {
      UI.howToPlayModal.classList.add("how-to-play-modal-visible");
    });

    UI.closeBtn.addEventListener("click", () => {
      UI.howToPlayModal.classList.remove("how-to-play-modal-visible");
    });

    UI.placeShipOrStartGameBtn.addEventListener("click", (e) => {
      e.preventDefault();

      UI.renderShipNameToPlace();

      let placement = null;
      if (UI.horizontalRadio.checked) {
        placement = "horizontal";
      } else {
        placement = "vertical";
      }

      if (UI.inputRow.checkValidity() && UI.inputColumn.checkValidity()) {
        try {
          const shipLength = UI.shipsToPlace[UI.placedShipsCounter][1];
          Gameloop.player.gameboard.placeShip(
            shipLength,
            +UI.inputRow.value,
            +UI.inputColumn.value,
            placement
          );

          UI.renderAddShipGameboard();
          

          UI.placedShipsCounter += 1;
          UI.renderShipNameToPlace();
          
        } catch (error) {
          UI.errorPlacingShip.textContent = error;
          UI.errorPlacingShip.classList.add("error-placing-visible");
        }
      } else {
        console.log("Kurec x 2");
      }
    });
  }
}

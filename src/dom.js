export default class UI {
  static newGameBtn = document.querySelector("button.new-game");
  static howToBtn = document.querySelector("button.how-to");

  // HOW-TO-PLAY MODAL
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

  // WINNER ANNOUNCEMENT MODAL
  static restartGameBtn = document.querySelector("button.restart-game");

  // GAMEBOARDS
  static selectShipsGrid = document.querySelector(".grid-select-ships");
  static aiBoardGrid = document.querySelector(".aiboard-grid");
  static yourBoardGrid = document.querySelector(".yourboard-grid");

  // DRAW THE GAMEBOARDS
  static drawGameboards() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const singleCell = document.createElement("div");
        singleCell.dataset.row = i.toString();
        singleCell.dataset.column = j.toString();
        // singleCell.textContent = "X";
        singleCell.classList.add("placed-ship");
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

  // ADD EVENT LISTENERS
  static eventListeners() {
    UI.newGameBtn.addEventListener("click", () => {
      UI.placeShipsModal.classList.add("place-ships-modal-visible");
    });
  }
}

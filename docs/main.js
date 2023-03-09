/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameloop */ "./src/gameloop.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");


class UI {
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
  static #shipsToPlace = [{
    name: "Carrier",
    length: 5
  }, {
    name: "Battleship",
    length: 4
  }, {
    name: "Cruiser",
    length: 3
  }, {
    name: "Submarine",
    length: 3
  }, {
    name: "Destroyer",
    length: 2
  }];

  // ##########################
  // WINNER ANNOUNCEMENT MODAL
  // ##########################

  static announcementModal = document.querySelector(".announcement-modal");
  static closeAnnouncementModal = document.querySelector("button.restart-game");
  static displayWinner = document.querySelector(".announcement-modal-content p");

  // ##########################
  // GAMEBOARDS
  // ##########################

  static selectShipsGrid = document.querySelector(".grid-select-ships");
  static aiBoardGrid = document.querySelector(".aiboard-grid");
  static yourBoardGrid = document.querySelector(".yourboard-grid");

  // ##########################
  // DRAW THE GAMEBOARDS
  // ##########################

  // static drawGameboards() {
  //   UI.selectShipsGrid.innerHTML = "";
  //   for (let i = 0; i < 10; i += 1) {
  //     for (let j = 0; j < 10; j += 1) {
  //       const singleCell = document.createElement("div");
  //       singleCell.dataset.row = i.toString();
  //       singleCell.dataset.column = j.toString();
  //       singleCell.classList.add("cell-relative");

  //       UI.selectShipsGrid.appendChild(singleCell);
  //     }
  //   }

  //   for (let i = 0; i < 10; i += 1) {
  //     for (let j = 0; j < 10; j += 1) {
  //       const singleCell = document.createElement("div");
  //       singleCell.dataset.row = i.toString();
  //       singleCell.dataset.column = j.toString();
  //       singleCell.classList.add("myships");
  //       // singleCell.textContent = "X";
  //       const singleCell2 = singleCell.cloneNode(true);
  //       UI.aiBoardGrid.appendChild(singleCell);
  //       UI.yourBoardGrid.appendChild(singleCell2);
  //     }
  //   }
  // }

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
        const isShipPlaced = _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.grid.some(cell => cell[0] === row && cell[1] === column && cell[2]);
        if (isShipPlaced) {
          gameboardCell.textContent = "X";
          gameboardCell.classList.add("placed-ship");
        }
      }
    }
  }
  static renderShipNameToPlace() {
    if (UI.#placedShipsCounter < UI.#shipsToPlace.length) {
      const {
        name,
        length
      } = UI.#shipsToPlace[UI.#placedShipsCounter];
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
      _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.placeShip(shipLength, row, column, orientation);
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
        // gameboardCell.classList.add("cell-relative");
        UI.yourBoardGrid.appendChild(gameboardCell);
        const isShipPlaced = _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.grid.some(cell => cell[0] === row && cell[1] === column && cell[2]);
        if (isShipPlaced) {
          gameboardCell.textContent = "X";
          gameboardCell.classList.add("myships");
        }
        for (let i = 0; i < _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.attacks.length; i += 1) {
          if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.attacks[i][0] === row && _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.attacks[i][1] === column) {
            if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.attacks[i][2] === "+") {
              gameboardCell.classList.add("hit");
            } else if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.attacks[i][2] === "-") {
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
        // gameboardCell.classList.add("cell-relative");
        UI.aiBoardGrid.appendChild(gameboardCell);

        // const isShipPlaced = Gameloop.computer.gameboard.grid.some(
        //   (cell) => cell[0] === row && cell[1] === column && cell[2]
        // );
        // if (isShipPlaced) {
        //   gameboardCell.textContent = "X";
        //   // gameboardCell.classList.add("myships");
        // }

        for (let i = 0; i < _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks.length; i += 1) {
          if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][0] === row && _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][1] === column) {
            if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][2] === "+") {
              gameboardCell.classList.add("hit");
              gameboardCell.textContent = "X";
              gameboardCell.classList.add("already-clicked");
            } else if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][2] === "-") {
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
      _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player = null;
      _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer = null;
      _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].winner = null;
      _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]("Kris");
      _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
    UI.placeShipOrStartGameBtn.addEventListener("click", e => {
      e.preventDefault();
      if (UI.placeShipOrStartGameBtn.textContent === "Start game") {
        UI.placeShipsModal.classList.remove("place-ships-modal-visible");
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(5);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(4);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(3);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(3);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(2);
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
    _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].checkWinner();
    if (!_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].winner) {
      UI.renderPlayerBoard();
      UI.renderComputerBoard();
      const aiBoard = [...document.querySelectorAll(".aiboard-grid div")];
      // const playerBoard = [...document.querySelectorAll(".yourboard-grid div")];

      for (let i = 0; i < aiBoard.length; i += 1) {
        if (aiBoard[i].classList.length === 0) {
          // Get the value of the data-row attribute as a number
          const row = Number(aiBoard[i].dataset.row);

          // Get the value of the data-column attribute as a number
          const column = Number(aiBoard[i].dataset.column);
          aiBoard[i].addEventListener("click", () => {
            _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.manualAttack(_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer, row, column);
            _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.automaticAttack(_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player);
            UI.renderComputerBoard();
            UI.renderPlayerBoard();
            UI.gameStarted();
          });
        }
      }
    } else {
      UI.announcementModal.classList.add("announcement-modal-visible");
      if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].winner.name === "Kris") {
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

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

class Gameboard {
  constructor() {
    this.grid = this._generateGrid();
    this.attacks = [];
    this.ships = [];
  }
  _generateGrid() {
    const arr = [];
    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        arr.push([row, column, null]);
      }
    }
    return arr;
  }
  placeShip(length, row, column) {
    let placement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "horizontal";
    if (length < 1 || length > 10) {
      throw new Error("Invalid ship length.");
    }
    if (row < 0 || row > 9 || column < 0 || column > 9) {
      throw new Error("Invalid starting coordinates.");
    }
    const shipCoordinates = [];
    for (let i = 0; i < length; i += 1) {
      let newRow = row;
      let newColumn = column;
      if (placement === "horizontal") {
        newColumn += i;
      } else {
        newRow += i;
      }
      if (newRow < 0 || newRow > 9 || newColumn < 0 || newColumn > 9) {
        throw new Error("Ship placement out of bounds.");
      }
      for (let j = 0; j < this.grid.length; j += 1) {
        const currentCoordinate = this.grid[j];
        if (currentCoordinate[0] === newRow && currentCoordinate[1] === newColumn && currentCoordinate[2] !== null) {
          throw new Error("Ship collision detected. Cannot place ship on top of another ship.");
        }
      }
      shipCoordinates.push([newRow, newColumn, null]);
    }
    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);
    this.ships.push(ship);
    for (let k = 0; k < shipCoordinates.length; k += 1) {
      const currentCoordinate = shipCoordinates[k];
      const index = this.grid.findIndex(element => element[0] === currentCoordinate[0] && element[1] === currentCoordinate[1]);
      if (index !== -1) {
        this.grid[index][2] = ship;
      }
    }
  }
  placeShipAutomatically(length) {
    let maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    const getRandomIndex = max => Math.floor(Math.random() * max);
    let retries = 0;
    let placed = false;
    while (!placed && retries < maxRetries) {
      const row = getRandomIndex(10);
      const column = getRandomIndex(10);
      const placement = Math.random() < 0.5 ? "horizontal" : "vertical";
      try {
        this.placeShip(length, row, column, placement);
        placed = true;
      } catch (error) {
        // Invalid placement, retry
        retries += 1;
      }
    }
    if (!placed) {
      throw new Error("Could not place ship after maximum retries");
    }
  }
  receiveAttack(row, column) {
    const [targetRow, targetColumn] = [row, column];
    if (targetRow < 0 || targetRow >= 10 || targetColumn < 0 || targetColumn >= 10) {
      throw new Error("Out of bounds");
    }
    const cell = this.grid.find(_ref => {
      let [r, col] = _ref;
      return r === targetRow && col === targetColumn;
    });
    if (!cell) {
      throw new Error("Cell not found");
    }
    if (this.attacks.find(_ref2 => {
      let [r, col] = _ref2;
      return r === targetRow && col === targetColumn;
    })) {
      throw new Error("Cell already attacked");
    }
    if (cell[2]) {
      cell[2].hit();
      this.attacks.push([targetRow, targetColumn, "+"]);
      return true;
    }
    this.attacks.push([targetRow, targetColumn, "-"]);
    return false;
  }
  areAllShipsSunk() {
    for (let i = 0; i < this.ships.length; i += 1) {
      if (!this.ships[i].isSunk()) return false;
    }
    return true;
  }
}

/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameloop)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");



class Gameloop {
  static player = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]("Kris");
  static computer = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]();
  static winner = null;
  static init() {
    // UI.drawGameboards();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].eventListeners();
  }
  static checkWinner() {
    if (Gameloop.player.gameboard.areAllShipsSunk()) {
      Gameloop.winner = Gameloop.computer;
    } else if (Gameloop.computer.gameboard.areAllShipsSunk()) {
      Gameloop.winner = Gameloop.player;
    }
  }
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* eslint-disable no-continue */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

class Player {
  static turns = [];
  constructor() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Computer";
    this.name = this._checkPlayerName(name);
    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  _checkPlayerName(name) {
    if (!name.length) {
      throw new Error("Name cannot be empty");
    }
    return name.replace(/\s/g, "");
  }
  manualAttack(opponent, row, column) {
    if (opponent.gameboard.receiveAttack(row, column)) {
      Player.turns.push(this.name);
    }
  }
  automaticAttack(opponent) {
    const attacksInitialLength = opponent.gameboard.attacks.length;
    while (attacksInitialLength === opponent.gameboard.attacks.length) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      try {
        opponent.gameboard.receiveAttack(row, column);
      } catch {
        continue;
      }
    }
    Player.turns.push(this.name);
  }
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
/* eslint-disable no-underscore-dangle */

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }
  hit() {
    if (this.hits < this.length) this.hits += 1;
  }
  isSunk() {
    return this.hits >= this.length;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameloop */ "./src/gameloop.js");
// const selectShipsGrid = document.querySelector(".grid-select-ships");

// for (let i = 0; i < 10; i += 1) {
//   for (let j = 0; j < 10; j += 1) {
//     const singleCell = document.createElement("div");
//     singleCell.dataset.row = i.toString();
//     singleCell.dataset.column = j.toString();
//     singleCell.textContent = "X";
//     singleCell.classList.add("placed-ship");
//     singleCell.classList.add("cell-relative");

//     selectShipsGrid.appendChild(singleCell);
//   }
// }

// const aiBoardGrid = document.querySelector(".aiboard-grid");
// const yourBoardGrid = document.querySelector(".yourboard-grid");

// for (let i = 0; i < 10; i += 1) {
//   for (let j = 0; j < 10; j += 1) {
//     const singleCell = document.createElement("div");
//     singleCell.dataset.row = i.toString();
//     singleCell.dataset.column = j.toString();
//     singleCell.classList.add("myships");
//     singleCell.textContent = "X";
//   singleCell.textContent = "X"; this should remain commented
//   singleCell.classList.add("placed-ship"); this should remain commented
//   singleCell.classList.add("cell-relative"); this should remain commented

//     const singleCell2 = singleCell.cloneNode(true);
//     aiBoardGrid.appendChild(singleCell);
//     yourBoardGrid.appendChild(singleCell2);
//   }
// }


_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFaUM7QUFFakNwQixzREFBYSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVsb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWxvb3AgZnJvbSBcIi4vZ2FtZWxvb3BcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLm5ldy1nYW1lXCIpO1xuXG4gIHN0YXRpYyBob3dUb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uaG93LXRvXCIpO1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gSE9XLVRPLVBMQVkgTU9EQUxcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIGhvd1RvUGxheU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3ctdG8tcGxheS1tb2RhbFwiKTtcblxuICBzdGF0aWMgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3Bhbi5jbG9zZS1idXR0b25cIik7XG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIFBMQUNFIFNISVBTIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIHBsYWNlU2hpcHNNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcHMtbW9kYWxcIik7XG5cbiAgc3RhdGljIHNoaXBJbmZvUGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mby1zaGlwLW5hbWUtbGVuZ3RoXCIpO1xuXG4gIHN0YXRpYyBpbnB1dFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm93XCIpO1xuXG4gIHN0YXRpYyBpbnB1dENvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29sdW1uXCIpO1xuXG4gIHN0YXRpYyBob3Jpem9udGFsUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvcml6b250YWxcIik7XG5cbiAgc3RhdGljIHZlcnRpY2FsUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZlcnRpY2FsXCIpO1xuXG4gIHN0YXRpYyBwbGFjZVNoaXBPclN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcC1idXR0b25cIik7XG5cbiAgc3RhdGljIGVycm9yUGxhY2luZ1NoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yLXBsYWNpbmdcIik7XG5cbiAgc3RhdGljICNwbGFjZWRTaGlwc0NvdW50ZXIgPSAwO1xuXG4gIHN0YXRpYyAjc2hpcHNUb1BsYWNlID0gW1xuICAgIHsgbmFtZTogXCJDYXJyaWVyXCIsIGxlbmd0aDogNSB9LFxuICAgIHsgbmFtZTogXCJCYXR0bGVzaGlwXCIsIGxlbmd0aDogNCB9LFxuICAgIHsgbmFtZTogXCJDcnVpc2VyXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJTdWJtYXJpbmVcIiwgbGVuZ3RoOiAzIH0sXG4gICAgeyBuYW1lOiBcIkRlc3Ryb3llclwiLCBsZW5ndGg6IDIgfSxcbiAgXTtcblxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBXSU5ORVIgQU5OT1VOQ0VNRU5UIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIGFubm91bmNlbWVudE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbm5vdW5jZW1lbnQtbW9kYWxcIik7XG5cbiAgc3RhdGljIGNsb3NlQW5ub3VuY2VtZW50TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLnJlc3RhcnQtZ2FtZVwiKTtcblxuICBzdGF0aWMgZGlzcGxheVdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuYW5ub3VuY2VtZW50LW1vZGFsLWNvbnRlbnQgcFwiXG4gICk7XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gR0FNRUJPQVJEU1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBzZWxlY3RTaGlwc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtc2VsZWN0LXNoaXBzXCIpO1xuXG4gIHN0YXRpYyBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuXG4gIHN0YXRpYyB5b3VyQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi55b3VyYm9hcmQtZ3JpZFwiKTtcblxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBEUkFXIFRIRSBHQU1FQk9BUkRTXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgLy8gc3RhdGljIGRyYXdHYW1lYm9hcmRzKCkge1xuICAvLyAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAvLyAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gIC8vICAgICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAvLyAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuICAvLyAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuICAvLyAgICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuXG4gIC8vICAgICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAvLyAgICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbiAgLy8gICAgICAgLy8gc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAvLyAgICAgICBjb25zdCBzaW5nbGVDZWxsMiA9IHNpbmdsZUNlbGwuY2xvbmVOb2RlKHRydWUpO1xuICAvLyAgICAgICBVSS5haUJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbiAgLy8gICAgICAgVUkueW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsMik7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgc3RhdGljIHJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKSB7XG4gICAgVUkuc2VsZWN0U2hpcHNHcmlkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG5cbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uLnRvU3RyaW5nKCk7XG4gICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG4gICAgICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRDZWxsKTtcblxuICAgICAgICBjb25zdCBpc1NoaXBQbGFjZWQgPSBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmdyaWQuc29tZShcbiAgICAgICAgICAoY2VsbCkgPT4gY2VsbFswXSA9PT0gcm93ICYmIGNlbGxbMV0gPT09IGNvbHVtbiAmJiBjZWxsWzJdXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgICBnYW1lYm9hcmRDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyU2hpcE5hbWVUb1BsYWNlKCkge1xuICAgIGlmIChVSS4jcGxhY2VkU2hpcHNDb3VudGVyIDwgVUkuI3NoaXBzVG9QbGFjZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbGVuZ3RoIH0gPSBVSS4jc2hpcHNUb1BsYWNlW1VJLiNwbGFjZWRTaGlwc0NvdW50ZXJdO1xuICAgICAgVUkuc2hpcEluZm9QYXJhLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHtuYW1lfSwgbGVuZ3RoICR7bGVuZ3RofWA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2soKSB7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IFVJLiNzaGlwc1RvUGxhY2VbVUkuI3BsYWNlZFNoaXBzQ291bnRlcl0ubGVuZ3RoO1xuICAgIGNvbnN0IHJvdyA9ICtVSS5pbnB1dFJvdy52YWx1ZTtcbiAgICBjb25zdCBjb2x1bW4gPSArVUkuaW5wdXRDb2x1bW4udmFsdWU7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBVSS5ob3Jpem9udGFsUmFkaW8uY2hlY2tlZCA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuXG4gICAgaWYgKCFVSS5pbnB1dFJvdy5jaGVja1ZhbGlkaXR5KCkgfHwgIVVJLmlucHV0Q29sdW1uLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC50ZXh0Q29udGVudCA9IFwiSW52YWxpZCBJbnB1dFwiO1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC5jbGFzc0xpc3QuYWRkKFwiZXJyb3ItcGxhY2luZy12aXNpYmxlXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pO1xuICAgICAgVUkuI3BsYWNlZFNoaXBzQ291bnRlciArPSAxO1xuICAgICAgVUkucmVuZGVyQWRkU2hpcEdhbWVib2FyZCgpO1xuICAgICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBlcnJvcjtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICB9XG5cbiAgICBpZiAoVUkuI3BsYWNlZFNoaXBzQ291bnRlciA9PT0gVUkuI3NoaXBzVG9QbGFjZS5sZW5ndGgpIHtcbiAgICAgIFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLnRleHRDb250ZW50ID0gXCJTdGFydCBnYW1lXCI7XG4gICAgICBVSS5zaGlwSW5mb1BhcmEudGV4dENvbnRlbnQgPSBcIkFsbCBzaGlwcyBzZXQhIFJlYWR5IHRvIHJvbGwhXCI7XG4gICAgfVxuICB9XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gTUFJTiBHQU1FIEFORCBCT0FSRFNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgcmVuZGVyUGxheWVyQm9hcmQoKSB7XG4gICAgVUkueW91ckJvYXJkR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQucm93ID0gcm93LnRvU3RyaW5nKCk7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW4udG9TdHJpbmcoKTtcbiAgICAgICAgLy8gZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcbiAgICAgICAgVUkueW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRDZWxsKTtcblxuICAgICAgICBjb25zdCBpc1NoaXBQbGFjZWQgPSBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmdyaWQuc29tZShcbiAgICAgICAgICAoY2VsbCkgPT4gY2VsbFswXSA9PT0gcm93ICYmIGNlbGxbMV0gPT09IGNvbHVtbiAmJiBjZWxsWzJdXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgICBnYW1lYm9hcmRDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzBdID09PSByb3cgJiZcbiAgICAgICAgICAgIEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsxXSA9PT0gY29sdW1uXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzJdID09PSBcIitcIikge1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsyXSA9PT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyQ29tcHV0ZXJCb2FyZCgpIHtcbiAgICBVSS5haUJvYXJkR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQucm93ID0gcm93LnRvU3RyaW5nKCk7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW4udG9TdHJpbmcoKTtcbiAgICAgICAgLy8gZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcbiAgICAgICAgVUkuYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgLy8gY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmdyaWQuc29tZShcbiAgICAgICAgLy8gICAoY2VsbCkgPT4gY2VsbFswXSA9PT0gcm93ICYmIGNlbGxbMV0gPT09IGNvbHVtbiAmJiBjZWxsWzJdXG4gICAgICAgIC8vICk7XG4gICAgICAgIC8vIGlmIChpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgLy8gICBnYW1lYm9hcmRDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgIC8vICAgLy8gZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIGkgPCBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrcy5sZW5ndGg7XG4gICAgICAgICAgaSArPSAxXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzBdID09PSByb3cgJiZcbiAgICAgICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzFdID09PSBjb2x1bW5cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsyXSA9PT0gXCIrXCIpIHtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImFscmVhZHktY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMl0gPT09IFwiLVwiKSB7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImFscmVhZHktY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBBREQgRVZFTlQgTElTVEVORVJTXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xuICAgIFVJLm5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIEdhbWVsb29wLnBsYXllciA9IG51bGw7XG4gICAgICBHYW1lbG9vcC5jb21wdXRlciA9IG51bGw7XG4gICAgICBHYW1lbG9vcC53aW5uZXIgPSBudWxsO1xuXG4gICAgICBHYW1lbG9vcC5wbGF5ZXIgPSBuZXcgUGxheWVyKFwiS3Jpc1wiKTtcbiAgICAgIEdhbWVsb29wLmNvbXB1dGVyID0gbmV3IFBsYXllcigpO1xuXG4gICAgICBVSS4jcGxhY2VkU2hpcHNDb3VudGVyID0gMDtcbiAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgICAgVUkuaW5wdXRSb3cudmFsdWUgPSBcIlwiO1xuICAgICAgVUkuaW5wdXRDb2x1bW4udmFsdWUgPSBcIlwiO1xuICAgICAgVUkucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4udGV4dENvbnRlbnQgPSBcIlBsYWNlIHNoaXBcIjtcblxuICAgICAgVUkucGxhY2VTaGlwc01vZGFsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZS1zaGlwcy1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgVUkuaG93VG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFVJLmhvd1RvUGxheU1vZGFsLmNsYXNzTGlzdC5hZGQoXCJob3ctdG8tcGxheS1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgVUkuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFVJLmhvd1RvUGxheU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ctdG8tcGxheS1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgVUkucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoVUkucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4udGV4dENvbnRlbnQgPT09IFwiU3RhcnQgZ2FtZVwiKSB7XG4gICAgICAgIFVJLnBsYWNlU2hpcHNNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2Utc2hpcHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoNSk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDQpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSgzKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoMyk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDIpO1xuXG4gICAgICAgIFVJLnJlbmRlclBsYXllckJvYXJkKCk7XG4gICAgICAgIFVJLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcbiAgICAgICAgVUkuZ2FtZVN0YXJ0ZWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVJLmhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIE1BSU4gR0FNRSBMT0dJQ1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBnYW1lU3RhcnRlZCgpIHtcbiAgICBHYW1lbG9vcC5jaGVja1dpbm5lcigpO1xuXG4gICAgaWYgKCFHYW1lbG9vcC53aW5uZXIpIHtcbiAgICAgIFVJLnJlbmRlclBsYXllckJvYXJkKCk7XG4gICAgICBVSS5yZW5kZXJDb21wdXRlckJvYXJkKCk7XG5cbiAgICAgIGNvbnN0IGFpQm9hcmQgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5haWJvYXJkLWdyaWQgZGl2XCIpXTtcbiAgICAgIC8vIGNvbnN0IHBsYXllckJvYXJkID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueW91cmJvYXJkLWdyaWQgZGl2XCIpXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhaUJvYXJkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChhaUJvYXJkW2ldLmNsYXNzTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAvLyBHZXQgdGhlIHZhbHVlIG9mIHRoZSBkYXRhLXJvdyBhdHRyaWJ1dGUgYXMgYSBudW1iZXJcbiAgICAgICAgICBjb25zdCByb3cgPSBOdW1iZXIoYWlCb2FyZFtpXS5kYXRhc2V0LnJvdyk7XG5cbiAgICAgICAgICAvLyBHZXQgdGhlIHZhbHVlIG9mIHRoZSBkYXRhLWNvbHVtbiBhdHRyaWJ1dGUgYXMgYSBudW1iZXJcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoYWlCb2FyZFtpXS5kYXRhc2V0LmNvbHVtbik7XG5cbiAgICAgICAgICBhaUJvYXJkW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBHYW1lbG9vcC5wbGF5ZXIubWFudWFsQXR0YWNrKEdhbWVsb29wLmNvbXB1dGVyLCByb3csIGNvbHVtbik7XG4gICAgICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5hdXRvbWF0aWNBdHRhY2soR2FtZWxvb3AucGxheWVyKTtcblxuICAgICAgICAgICAgVUkucmVuZGVyQ29tcHV0ZXJCb2FyZCgpO1xuICAgICAgICAgICAgVUkucmVuZGVyUGxheWVyQm9hcmQoKTtcblxuICAgICAgICAgICAgVUkuZ2FtZVN0YXJ0ZWQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBVSS5hbm5vdW5jZW1lbnRNb2RhbC5jbGFzc0xpc3QuYWRkKFwiYW5ub3VuY2VtZW50LW1vZGFsLXZpc2libGVcIik7XG4gICAgICBpZiAoR2FtZWxvb3Aud2lubmVyLm5hbWUgPT09IFwiS3Jpc1wiKSB7XG4gICAgICAgIFVJLmRpc3BsYXlXaW5uZXIudGV4dENvbnRlbnQgPSBcIllvdSB3b24gdGhlIGJhdHRsZSFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVJLmRpc3BsYXlXaW5uZXIudGV4dENvbnRlbnQgPSBcIllvdSBsb3N0IHRoZSBiYXR0bGUhXCI7XG4gICAgICB9XG5cbiAgICAgIFVJLmNsb3NlQW5ub3VuY2VtZW50TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgVUkuYW5ub3VuY2VtZW50TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImFubm91bmNlbWVudC1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1zaGFkb3cgKi9cbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuX2dlbmVyYXRlR3JpZCgpO1xuICAgIHRoaXMuYXR0YWNrcyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIF9nZW5lcmF0ZUdyaWQoKSB7XG4gICAgY29uc3QgYXJyID0gW107XG5cbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBhcnIucHVzaChbcm93LCBjb2x1bW4sIG51bGxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBwbGFjZW1lbnQgPSBcImhvcml6b250YWxcIikge1xuICAgIGlmIChsZW5ndGggPCAxIHx8IGxlbmd0aCA+IDEwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNoaXAgbGVuZ3RoLlwiKTtcbiAgICB9XG5cbiAgICBpZiAocm93IDwgMCB8fCByb3cgPiA5IHx8IGNvbHVtbiA8IDAgfHwgY29sdW1uID4gOSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdGFydGluZyBjb29yZGluYXRlcy5cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsZXQgbmV3Um93ID0gcm93O1xuICAgICAgbGV0IG5ld0NvbHVtbiA9IGNvbHVtbjtcblxuICAgICAgaWYgKHBsYWNlbWVudCA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgbmV3Q29sdW1uICs9IGk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdSb3cgKz0gaTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1JvdyA8IDAgfHwgbmV3Um93ID4gOSB8fCBuZXdDb2x1bW4gPCAwIHx8IG5ld0NvbHVtbiA+IDkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBwbGFjZW1lbnQgb3V0IG9mIGJvdW5kcy5cIik7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb29yZGluYXRlID0gdGhpcy5ncmlkW2pdO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZVswXSA9PT0gbmV3Um93ICYmXG4gICAgICAgICAgY3VycmVudENvb3JkaW5hdGVbMV0gPT09IG5ld0NvbHVtbiAmJlxuICAgICAgICAgIGN1cnJlbnRDb29yZGluYXRlWzJdICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiU2hpcCBjb2xsaXNpb24gZGV0ZWN0ZWQuIENhbm5vdCBwbGFjZSBzaGlwIG9uIHRvcCBvZiBhbm90aGVyIHNoaXAuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFtuZXdSb3csIG5ld0NvbHVtbiwgbnVsbF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcblxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgayArPSAxKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IHNoaXBDb29yZGluYXRlc1trXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ncmlkLmZpbmRJbmRleChcbiAgICAgICAgKGVsZW1lbnQpID0+XG4gICAgICAgICAgZWxlbWVudFswXSA9PT0gY3VycmVudENvb3JkaW5hdGVbMF0gJiZcbiAgICAgICAgICBlbGVtZW50WzFdID09PSBjdXJyZW50Q29vcmRpbmF0ZVsxXVxuICAgICAgKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLmdyaWRbaW5kZXhdWzJdID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXBBdXRvbWF0aWNhbGx5KGxlbmd0aCwgbWF4UmV0cmllcyA9IDUwMDApIHtcbiAgICBjb25zdCBnZXRSYW5kb21JbmRleCA9IChtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XG5cbiAgICBsZXQgcmV0cmllcyA9IDA7XG4gICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKCFwbGFjZWQgJiYgcmV0cmllcyA8IG1heFJldHJpZXMpIHtcbiAgICAgIGNvbnN0IHJvdyA9IGdldFJhbmRvbUluZGV4KDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGdldFJhbmRvbUluZGV4KDEwKTtcbiAgICAgIGNvbnN0IHBsYWNlbWVudCA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgcGxhY2VtZW50KTtcbiAgICAgICAgcGxhY2VkID0gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIEludmFsaWQgcGxhY2VtZW50LCByZXRyeVxuICAgICAgICByZXRyaWVzICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwbGFjZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBwbGFjZSBzaGlwIGFmdGVyIG1heGltdW0gcmV0cmllc1wiKTtcbiAgICB9XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgY29uc3QgW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uXSA9IFtyb3csIGNvbHVtbl07XG5cbiAgICBpZiAoXG4gICAgICB0YXJnZXRSb3cgPCAwIHx8XG4gICAgICB0YXJnZXRSb3cgPj0gMTAgfHxcbiAgICAgIHRhcmdldENvbHVtbiA8IDAgfHxcbiAgICAgIHRhcmdldENvbHVtbiA+PSAxMFxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3V0IG9mIGJvdW5kc1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkLmZpbmQoXG4gICAgICAoW3IsIGNvbF0pID0+IHIgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbHVtblxuICAgICk7XG5cbiAgICBpZiAoIWNlbGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgbm90IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuYXR0YWNrcy5maW5kKChbciwgY29sXSkgPT4gciA9PT0gdGFyZ2V0Um93ICYmIGNvbCA9PT0gdGFyZ2V0Q29sdW1uKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBhbHJlYWR5IGF0dGFja2VkXCIpO1xuICAgIH1cblxuICAgIGlmIChjZWxsWzJdKSB7XG4gICAgICBjZWxsWzJdLmhpdCgpO1xuICAgICAgdGhpcy5hdHRhY2tzLnB1c2goW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uLCBcIitcIl0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hdHRhY2tzLnB1c2goW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uLCBcIi1cIl0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFyZUFsbFNoaXBzU3VuaygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICghdGhpcy5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgVUkgZnJvbSBcIi4vZG9tXCI7XG5cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVsb29wIHtcbiAgc3RhdGljIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJLcmlzXCIpO1xuXG4gIHN0YXRpYyBjb21wdXRlciA9IG5ldyBQbGF5ZXIoKTtcblxuICBzdGF0aWMgd2lubmVyID0gbnVsbDtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICAvLyBVSS5kcmF3R2FtZWJvYXJkcygpO1xuICAgIFVJLmV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tXaW5uZXIoKSB7XG4gICAgaWYgKEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXJlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIEdhbWVsb29wLndpbm5lciA9IEdhbWVsb29wLmNvbXB1dGVyO1xuICAgIH0gZWxzZSBpZiAoR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBHYW1lbG9vcC53aW5uZXIgPSBHYW1lbG9vcC5wbGF5ZXI7XG4gICAgfVxuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIHN0YXRpYyB0dXJucyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUgPSBcIkNvbXB1dGVyXCIpIHtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLl9jaGVja1BsYXllck5hbWUobmFtZSk7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIH1cblxuICBfY2hlY2tQbGF5ZXJOYW1lKG5hbWUpIHtcbiAgICBpZiAoIW5hbWUubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOYW1lIGNhbm5vdCBiZSBlbXB0eVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gIH1cblxuICBtYW51YWxBdHRhY2sob3Bwb25lbnQsIHJvdywgY29sdW1uKSB7XG4gICAgaWYgKG9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSkge1xuICAgICAgUGxheWVyLnR1cm5zLnB1c2godGhpcy5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBhdXRvbWF0aWNBdHRhY2sob3Bwb25lbnQpIHtcbiAgICBjb25zdCBhdHRhY2tzSW5pdGlhbExlbmd0aCA9IG9wcG9uZW50LmdhbWVib2FyZC5hdHRhY2tzLmxlbmd0aDtcbiAgIFxuICAgIHdoaWxlIChhdHRhY2tzSW5pdGlhbExlbmd0aCA9PT0gb3Bwb25lbnQuZ2FtZWJvYXJkLmF0dGFja3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgUGxheWVyLnR1cm5zLnB1c2godGhpcy5uYW1lKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGNvbnN0IHNlbGVjdFNoaXBzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1zZWxlY3Qtc2hpcHNcIik7XG5cbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG5cbi8vICAgICBzZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4vLyAgIH1cbi8vIH1cblxuLy8gY29uc3QgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcbi8vIGNvbnN0IHlvdXJCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnlvdXJib2FyZC1ncmlkXCIpO1xuXG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbi8vICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgIC8vICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG4gICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuICAgIC8vICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuXG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbDIgPSBzaW5nbGVDZWxsLmNsb25lTm9kZSh0cnVlKTtcbi8vICAgICBhaUJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbi8vICAgICB5b3VyQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwyKTtcbi8vICAgfVxuLy8gfVxuXG5pbXBvcnQgR2FtZWxvb3AgZnJvbSBcIi4vZ2FtZWxvb3BcIlxuXG5HYW1lbG9vcC5pbml0KCk7Il0sIm5hbWVzIjpbIkdhbWVsb29wIiwiUGxheWVyIiwiVUkiLCJuZXdHYW1lQnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaG93VG9CdG4iLCJob3dUb1BsYXlNb2RhbCIsImNsb3NlQnRuIiwicGxhY2VTaGlwc01vZGFsIiwic2hpcEluZm9QYXJhIiwiaW5wdXRSb3ciLCJpbnB1dENvbHVtbiIsImhvcml6b250YWxSYWRpbyIsInZlcnRpY2FsUmFkaW8iLCJwbGFjZVNoaXBPclN0YXJ0R2FtZUJ0biIsImVycm9yUGxhY2luZ1NoaXAiLCJwbGFjZWRTaGlwc0NvdW50ZXIiLCJzaGlwc1RvUGxhY2UiLCJuYW1lIiwibGVuZ3RoIiwiYW5ub3VuY2VtZW50TW9kYWwiLCJjbG9zZUFubm91bmNlbWVudE1vZGFsIiwiZGlzcGxheVdpbm5lciIsInNlbGVjdFNoaXBzR3JpZCIsImFpQm9hcmRHcmlkIiwieW91ckJvYXJkR3JpZCIsInJlbmRlckFkZFNoaXBHYW1lYm9hcmQiLCJpbm5lckhUTUwiLCJyZW5kZXJTaGlwTmFtZVRvUGxhY2UiLCJyb3ciLCJjb2x1bW4iLCJnYW1lYm9hcmRDZWxsIiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJ0b1N0cmluZyIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiaXNTaGlwUGxhY2VkIiwicGxheWVyIiwiZ2FtZWJvYXJkIiwiZ3JpZCIsInNvbWUiLCJjZWxsIiwidGV4dENvbnRlbnQiLCJoYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrIiwic2hpcExlbmd0aCIsInZhbHVlIiwib3JpZW50YXRpb24iLCJjaGVja2VkIiwiY2hlY2tWYWxpZGl0eSIsInBsYWNlU2hpcCIsInJlbW92ZSIsImVycm9yIiwicmVuZGVyUGxheWVyQm9hcmQiLCJpIiwiYXR0YWNrcyIsInJlbmRlckNvbXB1dGVyQm9hcmQiLCJjb21wdXRlciIsImV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpbm5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBsYWNlU2hpcEF1dG9tYXRpY2FsbHkiLCJnYW1lU3RhcnRlZCIsImNoZWNrV2lubmVyIiwiYWlCb2FyZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJOdW1iZXIiLCJtYW51YWxBdHRhY2siLCJhdXRvbWF0aWNBdHRhY2siLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJfZ2VuZXJhdGVHcmlkIiwic2hpcHMiLCJhcnIiLCJwdXNoIiwicGxhY2VtZW50IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJzaGlwQ29vcmRpbmF0ZXMiLCJuZXdSb3ciLCJuZXdDb2x1bW4iLCJqIiwiY3VycmVudENvb3JkaW5hdGUiLCJzaGlwIiwiayIsImluZGV4IiwiZmluZEluZGV4IiwiZWxlbWVudCIsIm1heFJldHJpZXMiLCJnZXRSYW5kb21JbmRleCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJldHJpZXMiLCJwbGFjZWQiLCJyZWNlaXZlQXR0YWNrIiwidGFyZ2V0Um93IiwidGFyZ2V0Q29sdW1uIiwiZmluZCIsIl9yZWYiLCJyIiwiY29sIiwiX3JlZjIiLCJoaXQiLCJhcmVBbGxTaGlwc1N1bmsiLCJpc1N1bmsiLCJpbml0IiwidHVybnMiLCJfY2hlY2tQbGF5ZXJOYW1lIiwicmVwbGFjZSIsIm9wcG9uZW50IiwiYXR0YWNrc0luaXRpYWxMZW5ndGgiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==
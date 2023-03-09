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
        UI.aiBoardGrid.appendChild(gameboardCell);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDO0FBRWpDcEIsc0RBQWEsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVsb29wIGZyb20gXCIuL2dhbWVsb29wXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIHN0YXRpYyBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5uZXctZ2FtZVwiKTtcblxuICBzdGF0aWMgaG93VG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmhvdy10b1wiKTtcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEhPVy1UTy1QTEFZIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBob3dUb1BsYXlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG93LXRvLXBsYXktbW9kYWxcIik7XG5cbiAgc3RhdGljIGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW4uY2xvc2UtYnV0dG9uXCIpO1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBQTEFDRSBTSElQUyBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBwbGFjZVNoaXBzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuXG4gIHN0YXRpYyBzaGlwSW5mb1BhcmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tc2hpcC1uYW1lLWxlbmd0aFwiKTtcblxuICBzdGF0aWMgaW5wdXRSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvd1wiKTtcblxuICBzdGF0aWMgaW5wdXRDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbHVtblwiKTtcblxuICBzdGF0aWMgaG9yaXpvbnRhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3Jpem9udGFsXCIpO1xuXG4gIHN0YXRpYyB2ZXJ0aWNhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2ZXJ0aWNhbFwiKTtcblxuICBzdGF0aWMgcGxhY2VTaGlwT3JTdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXAtYnV0dG9uXCIpO1xuXG4gIHN0YXRpYyBlcnJvclBsYWNpbmdTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvci1wbGFjaW5nXCIpO1xuXG4gIHN0YXRpYyAjcGxhY2VkU2hpcHNDb3VudGVyID0gMDtcblxuICBzdGF0aWMgI3NoaXBzVG9QbGFjZSA9IFtcbiAgICB7IG5hbWU6IFwiQ2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IG5hbWU6IFwiQ3J1aXNlclwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiwgbGVuZ3RoOiAyIH0sXG4gIF07XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gV0lOTkVSIEFOTk9VTkNFTUVOVCBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBhbm5vdW5jZW1lbnRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYW5ub3VuY2VtZW50LW1vZGFsXCIpO1xuXG4gIHN0YXRpYyBjbG9zZUFubm91bmNlbWVudE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5yZXN0YXJ0LWdhbWVcIik7XG5cbiAgc3RhdGljIGRpc3BsYXlXaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLmFubm91bmNlbWVudC1tb2RhbC1jb250ZW50IHBcIlxuICApO1xuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEdBTUVCT0FSRFNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuICBzdGF0aWMgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcblxuICBzdGF0aWMgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gRFJBVyBUSEUgR0FNRUJPQVJEU1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyByZW5kZXJBZGRTaGlwR2FtZWJvYXJkKCkge1xuICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5yb3cgPSByb3cudG9TdHJpbmcoKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbi50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuICAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlclNoaXBOYW1lVG9QbGFjZSgpIHtcbiAgICBpZiAoVUkuI3BsYWNlZFNoaXBzQ291bnRlciA8IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGxlbmd0aCB9ID0gVUkuI3NoaXBzVG9QbGFjZVtVSS4jcGxhY2VkU2hpcHNDb3VudGVyXTtcbiAgICAgIFVJLnNoaXBJbmZvUGFyYS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7bmFtZX0sIGxlbmd0aCAke2xlbmd0aH1gO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrKCkge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS4jc2hpcHNUb1BsYWNlW1VJLiNwbGFjZWRTaGlwc0NvdW50ZXJdLmxlbmd0aDtcbiAgICBjb25zdCByb3cgPSArVUkuaW5wdXRSb3cudmFsdWU7XG4gICAgY29uc3QgY29sdW1uID0gK1VJLmlucHV0Q29sdW1uLnZhbHVlO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gVUkuaG9yaXpvbnRhbFJhZGlvLmNoZWNrZWQgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgIGlmICghVUkuaW5wdXRSb3cuY2hlY2tWYWxpZGl0eSgpIHx8ICFVSS5pbnB1dENvbHVtbi5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBcIkludmFsaWQgSW5wdXRcIjtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcbiAgICAgIFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgKz0gMTtcbiAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItcGxhY2luZy12aXNpYmxlXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLnRleHRDb250ZW50ID0gZXJyb3I7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgfVxuXG4gICAgaWYgKFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgPT09IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xuICAgICAgVUkuc2hpcEluZm9QYXJhLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgc2V0ISBSZWFkeSB0byByb2xsIVwiO1xuICAgIH1cbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIE1BSU4gR0FNRSBBTkQgQk9BUkRTXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIHJlbmRlclBsYXllckJvYXJkKCkge1xuICAgIFVJLnlvdXJCb2FyZEdyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uLnRvU3RyaW5nKCk7XG4gICAgICAgIFxuICAgICAgICBVSS55b3VyQm9hcmRHcmlkLmFwcGVuZENoaWxkKGdhbWVib2FyZENlbGwpO1xuXG4gICAgICAgIGNvbnN0IGlzU2hpcFBsYWNlZCA9IEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuZ3JpZC5zb21lKFxuICAgICAgICAgIChjZWxsKSA9PiBjZWxsWzBdID09PSByb3cgJiYgY2VsbFsxXSA9PT0gY29sdW1uICYmIGNlbGxbMl1cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGlzU2hpcFBsYWNlZCkge1xuICAgICAgICAgIGdhbWVib2FyZENlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJteXNoaXBzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmF0dGFja3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMF0gPT09IHJvdyAmJlxuICAgICAgICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzFdID09PSBjb2x1bW5cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMl0gPT09IFwiK1wiKSB7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzJdID09PSBcIi1cIikge1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW5kZXJDb21wdXRlckJvYXJkKCkge1xuICAgIFVJLmFpQm9hcmRHcmlkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5yb3cgPSByb3cudG9TdHJpbmcoKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbi50b1N0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgVUkuYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgaSA8IEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzLmxlbmd0aDtcbiAgICAgICAgICBpICs9IDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMF0gPT09IHJvdyAmJlxuICAgICAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMV0gPT09IGNvbHVtblxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzJdID09PSBcIitcIikge1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiYWxyZWFkeS1jbGlja2VkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsyXSA9PT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiYWxyZWFkeS1jbGlja2VkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEFERCBFVkVOVCBMSVNURU5FUlNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgVUkubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgR2FtZWxvb3AucGxheWVyID0gbnVsbDtcbiAgICAgIEdhbWVsb29wLmNvbXB1dGVyID0gbnVsbDtcbiAgICAgIEdhbWVsb29wLndpbm5lciA9IG51bGw7XG5cbiAgICAgIEdhbWVsb29wLnBsYXllciA9IG5ldyBQbGF5ZXIoXCJLcmlzXCIpO1xuICAgICAgR2FtZWxvb3AuY29tcHV0ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgICAgIFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgPSAwO1xuICAgICAgVUkucmVuZGVyQWRkU2hpcEdhbWVib2FyZCgpO1xuICAgICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG4gICAgICBVSS5pbnB1dFJvdy52YWx1ZSA9IFwiXCI7XG4gICAgICBVSS5pbnB1dENvbHVtbi52YWx1ZSA9IFwiXCI7XG4gICAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9IFwiUGxhY2Ugc2hpcFwiO1xuXG4gICAgICBVSS5wbGFjZVNoaXBzTW9kYWwuY2xhc3NMaXN0LmFkZChcInBsYWNlLXNoaXBzLW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5ob3dUb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgVUkuaG93VG9QbGF5TW9kYWwuY2xhc3NMaXN0LmFkZChcImhvdy10by1wbGF5LW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgVUkuaG93VG9QbGF5TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhvdy10by1wbGF5LW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9PT0gXCJTdGFydCBnYW1lXCIpIHtcbiAgICAgICAgVUkucGxhY2VTaGlwc01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZS1zaGlwcy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSg1KTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoNCk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDMpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSgzKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoMik7XG5cbiAgICAgICAgVUkucmVuZGVyUGxheWVyQm9hcmQoKTtcbiAgICAgICAgVUkucmVuZGVyQ29tcHV0ZXJCb2FyZCgpO1xuICAgICAgICBVSS5nYW1lU3RhcnRlZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVUkuaGFuZGxlUGxhY2VTaGlwT3JTdGFydEdhbWVDbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gTUFJTiBHQU1FIExPR0lDXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIGdhbWVTdGFydGVkKCkge1xuICAgIEdhbWVsb29wLmNoZWNrV2lubmVyKCk7XG5cbiAgICBpZiAoIUdhbWVsb29wLndpbm5lcikge1xuICAgICAgVUkucmVuZGVyUGxheWVyQm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcblxuICAgICAgY29uc3QgYWlCb2FyZCA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFpYm9hcmQtZ3JpZCBkaXZcIildO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFpQm9hcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGFpQm9hcmRbaV0uY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIC8vIEdldCB0aGUgdmFsdWUgb2YgdGhlIGRhdGEtcm93IGF0dHJpYnV0ZSBhcyBhIG51bWJlclxuICAgICAgICAgIGNvbnN0IHJvdyA9IE51bWJlcihhaUJvYXJkW2ldLmRhdGFzZXQucm93KTtcblxuICAgICAgICAgIC8vIEdldCB0aGUgdmFsdWUgb2YgdGhlIGRhdGEtY29sdW1uIGF0dHJpYnV0ZSBhcyBhIG51bWJlclxuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihhaUJvYXJkW2ldLmRhdGFzZXQuY29sdW1uKTtcblxuICAgICAgICAgIGFpQm9hcmRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIEdhbWVsb29wLnBsYXllci5tYW51YWxBdHRhY2soR2FtZWxvb3AuY29tcHV0ZXIsIHJvdywgY29sdW1uKTtcbiAgICAgICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmF1dG9tYXRpY0F0dGFjayhHYW1lbG9vcC5wbGF5ZXIpO1xuXG4gICAgICAgICAgICBVSS5yZW5kZXJDb21wdXRlckJvYXJkKCk7XG4gICAgICAgICAgICBVSS5yZW5kZXJQbGF5ZXJCb2FyZCgpO1xuXG4gICAgICAgICAgICBVSS5nYW1lU3RhcnRlZCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIFVJLmFubm91bmNlbWVudE1vZGFsLmNsYXNzTGlzdC5hZGQoXCJhbm5vdW5jZW1lbnQtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgIGlmIChHYW1lbG9vcC53aW5uZXIubmFtZSA9PT0gXCJLcmlzXCIpIHtcbiAgICAgICAgVUkuZGlzcGxheVdpbm5lci50ZXh0Q29udGVudCA9IFwiWW91IHdvbiB0aGUgYmF0dGxlIVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVUkuZGlzcGxheVdpbm5lci50ZXh0Q29udGVudCA9IFwiWW91IGxvc3QgdGhlIGJhdHRsZSFcIjtcbiAgICAgIH1cblxuICAgICAgVUkuY2xvc2VBbm5vdW5jZW1lbnRNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBVSS5hbm5vdW5jZW1lbnRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiYW5ub3VuY2VtZW50LW1vZGFsLXZpc2libGVcIik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNoYWRvdyAqL1xuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5fZ2VuZXJhdGVHcmlkKCk7XG4gICAgdGhpcy5hdHRhY2tzID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgX2dlbmVyYXRlR3JpZCgpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbiArPSAxKSB7XG4gICAgICAgIGFyci5wdXNoKFtyb3csIGNvbHVtbiwgbnVsbF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIHBsYWNlbWVudCA9IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgaWYgKGxlbmd0aCA8IDEgfHwgbGVuZ3RoID4gMTApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2hpcCBsZW5ndGguXCIpO1xuICAgIH1cblxuICAgIGlmIChyb3cgPCAwIHx8IHJvdyA+IDkgfHwgY29sdW1uIDwgMCB8fCBjb2x1bW4gPiA5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0YXJ0aW5nIGNvb3JkaW5hdGVzLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGxldCBuZXdSb3cgPSByb3c7XG4gICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uO1xuXG4gICAgICBpZiAocGxhY2VtZW50ID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBuZXdDb2x1bW4gKz0gaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1JvdyArPSBpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3Um93IDwgMCB8fCBuZXdSb3cgPiA5IHx8IG5ld0NvbHVtbiA8IDAgfHwgbmV3Q29sdW1uID4gOSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIHBsYWNlbWVudCBvdXQgb2YgYm91bmRzLlwiKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSB0aGlzLmdyaWRbal07XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGN1cnJlbnRDb29yZGluYXRlWzBdID09PSBuZXdSb3cgJiZcbiAgICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZVsxXSA9PT0gbmV3Q29sdW1uICYmXG4gICAgICAgICAgY3VycmVudENvb3JkaW5hdGVbMl0gIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCJTaGlwIGNvbGxpc2lvbiBkZXRlY3RlZC4gQ2Fubm90IHBsYWNlIHNoaXAgb24gdG9wIG9mIGFub3RoZXIgc2hpcC5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW25ld1JvdywgbmV3Q29sdW1uLCBudWxsXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb29yZGluYXRlID0gc2hpcENvb3JkaW5hdGVzW2tdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdyaWQuZmluZEluZGV4KFxuICAgICAgICAoZWxlbWVudCkgPT5cbiAgICAgICAgICBlbGVtZW50WzBdID09PSBjdXJyZW50Q29vcmRpbmF0ZVswXSAmJlxuICAgICAgICAgIGVsZW1lbnRbMV0gPT09IGN1cnJlbnRDb29yZGluYXRlWzFdXG4gICAgICApO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZ3JpZFtpbmRleF1bMl0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcEF1dG9tYXRpY2FsbHkobGVuZ3RoLCBtYXhSZXRyaWVzID0gNTAwMCkge1xuICAgIGNvbnN0IGdldFJhbmRvbUluZGV4ID0gKG1heCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcblxuICAgIGxldCByZXRyaWVzID0gMDtcbiAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoIXBsYWNlZCAmJiByZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgY29uc3Qgcm93ID0gZ2V0UmFuZG9tSW5kZXgoMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gZ2V0UmFuZG9tSW5kZXgoMTApO1xuICAgICAgY29uc3QgcGxhY2VtZW50ID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBwbGFjZW1lbnQpO1xuICAgICAgICBwbGFjZWQgPSB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSW52YWxpZCBwbGFjZW1lbnQsIHJldHJ5XG4gICAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXBsYWNlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBsYWNlIHNoaXAgYWZ0ZXIgbWF4aW11bSByZXRyaWVzXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBjb25zdCBbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW5dID0gW3JvdywgY29sdW1uXTtcblxuICAgIGlmIChcbiAgICAgIHRhcmdldFJvdyA8IDAgfHxcbiAgICAgIHRhcmdldFJvdyA+PSAxMCB8fFxuICAgICAgdGFyZ2V0Q29sdW1uIDwgMCB8fFxuICAgICAgdGFyZ2V0Q29sdW1uID49IDEwXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPdXQgb2YgYm91bmRzXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWQuZmluZChcbiAgICAgIChbciwgY29sXSkgPT4gciA9PT0gdGFyZ2V0Um93ICYmIGNvbCA9PT0gdGFyZ2V0Q29sdW1uXG4gICAgKTtcblxuICAgIGlmICghY2VsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBub3QgZm91bmRcIik7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5hdHRhY2tzLmZpbmQoKFtyLCBjb2xdKSA9PiByID09PSB0YXJnZXRSb3cgJiYgY29sID09PSB0YXJnZXRDb2x1bW4pXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGFscmVhZHkgYXR0YWNrZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKGNlbGxbMl0pIHtcbiAgICAgIGNlbGxbMl0uaGl0KCk7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW4sIFwiK1wiXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFja3MucHVzaChbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW4sIFwiLVwiXSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXJlQWxsU2hpcHNTdW5rKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKCF0aGlzLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tIFwiLi9kb21cIjtcblxuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWxvb3Age1xuICBzdGF0aWMgcGxheWVyID0gbmV3IFBsYXllcihcIktyaXNcIik7XG5cbiAgc3RhdGljIGNvbXB1dGVyID0gbmV3IFBsYXllcigpO1xuXG4gIHN0YXRpYyB3aW5uZXIgPSBudWxsO1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIC8vIFVJLmRyYXdHYW1lYm9hcmRzKCk7XG4gICAgVUkuZXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHN0YXRpYyBjaGVja1dpbm5lcigpIHtcbiAgICBpZiAoR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgR2FtZWxvb3Aud2lubmVyID0gR2FtZWxvb3AuY29tcHV0ZXI7XG4gICAgfSBlbHNlIGlmIChHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXJlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIEdhbWVsb29wLndpbm5lciA9IEdhbWVsb29wLnBsYXllcjtcbiAgICB9XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRpbnVlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgc3RhdGljIHR1cm5zID0gW107XG5cbiAgY29uc3RydWN0b3IobmFtZSA9IFwiQ29tcHV0ZXJcIikge1xuICAgIHRoaXMubmFtZSA9IHRoaXMuX2NoZWNrUGxheWVyTmFtZShuYW1lKTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIF9jaGVja1BsYXllck5hbWUobmFtZSkge1xuICAgIGlmICghbmFtZS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5hbWUgY2Fubm90IGJlIGVtcHR5XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgfVxuXG4gIG1hbnVhbEF0dGFjayhvcHBvbmVudCwgcm93LCBjb2x1bW4pIHtcbiAgICBpZiAob3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pKSB7XG4gICAgICBQbGF5ZXIudHVybnMucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGF1dG9tYXRpY0F0dGFjayhvcHBvbmVudCkge1xuICAgIGNvbnN0IGF0dGFja3NJbml0aWFsTGVuZ3RoID0gb3Bwb25lbnQuZ2FtZWJvYXJkLmF0dGFja3MubGVuZ3RoO1xuICAgXG4gICAgd2hpbGUgKGF0dGFja3NJbml0aWFsTGVuZ3RoID09PSBvcHBvbmVudC5nYW1lYm9hcmQuYXR0YWNrcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgb3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBQbGF5ZXIudHVybnMucHVzaCh0aGlzLm5hbWUpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gY29uc3Qgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4vLyAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuLy8gICAgIHNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbi8vICAgfVxuLy8gfVxuXG4vLyBjb25zdCBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuLy8gY29uc3QgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgLy8gICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcbiAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG4gICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG5cbi8vICAgICBjb25zdCBzaW5nbGVDZWxsMiA9IHNpbmdsZUNlbGwuY2xvbmVOb2RlKHRydWUpO1xuLy8gICAgIGFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuLy8gICAgIHlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbDIpO1xuLy8gICB9XG4vLyB9XG5cbmltcG9ydCBHYW1lbG9vcCBmcm9tIFwiLi9nYW1lbG9vcFwiXG5cbkdhbWVsb29wLmluaXQoKTsiXSwibmFtZXMiOlsiR2FtZWxvb3AiLCJQbGF5ZXIiLCJVSSIsIm5ld0dhbWVCdG4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJob3dUb0J0biIsImhvd1RvUGxheU1vZGFsIiwiY2xvc2VCdG4iLCJwbGFjZVNoaXBzTW9kYWwiLCJzaGlwSW5mb1BhcmEiLCJpbnB1dFJvdyIsImlucHV0Q29sdW1uIiwiaG9yaXpvbnRhbFJhZGlvIiwidmVydGljYWxSYWRpbyIsInBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuIiwiZXJyb3JQbGFjaW5nU2hpcCIsInBsYWNlZFNoaXBzQ291bnRlciIsInNoaXBzVG9QbGFjZSIsIm5hbWUiLCJsZW5ndGgiLCJhbm5vdW5jZW1lbnRNb2RhbCIsImNsb3NlQW5ub3VuY2VtZW50TW9kYWwiLCJkaXNwbGF5V2lubmVyIiwic2VsZWN0U2hpcHNHcmlkIiwiYWlCb2FyZEdyaWQiLCJ5b3VyQm9hcmRHcmlkIiwicmVuZGVyQWRkU2hpcEdhbWVib2FyZCIsImlubmVySFRNTCIsInJlbmRlclNoaXBOYW1lVG9QbGFjZSIsInJvdyIsImNvbHVtbiIsImdhbWVib2FyZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiZGF0YXNldCIsInRvU3RyaW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJpc1NoaXBQbGFjZWQiLCJwbGF5ZXIiLCJnYW1lYm9hcmQiLCJncmlkIiwic29tZSIsImNlbGwiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2siLCJzaGlwTGVuZ3RoIiwidmFsdWUiLCJvcmllbnRhdGlvbiIsImNoZWNrZWQiLCJjaGVja1ZhbGlkaXR5IiwicGxhY2VTaGlwIiwicmVtb3ZlIiwiZXJyb3IiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsImkiLCJhdHRhY2tzIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImNvbXB1dGVyIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwid2lubmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwicGxhY2VTaGlwQXV0b21hdGljYWxseSIsImdhbWVTdGFydGVkIiwiY2hlY2tXaW5uZXIiLCJhaUJvYXJkIiwicXVlcnlTZWxlY3RvckFsbCIsIk51bWJlciIsIm1hbnVhbEF0dGFjayIsImF1dG9tYXRpY0F0dGFjayIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsIl9nZW5lcmF0ZUdyaWQiLCJzaGlwcyIsImFyciIsInB1c2giLCJwbGFjZW1lbnQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJFcnJvciIsInNoaXBDb29yZGluYXRlcyIsIm5ld1JvdyIsIm5ld0NvbHVtbiIsImoiLCJjdXJyZW50Q29vcmRpbmF0ZSIsInNoaXAiLCJrIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJlbGVtZW50IiwibWF4UmV0cmllcyIsImdldFJhbmRvbUluZGV4IiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmV0cmllcyIsInBsYWNlZCIsInJlY2VpdmVBdHRhY2siLCJ0YXJnZXRSb3ciLCJ0YXJnZXRDb2x1bW4iLCJmaW5kIiwiX3JlZiIsInIiLCJjb2wiLCJfcmVmMiIsImhpdCIsImFyZUFsbFNoaXBzU3VuayIsImlzU3VuayIsImluaXQiLCJ0dXJucyIsIl9jaGVja1BsYXllck5hbWUiLCJyZXBsYWNlIiwib3Bwb25lbnQiLCJhdHRhY2tzSW5pdGlhbExlbmd0aCIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9
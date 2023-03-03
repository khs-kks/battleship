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
        const isShipPlaced = _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.grid.some(cell => cell[0] === row && cell[1] === column && cell[2]);
        if (isShipPlaced) {
          gameboardCell.textContent = "X";
          // gameboardCell.classList.add("myships");
        }

        for (let i = 0; i < _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks.length; i += 1) {
          if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][0] === row && _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][1] === column) {
            if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][2] === "+") {
              gameboardCell.classList.add("hit");
            } else if (_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.attacks[i][2] === "-") {
              gameboardCell.classList.add("miss");
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
        console.log("OK! Ready to start!");
        UI.placeShipsModal.classList.remove("place-ships-modal-visible");
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(5);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(4);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(3);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(3);
        _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.gameboard.placeShipAutomatically(2);
        UI.renderPlayerBoard();
        UI.renderComputerBoard();

        // DONE: set modal to display: none
        // DONE: generate the AI ships
        // DONE: render the player's ships on main page
      } else {
        UI.handlePlaceShipOrStartGameClick();
      }
    });
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
      console.log("------------------");
      console.log(`Row generated: ${row}`);
      console.log(`Column generated: ${column}`);
      console.log(`Placement generated: ${placement}`);
      console.log(`Length: ${length}`);
      try {
        this.placeShip(length, row, column, placement);
        console.log("Success!!");
        placed = true;
      } catch (error) {
        // Invalid placement, retry
        console.log(`Error msg: ${error}`);
        retries += 1;
        console.log(`Retrying... ${retries}`);
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
  static init() {
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].drawGameboards();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].eventListeners();
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
    let attackSuccessful = false;
    do {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      try {
        attackSuccessful = opponent.gameboard.receiveAttack(row, column);
      } catch {
        continue;
      }
    } while (!attackSuccessful);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVsb29wIGZyb20gXCIuL2dhbWVsb29wXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIHN0YXRpYyBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5uZXctZ2FtZVwiKTtcblxuICBzdGF0aWMgaG93VG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmhvdy10b1wiKTtcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEhPVy1UTy1QTEFZIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBob3dUb1BsYXlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG93LXRvLXBsYXktbW9kYWxcIik7XG5cbiAgc3RhdGljIGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW4uY2xvc2UtYnV0dG9uXCIpO1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBQTEFDRSBTSElQUyBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBwbGFjZVNoaXBzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuXG4gIHN0YXRpYyBzaGlwSW5mb1BhcmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tc2hpcC1uYW1lLWxlbmd0aFwiKTtcblxuICBzdGF0aWMgaW5wdXRSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvd1wiKTtcblxuICBzdGF0aWMgaW5wdXRDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbHVtblwiKTtcblxuICBzdGF0aWMgaG9yaXpvbnRhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3Jpem9udGFsXCIpO1xuXG4gIHN0YXRpYyB2ZXJ0aWNhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2ZXJ0aWNhbFwiKTtcblxuICBzdGF0aWMgcGxhY2VTaGlwT3JTdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXAtYnV0dG9uXCIpO1xuXG4gIHN0YXRpYyBlcnJvclBsYWNpbmdTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvci1wbGFjaW5nXCIpO1xuXG4gIHN0YXRpYyAjcGxhY2VkU2hpcHNDb3VudGVyID0gMDtcblxuICBzdGF0aWMgI3NoaXBzVG9QbGFjZSA9IFtcbiAgICB7IG5hbWU6IFwiQ2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IG5hbWU6IFwiQ3J1aXNlclwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiwgbGVuZ3RoOiAyIH0sXG4gIF07XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gV0lOTkVSIEFOTk9VTkNFTUVOVCBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24ucmVzdGFydC1nYW1lXCIpO1xuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEdBTUVCT0FSRFNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuICBzdGF0aWMgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcblxuICBzdGF0aWMgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gRFJBVyBUSEUgR0FNRUJPQVJEU1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBkcmF3R2FtZWJvYXJkcygpIHtcbiAgICBVSS5zZWxlY3RTaGlwc0dyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuICAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4gICAgICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4gICAgICAgIC8vIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgY29uc3Qgc2luZ2xlQ2VsbDIgPSBzaW5nbGVDZWxsLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgVUkuYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4gICAgICAgIFVJLnlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbDIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW5kZXJBZGRTaGlwR2FtZWJvYXJkKCkge1xuICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5yb3cgPSByb3cudG9TdHJpbmcoKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbi50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuICAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlclNoaXBOYW1lVG9QbGFjZSgpIHtcbiAgICBpZiAoVUkuI3BsYWNlZFNoaXBzQ291bnRlciA8IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGxlbmd0aCB9ID0gVUkuI3NoaXBzVG9QbGFjZVtVSS4jcGxhY2VkU2hpcHNDb3VudGVyXTtcbiAgICAgIFVJLnNoaXBJbmZvUGFyYS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7bmFtZX0sIGxlbmd0aCAke2xlbmd0aH1gO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrKCkge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS4jc2hpcHNUb1BsYWNlW1VJLiNwbGFjZWRTaGlwc0NvdW50ZXJdLmxlbmd0aDtcbiAgICBjb25zdCByb3cgPSArVUkuaW5wdXRSb3cudmFsdWU7XG4gICAgY29uc3QgY29sdW1uID0gK1VJLmlucHV0Q29sdW1uLnZhbHVlO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gVUkuaG9yaXpvbnRhbFJhZGlvLmNoZWNrZWQgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgIGlmICghVUkuaW5wdXRSb3cuY2hlY2tWYWxpZGl0eSgpIHx8ICFVSS5pbnB1dENvbHVtbi5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBcIkludmFsaWQgSW5wdXRcIjtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcbiAgICAgIFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgKz0gMTtcbiAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItcGxhY2luZy12aXNpYmxlXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLnRleHRDb250ZW50ID0gZXJyb3I7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgfVxuXG4gICAgaWYgKFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgPT09IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xuICAgICAgVUkuc2hpcEluZm9QYXJhLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgc2V0ISBSZWFkeSB0byByb2xsIVwiO1xuICAgIH1cbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIE1BSU4gR0FNRSBBTkQgQk9BUkRTXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIHJlbmRlclBsYXllckJvYXJkKCkge1xuICAgIFVJLnlvdXJCb2FyZEdyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG4gICAgICAgIFVJLnlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVswXSA9PT0gcm93ICYmXG4gICAgICAgICAgICBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMV0gPT09IGNvbHVtblxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsyXSA9PT0gXCIrXCIpIHtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMl0gPT09IFwiLVwiKSB7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlckNvbXB1dGVyQm9hcmQoKSB7XG4gICAgVUkuYWlCb2FyZEdyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG4gICAgICAgIFVJLmFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKGdhbWVib2FyZENlbGwpO1xuXG4gICAgICAgIGNvbnN0IGlzU2hpcFBsYWNlZCA9IEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIC8vIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMF0gPT09IHJvdyAmJlxuICAgICAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMV0gPT09IGNvbHVtblxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzJdID09PSBcIitcIikge1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzJdID09PSBcIi1cIikge1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEFERCBFVkVOVCBMSVNURU5FUlNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgVUkubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgR2FtZWxvb3AucGxheWVyID0gbnVsbDtcbiAgICAgIEdhbWVsb29wLmNvbXB1dGVyID0gbnVsbDtcblxuICAgICAgR2FtZWxvb3AucGxheWVyID0gbmV3IFBsYXllcihcIktyaXNcIik7XG4gICAgICBHYW1lbG9vcC5jb21wdXRlciA9IG5ldyBQbGF5ZXIoKTtcblxuICAgICAgVUkuI3BsYWNlZFNoaXBzQ291bnRlciA9IDA7XG4gICAgICBVSS5yZW5kZXJBZGRTaGlwR2FtZWJvYXJkKCk7XG4gICAgICBVSS5yZW5kZXJTaGlwTmFtZVRvUGxhY2UoKTtcbiAgICAgIFVJLmlucHV0Um93LnZhbHVlID0gXCJcIjtcbiAgICAgIFVJLmlucHV0Q29sdW1uLnZhbHVlID0gXCJcIjtcbiAgICAgIFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLnRleHRDb250ZW50ID0gXCJQbGFjZSBzaGlwXCI7XG5cbiAgICAgIFVJLnBsYWNlU2hpcHNNb2RhbC5jbGFzc0xpc3QuYWRkKFwicGxhY2Utc2hpcHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICB9KTtcblxuICAgIFVJLmhvd1RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBVSS5ob3dUb1BsYXlNb2RhbC5jbGFzc0xpc3QuYWRkKFwiaG93LXRvLXBsYXktbW9kYWwtdmlzaWJsZVwiKTtcbiAgICB9KTtcblxuICAgIFVJLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBVSS5ob3dUb1BsYXlNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiaG93LXRvLXBsYXktbW9kYWwtdmlzaWJsZVwiKTtcbiAgICB9KTtcblxuICAgIFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLnRleHRDb250ZW50ID09PSBcIlN0YXJ0IGdhbWVcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9LISBSZWFkeSB0byBzdGFydCFcIik7XG4gICAgICAgIFVJLnBsYWNlU2hpcHNNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2Utc2hpcHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoNSk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDQpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSgzKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoMyk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDIpO1xuXG4gICAgICAgIFVJLnJlbmRlclBsYXllckJvYXJkKCk7XG4gICAgICAgIFVJLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcblxuICAgICAgICAvLyBET05FOiBzZXQgbW9kYWwgdG8gZGlzcGxheTogbm9uZVxuICAgICAgICAvLyBET05FOiBnZW5lcmF0ZSB0aGUgQUkgc2hpcHNcbiAgICAgICAgLy8gRE9ORTogcmVuZGVyIHRoZSBwbGF5ZXIncyBzaGlwcyBvbiBtYWluIHBhZ2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVJLmhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2hhZG93ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLl9nZW5lcmF0ZUdyaWQoKTtcbiAgICB0aGlzLmF0dGFja3MgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBfZ2VuZXJhdGVHcmlkKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgYXJyLnB1c2goW3JvdywgY29sdW1uLCBudWxsXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgcGxhY2VtZW50ID0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBpZiAobGVuZ3RoIDwgMSB8fCBsZW5ndGggPiAxMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaGlwIGxlbmd0aC5cIik7XG4gICAgfVxuXG4gICAgaWYgKHJvdyA8IDAgfHwgcm93ID4gOSB8fCBjb2x1bW4gPCAwIHx8IGNvbHVtbiA+IDkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RhcnRpbmcgY29vcmRpbmF0ZXMuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IG5ld1JvdyA9IHJvdztcbiAgICAgIGxldCBuZXdDb2x1bW4gPSBjb2x1bW47XG5cbiAgICAgIGlmIChwbGFjZW1lbnQgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIG5ld0NvbHVtbiArPSBpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Um93ICs9IGk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdSb3cgPCAwIHx8IG5ld1JvdyA+IDkgfHwgbmV3Q29sdW1uIDwgMCB8fCBuZXdDb2x1bW4gPiA5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgcGxhY2VtZW50IG91dCBvZiBib3VuZHMuXCIpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IHRoaXMuZ3JpZFtqXTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgY3VycmVudENvb3JkaW5hdGVbMF0gPT09IG5ld1JvdyAmJlxuICAgICAgICAgIGN1cnJlbnRDb29yZGluYXRlWzFdID09PSBuZXdDb2x1bW4gJiZcbiAgICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZVsyXSAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIlNoaXAgY29sbGlzaW9uIGRldGVjdGVkLiBDYW5ub3QgcGxhY2Ugc2hpcCBvbiB0b3Agb2YgYW5vdGhlciBzaGlwLlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbbmV3Um93LCBuZXdDb2x1bW4sIG51bGxdKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG5cbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSBzaGlwQ29vcmRpbmF0ZXNba107XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ3JpZC5maW5kSW5kZXgoXG4gICAgICAgIChlbGVtZW50KSA9PlxuICAgICAgICAgIGVsZW1lbnRbMF0gPT09IGN1cnJlbnRDb29yZGluYXRlWzBdICYmXG4gICAgICAgICAgZWxlbWVudFsxXSA9PT0gY3VycmVudENvb3JkaW5hdGVbMV1cbiAgICAgICk7XG5cbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5ncmlkW2luZGV4XVsyXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwQXV0b21hdGljYWxseShsZW5ndGgsIG1heFJldHJpZXMgPSA1MDAwKSB7XG4gICAgY29uc3QgZ2V0UmFuZG9tSW5kZXggPSAobWF4KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuXG4gICAgbGV0IHJldHJpZXMgPSAwO1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlICghcGxhY2VkICYmIHJldHJpZXMgPCBtYXhSZXRyaWVzKSB7XG4gICAgICBjb25zdCByb3cgPSBnZXRSYW5kb21JbmRleCgxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBnZXRSYW5kb21JbmRleCgxMCk7XG4gICAgICBjb25zdCBwbGFjZW1lbnQgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgY29uc29sZS5sb2coYFJvdyBnZW5lcmF0ZWQ6ICR7cm93fWApO1xuICAgICAgY29uc29sZS5sb2coYENvbHVtbiBnZW5lcmF0ZWQ6ICR7Y29sdW1ufWApO1xuICAgICAgY29uc29sZS5sb2coYFBsYWNlbWVudCBnZW5lcmF0ZWQ6ICR7cGxhY2VtZW50fWApO1xuICAgICAgY29uc29sZS5sb2coYExlbmd0aDogJHtsZW5ndGh9YCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIHBsYWNlbWVudCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyEhXCIpO1xuICAgICAgICBwbGFjZWQgPSB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSW52YWxpZCBwbGFjZW1lbnQsIHJldHJ5XG4gICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciBtc2c6ICR7ZXJyb3J9YCk7XG4gICAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgICAgY29uc29sZS5sb2coYFJldHJ5aW5nLi4uICR7cmV0cmllc31gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXBsYWNlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBsYWNlIHNoaXAgYWZ0ZXIgbWF4aW11bSByZXRyaWVzXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBjb25zdCBbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW5dID0gW3JvdywgY29sdW1uXTtcblxuICAgIGlmIChcbiAgICAgIHRhcmdldFJvdyA8IDAgfHxcbiAgICAgIHRhcmdldFJvdyA+PSAxMCB8fFxuICAgICAgdGFyZ2V0Q29sdW1uIDwgMCB8fFxuICAgICAgdGFyZ2V0Q29sdW1uID49IDEwXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPdXQgb2YgYm91bmRzXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWQuZmluZChcbiAgICAgIChbciwgY29sXSkgPT4gciA9PT0gdGFyZ2V0Um93ICYmIGNvbCA9PT0gdGFyZ2V0Q29sdW1uXG4gICAgKTtcblxuICAgIGlmICghY2VsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBub3QgZm91bmRcIik7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5hdHRhY2tzLmZpbmQoKFtyLCBjb2xdKSA9PiByID09PSB0YXJnZXRSb3cgJiYgY29sID09PSB0YXJnZXRDb2x1bW4pXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGFscmVhZHkgYXR0YWNrZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKGNlbGxbMl0pIHtcbiAgICAgIGNlbGxbMl0uaGl0KCk7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW4sIFwiK1wiXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFja3MucHVzaChbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW4sIFwiLVwiXSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXJlQWxsU2hpcHNTdW5rKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKCF0aGlzLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tIFwiLi9kb21cIjtcblxuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWxvb3Age1xuICBzdGF0aWMgcGxheWVyID0gbmV3IFBsYXllcihcIktyaXNcIik7XG5cbiAgc3RhdGljIGNvbXB1dGVyID0gbmV3IFBsYXllcigpO1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIFVJLmRyYXdHYW1lYm9hcmRzKCk7XG4gICAgVUkuZXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29udGludWUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBzdGF0aWMgdHVybnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihuYW1lID0gXCJDb21wdXRlclwiKSB7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5fY2hlY2tQbGF5ZXJOYW1lKG5hbWUpO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgX2NoZWNrUGxheWVyTmFtZShuYW1lKSB7XG4gICAgaWYgKCFuYW1lLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmFtZSBjYW5ub3QgYmUgZW1wdHlcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICB9XG5cbiAgbWFudWFsQXR0YWNrKG9wcG9uZW50LCByb3csIGNvbHVtbikge1xuICAgIGlmIChvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikpIHtcbiAgICAgIFBsYXllci50dXJucy5wdXNoKHRoaXMubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXV0b21hdGljQXR0YWNrKG9wcG9uZW50KSB7XG4gICAgbGV0IGF0dGFja1N1Y2Nlc3NmdWwgPSBmYWxzZTtcblxuICAgIGRvIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXR0YWNrU3VjY2Vzc2Z1bCA9IG9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9IHdoaWxlICghYXR0YWNrU3VjY2Vzc2Z1bCk7XG5cbiAgICBQbGF5ZXIudHVybnMucHVzaCh0aGlzLm5hbWUpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gY29uc3Qgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4vLyAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuLy8gICAgIHNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbi8vICAgfVxuLy8gfVxuXG4vLyBjb25zdCBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuLy8gY29uc3QgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgLy8gICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcbiAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG4gICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG5cbi8vICAgICBjb25zdCBzaW5nbGVDZWxsMiA9IHNpbmdsZUNlbGwuY2xvbmVOb2RlKHRydWUpO1xuLy8gICAgIGFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuLy8gICAgIHlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbDIpO1xuLy8gICB9XG4vLyB9XG5cbmltcG9ydCBHYW1lbG9vcCBmcm9tIFwiLi9nYW1lbG9vcFwiXG5cbkdhbWVsb29wLmluaXQoKTsiXSwibmFtZXMiOlsiR2FtZWxvb3AiLCJQbGF5ZXIiLCJVSSIsIm5ld0dhbWVCdG4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJob3dUb0J0biIsImhvd1RvUGxheU1vZGFsIiwiY2xvc2VCdG4iLCJwbGFjZVNoaXBzTW9kYWwiLCJzaGlwSW5mb1BhcmEiLCJpbnB1dFJvdyIsImlucHV0Q29sdW1uIiwiaG9yaXpvbnRhbFJhZGlvIiwidmVydGljYWxSYWRpbyIsInBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuIiwiZXJyb3JQbGFjaW5nU2hpcCIsInBsYWNlZFNoaXBzQ291bnRlciIsInNoaXBzVG9QbGFjZSIsIm5hbWUiLCJsZW5ndGgiLCJyZXN0YXJ0R2FtZUJ0biIsInNlbGVjdFNoaXBzR3JpZCIsImFpQm9hcmRHcmlkIiwieW91ckJvYXJkR3JpZCIsImRyYXdHYW1lYm9hcmRzIiwiaW5uZXJIVE1MIiwiaSIsImoiLCJzaW5nbGVDZWxsIiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJyb3ciLCJ0b1N0cmluZyIsImNvbHVtbiIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwic2luZ2xlQ2VsbDIiLCJjbG9uZU5vZGUiLCJyZW5kZXJBZGRTaGlwR2FtZWJvYXJkIiwicmVuZGVyU2hpcE5hbWVUb1BsYWNlIiwiZ2FtZWJvYXJkQ2VsbCIsImlzU2hpcFBsYWNlZCIsInBsYXllciIsImdhbWVib2FyZCIsImdyaWQiLCJzb21lIiwiY2VsbCIsInRleHRDb250ZW50IiwiaGFuZGxlUGxhY2VTaGlwT3JTdGFydEdhbWVDbGljayIsInNoaXBMZW5ndGgiLCJ2YWx1ZSIsIm9yaWVudGF0aW9uIiwiY2hlY2tlZCIsImNoZWNrVmFsaWRpdHkiLCJwbGFjZVNoaXAiLCJyZW1vdmUiLCJlcnJvciIsInJlbmRlclBsYXllckJvYXJkIiwiYXR0YWNrcyIsInJlbmRlckNvbXB1dGVyQm9hcmQiLCJjb21wdXRlciIsImV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJwbGFjZVNoaXBBdXRvbWF0aWNhbGx5IiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwiX2dlbmVyYXRlR3JpZCIsInNoaXBzIiwiYXJyIiwicHVzaCIsInBsYWNlbWVudCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIkVycm9yIiwic2hpcENvb3JkaW5hdGVzIiwibmV3Um93IiwibmV3Q29sdW1uIiwiY3VycmVudENvb3JkaW5hdGUiLCJzaGlwIiwiayIsImluZGV4IiwiZmluZEluZGV4IiwiZWxlbWVudCIsIm1heFJldHJpZXMiLCJnZXRSYW5kb21JbmRleCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJldHJpZXMiLCJwbGFjZWQiLCJyZWNlaXZlQXR0YWNrIiwidGFyZ2V0Um93IiwidGFyZ2V0Q29sdW1uIiwiZmluZCIsIl9yZWYiLCJyIiwiY29sIiwiX3JlZjIiLCJoaXQiLCJhcmVBbGxTaGlwc1N1bmsiLCJpc1N1bmsiLCJpbml0IiwidHVybnMiLCJfY2hlY2tQbGF5ZXJOYW1lIiwicmVwbGFjZSIsIm1hbnVhbEF0dGFjayIsIm9wcG9uZW50IiwiYXV0b21hdGljQXR0YWNrIiwiYXR0YWNrU3VjY2Vzc2Z1bCIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9
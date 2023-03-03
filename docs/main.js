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

        // DONE: set modal to display: none
        // DONE: generate the AI ships
        // render the player's ships on main page
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

  // placeShip(length, row, column, placement = "horizontal") {
  //   if (placement === "horizontal") {
  //     // Check if the ship placement is valid
  //     for (let j = 0; j < length; j += 1) {
  //       const cell = this.grid.find(
  //         (field) => field[0] === row && field[1] === column + j
  //       );
  //       if (!cell || cell[2]) {
  //         throw new Error("Invalid ship placement");
  //       }
  //     }

  //     const ship = new Ship(length);
  //     this.ships.push(ship);

  //     // Place the ship in the cells
  //     for (let j = 0; j < length; j += 1) {
  //       const cell = this.grid.find(
  //         (field) => field[0] === row && field[1] === column + j
  //       );
  //       cell[2] = ship;
  //     }
  //   } else if (placement === "vertical") {
  //     // Check if the ship placement is valid
  //     for (let j = 0; j < length; j += 1) {
  //       const cell = this.grid.find(
  //         (field) => field[0] === row + j && field[1] === column
  //       );
  //       if (!cell || cell[2]) {
  //         throw new Error("Invalid ship placement");
  //       }
  //     }
  //     const ship = new Ship(length);
  //     this.ships.push(ship);

  //     // Place the ship in the cells
  //     for (let j = 0; j < length; j += 1) {
  //       const cell = this.grid.find(
  //         (field) => field[0] === row + j && field[1] === column
  //       );
  //       cell[2] = ship;
  //     }
  //   }
  // }

  placeShip(length, row, column) {
    let placement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "horizontal";
    const checkCell = (j, getCell) => {
      const cell = getCell(j);
      if (!cell || cell[2]) {
        throw new Error("Invalid ship placement");
      }
    };
    const placeShipInCell = (j, getCell, ship) => {
      const cell = getCell(j);
      cell[2] = ship;
    };
    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);
    if (placement === "horizontal") {
      for (let j = 0; j < length; j += 1) {
        checkCell(j, j => this.grid.find(field => field[0] === row && field[1] === column + j));
        placeShipInCell(j, j => this.grid.find(field => field[0] === row && field[1] === column + j), ship);
      }
    } else if (placement === "vertical") {
      for (let j = 0; j < length; j += 1) {
        checkCell(j, j => this.grid.find(field => field[0] === row + j && field[1] === column));
        placeShipInCell(j, j => this.grid.find(field => field[0] === row + j && field[1] === column), ship);
      }
    }
    this.ships.push(ship);
  }
  placeShipAutomatically(length) {
    let maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    const getRandomIndex = max => Math.floor(Math.random() * max);
    let retries = 0;
    let placed = false;
    while (!placed && retries < maxRetries) {
      const row = getRandomIndex(this.grid.length);
      const column = getRandomIndex(this.grid.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQ3ZELElBQUksQ0FBQztFQUM5QjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQzNDQTs7QUFFZSxNQUFNZ0QsSUFBSSxDQUFDO0VBQ3hCRSxXQUFXQSxDQUFDakQsTUFBTSxFQUFFO0lBQ2xCLElBQUksQ0FBQ0EsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQzJGLElBQUksR0FBRyxDQUFDO0VBQ2Y7RUFFQVgsR0FBR0EsQ0FBQSxFQUFHO0lBQ0osSUFBSSxJQUFJLENBQUNXLElBQUksR0FBRyxJQUFJLENBQUMzRixNQUFNLEVBQUUsSUFBSSxDQUFDMkYsSUFBSSxJQUFJLENBQUM7RUFDN0M7RUFFQVQsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsT0FBTyxJQUFJLENBQUNTLElBQUksSUFBSSxJQUFJLENBQUMzRixNQUFNO0VBQ2pDO0FBQ0Y7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDO0FBRWpDcEIsc0RBQWEsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVsb29wIGZyb20gXCIuL2dhbWVsb29wXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIHN0YXRpYyBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5uZXctZ2FtZVwiKTtcblxuICBzdGF0aWMgaG93VG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmhvdy10b1wiKTtcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEhPVy1UTy1QTEFZIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBob3dUb1BsYXlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG93LXRvLXBsYXktbW9kYWxcIik7XG5cbiAgc3RhdGljIGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW4uY2xvc2UtYnV0dG9uXCIpO1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBQTEFDRSBTSElQUyBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBwbGFjZVNoaXBzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuXG4gIHN0YXRpYyBzaGlwSW5mb1BhcmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tc2hpcC1uYW1lLWxlbmd0aFwiKTtcblxuICBzdGF0aWMgaW5wdXRSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvd1wiKTtcblxuICBzdGF0aWMgaW5wdXRDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbHVtblwiKTtcblxuICBzdGF0aWMgaG9yaXpvbnRhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3Jpem9udGFsXCIpO1xuXG4gIHN0YXRpYyB2ZXJ0aWNhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2ZXJ0aWNhbFwiKTtcblxuICBzdGF0aWMgcGxhY2VTaGlwT3JTdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXAtYnV0dG9uXCIpO1xuXG4gIHN0YXRpYyBlcnJvclBsYWNpbmdTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvci1wbGFjaW5nXCIpO1xuXG4gIHN0YXRpYyAjcGxhY2VkU2hpcHNDb3VudGVyID0gMDtcblxuICBzdGF0aWMgI3NoaXBzVG9QbGFjZSA9IFtcbiAgICB7IG5hbWU6IFwiQ2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IG5hbWU6IFwiQ3J1aXNlclwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiwgbGVuZ3RoOiAyIH0sXG4gIF07XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gV0lOTkVSIEFOTk9VTkNFTUVOVCBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24ucmVzdGFydC1nYW1lXCIpO1xuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEdBTUVCT0FSRFNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuICBzdGF0aWMgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcblxuICBzdGF0aWMgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gRFJBVyBUSEUgR0FNRUJPQVJEU1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBkcmF3R2FtZWJvYXJkcygpIHtcbiAgICBVSS5zZWxlY3RTaGlwc0dyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuICAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4gICAgICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4gICAgICAgIC8vIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgY29uc3Qgc2luZ2xlQ2VsbDIgPSBzaW5nbGVDZWxsLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgVUkuYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4gICAgICAgIFVJLnlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbDIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW5kZXJBZGRTaGlwR2FtZWJvYXJkKCkge1xuICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5yb3cgPSByb3cudG9TdHJpbmcoKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbi50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuICAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlclNoaXBOYW1lVG9QbGFjZSgpIHtcbiAgICBpZiAoVUkuI3BsYWNlZFNoaXBzQ291bnRlciA8IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGxlbmd0aCB9ID0gVUkuI3NoaXBzVG9QbGFjZVtVSS4jcGxhY2VkU2hpcHNDb3VudGVyXTtcbiAgICAgIFVJLnNoaXBJbmZvUGFyYS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7bmFtZX0sIGxlbmd0aCAke2xlbmd0aH1gO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrKCkge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS4jc2hpcHNUb1BsYWNlW1VJLiNwbGFjZWRTaGlwc0NvdW50ZXJdLmxlbmd0aDtcbiAgICBjb25zdCByb3cgPSArVUkuaW5wdXRSb3cudmFsdWU7XG4gICAgY29uc3QgY29sdW1uID0gK1VJLmlucHV0Q29sdW1uLnZhbHVlO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gVUkuaG9yaXpvbnRhbFJhZGlvLmNoZWNrZWQgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgIGlmICghVUkuaW5wdXRSb3cuY2hlY2tWYWxpZGl0eSgpIHx8ICFVSS5pbnB1dENvbHVtbi5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBcIkludmFsaWQgSW5wdXRcIjtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcbiAgICAgIFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgKz0gMTtcbiAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItcGxhY2luZy12aXNpYmxlXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLnRleHRDb250ZW50ID0gZXJyb3I7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgfVxuXG4gICAgaWYgKFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgPT09IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xuICAgICAgVUkuc2hpcEluZm9QYXJhLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgc2V0ISBSZWFkeSB0byByb2xsIVwiO1xuICAgIH1cbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEFERCBFVkVOVCBMSVNURU5FUlNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgVUkubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgR2FtZWxvb3AucGxheWVyID0gbnVsbDtcbiAgICAgIEdhbWVsb29wLmNvbXB1dGVyID0gbnVsbDtcblxuICAgICAgR2FtZWxvb3AucGxheWVyID0gbmV3IFBsYXllcihcIktyaXNcIik7XG4gICAgICBHYW1lbG9vcC5jb21wdXRlciA9IG5ldyBQbGF5ZXIoKTtcblxuICAgICAgVUkuI3BsYWNlZFNoaXBzQ291bnRlciA9IDA7XG4gICAgICBVSS5yZW5kZXJBZGRTaGlwR2FtZWJvYXJkKCk7XG4gICAgICBVSS5yZW5kZXJTaGlwTmFtZVRvUGxhY2UoKTtcbiAgICAgIFVJLmlucHV0Um93LnZhbHVlID0gXCJcIjtcbiAgICAgIFVJLmlucHV0Q29sdW1uLnZhbHVlID0gXCJcIjtcbiAgICAgIFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLnRleHRDb250ZW50ID0gXCJQbGFjZSBzaGlwXCI7XG5cbiAgICAgIFVJLnBsYWNlU2hpcHNNb2RhbC5jbGFzc0xpc3QuYWRkKFwicGxhY2Utc2hpcHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICB9KTtcblxuICAgIFVJLmhvd1RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBVSS5ob3dUb1BsYXlNb2RhbC5jbGFzc0xpc3QuYWRkKFwiaG93LXRvLXBsYXktbW9kYWwtdmlzaWJsZVwiKTtcbiAgICB9KTtcblxuICAgIFVJLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBVSS5ob3dUb1BsYXlNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiaG93LXRvLXBsYXktbW9kYWwtdmlzaWJsZVwiKTtcbiAgICB9KTtcblxuICAgIFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLnRleHRDb250ZW50ID09PSBcIlN0YXJ0IGdhbWVcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9LISBSZWFkeSB0byBzdGFydCFcIik7XG4gICAgICAgIFVJLnBsYWNlU2hpcHNNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2Utc2hpcHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoNSk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDQpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSgzKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoMyk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDIpO1xuXG4gICAgICAgIC8vIERPTkU6IHNldCBtb2RhbCB0byBkaXNwbGF5OiBub25lXG4gICAgICAgIC8vIERPTkU6IGdlbmVyYXRlIHRoZSBBSSBzaGlwc1xuICAgICAgICAvLyByZW5kZXIgdGhlIHBsYXllcidzIHNoaXBzIG9uIG1haW4gcGFnZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVUkuaGFuZGxlUGxhY2VTaGlwT3JTdGFydEdhbWVDbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1zaGFkb3cgKi9cbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuX2dlbmVyYXRlR3JpZCgpO1xuICAgIHRoaXMuYXR0YWNrcyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIF9nZW5lcmF0ZUdyaWQoKSB7XG4gICAgY29uc3QgYXJyID0gW107XG5cbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBhcnIucHVzaChbcm93LCBjb2x1bW4sIG51bGxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIC8vIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBwbGFjZW1lbnQgPSBcImhvcml6b250YWxcIikge1xuICAvLyAgIGlmIChwbGFjZW1lbnQgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gIC8vICAgICAvLyBDaGVjayBpZiB0aGUgc2hpcCBwbGFjZW1lbnQgaXMgdmFsaWRcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqICs9IDEpIHtcbiAgLy8gICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZC5maW5kKFxuICAvLyAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyAmJiBmaWVsZFsxXSA9PT0gY29sdW1uICsgalxuICAvLyAgICAgICApO1xuICAvLyAgICAgICBpZiAoIWNlbGwgfHwgY2VsbFsyXSkge1xuICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2hpcCBwbGFjZW1lbnRcIik7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cblxuICAvLyAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gIC8vICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG5cbiAgLy8gICAgIC8vIFBsYWNlIHRoZSBzaGlwIGluIHRoZSBjZWxsc1xuICAvLyAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGogKz0gMSkge1xuICAvLyAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkLmZpbmQoXG4gIC8vICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICYmIGZpZWxkWzFdID09PSBjb2x1bW4gKyBqXG4gIC8vICAgICAgICk7XG4gIC8vICAgICAgIGNlbGxbMl0gPSBzaGlwO1xuICAvLyAgICAgfVxuICAvLyAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBcInZlcnRpY2FsXCIpIHtcbiAgLy8gICAgIC8vIENoZWNrIGlmIHRoZSBzaGlwIHBsYWNlbWVudCBpcyB2YWxpZFxuICAvLyAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGogKz0gMSkge1xuICAvLyAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkLmZpbmQoXG4gIC8vICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICsgaiAmJiBmaWVsZFsxXSA9PT0gY29sdW1uXG4gIC8vICAgICAgICk7XG4gIC8vICAgICAgIGlmICghY2VsbCB8fCBjZWxsWzJdKSB7XG4gIC8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaGlwIHBsYWNlbWVudFwiKTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gIC8vICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG5cbiAgLy8gICAgIC8vIFBsYWNlIHRoZSBzaGlwIGluIHRoZSBjZWxsc1xuICAvLyAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGogKz0gMSkge1xuICAvLyAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkLmZpbmQoXG4gIC8vICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICsgaiAmJiBmaWVsZFsxXSA9PT0gY29sdW1uXG4gIC8vICAgICAgICk7XG4gIC8vICAgICAgIGNlbGxbMl0gPSBzaGlwO1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBwbGFjZW1lbnQgPSBcImhvcml6b250YWxcIikge1xuICAgIGNvbnN0IGNoZWNrQ2VsbCA9IChqLCBnZXRDZWxsKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZ2V0Q2VsbChqKTtcbiAgICAgIGlmICghY2VsbCB8fCBjZWxsWzJdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2hpcCBwbGFjZW1lbnRcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcEluQ2VsbCA9IChqLCBnZXRDZWxsLCBzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZ2V0Q2VsbChqKTtcbiAgICAgIGNlbGxbMl0gPSBzaGlwO1xuICAgIH07XG5cbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGNoZWNrQ2VsbChqLCAoaikgPT5cbiAgICAgICAgICB0aGlzLmdyaWQuZmluZCgoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgJiYgZmllbGRbMV0gPT09IGNvbHVtbiArIGopXG4gICAgICAgICk7XG4gICAgICAgIHBsYWNlU2hpcEluQ2VsbChcbiAgICAgICAgICBqLFxuICAgICAgICAgIChqKSA9PlxuICAgICAgICAgICAgdGhpcy5ncmlkLmZpbmQoXG4gICAgICAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyAmJiBmaWVsZFsxXSA9PT0gY29sdW1uICsgalxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBzaGlwXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFwidmVydGljYWxcIikge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBjaGVja0NlbGwoaiwgKGopID0+XG4gICAgICAgICAgdGhpcy5ncmlkLmZpbmQoKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICsgaiAmJiBmaWVsZFsxXSA9PT0gY29sdW1uKVxuICAgICAgICApO1xuICAgICAgICBwbGFjZVNoaXBJbkNlbGwoXG4gICAgICAgICAgaixcbiAgICAgICAgICAoaikgPT5cbiAgICAgICAgICAgIHRoaXMuZ3JpZC5maW5kKFxuICAgICAgICAgICAgICAoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgKyBqICYmIGZpZWxkWzFdID09PSBjb2x1bW5cbiAgICAgICAgICAgICksXG4gICAgICAgICAgc2hpcFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gIH1cblxuICBwbGFjZVNoaXBBdXRvbWF0aWNhbGx5KGxlbmd0aCwgbWF4UmV0cmllcyA9IDUwMDApIHtcbiAgICBjb25zdCBnZXRSYW5kb21JbmRleCA9IChtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XG5cbiAgICBsZXQgcmV0cmllcyA9IDA7XG4gICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKCFwbGFjZWQgJiYgcmV0cmllcyA8IG1heFJldHJpZXMpIHtcbiAgICAgIGNvbnN0IHJvdyA9IGdldFJhbmRvbUluZGV4KHRoaXMuZ3JpZC5sZW5ndGgpO1xuICAgICAgY29uc3QgY29sdW1uID0gZ2V0UmFuZG9tSW5kZXgodGhpcy5ncmlkLmxlbmd0aCk7XG4gICAgICBjb25zdCBwbGFjZW1lbnQgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIHBsYWNlbWVudCk7XG4gICAgICAgIHBsYWNlZCA9IHRydWU7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBJbnZhbGlkIHBsYWNlbWVudCwgcmV0cnlcbiAgICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcGxhY2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGxhY2Ugc2hpcCBhZnRlciBtYXhpbXVtIHJldHJpZXNcIik7XG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGNvbnN0IFt0YXJnZXRSb3csIHRhcmdldENvbHVtbl0gPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0Um93IDwgMCB8fFxuICAgICAgdGFyZ2V0Um93ID49IDEwIHx8XG4gICAgICB0YXJnZXRDb2x1bW4gPCAwIHx8XG4gICAgICB0YXJnZXRDb2x1bW4gPj0gMTBcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk91dCBvZiBib3VuZHNcIik7XG4gICAgfVxuXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZC5maW5kKFxuICAgICAgKFtyLCBjb2xdKSA9PiByID09PSB0YXJnZXRSb3cgJiYgY29sID09PSB0YXJnZXRDb2x1bW5cbiAgICApO1xuXG4gICAgaWYgKCFjZWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIG5vdCBmb3VuZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmF0dGFja3MuZmluZCgoW3IsIGNvbF0pID0+IHIgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbHVtbilcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgYWxyZWFkeSBhdHRhY2tlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoY2VsbFsyXSkge1xuICAgICAgY2VsbFsyXS5oaXQoKTtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFt0YXJnZXRSb3csIHRhcmdldENvbHVtbiwgXCIrXCJdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYXR0YWNrcy5wdXNoKFt0YXJnZXRSb3csIHRhcmdldENvbHVtbiwgXCItXCJdKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhcmVBbGxTaGlwc1N1bmsoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoIXRoaXMuc2hpcHNbaV0uaXNTdW5rKCkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IFVJIGZyb20gXCIuL2RvbVwiO1xuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lbG9vcCB7XG4gIHN0YXRpYyBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiS3Jpc1wiKTtcblxuICBzdGF0aWMgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgVUkuZHJhd0dhbWVib2FyZHMoKTtcbiAgICBVSS5ldmVudExpc3RlbmVycygpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIHN0YXRpYyB0dXJucyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUgPSBcIkNvbXB1dGVyXCIpIHtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLl9jaGVja1BsYXllck5hbWUobmFtZSk7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIH1cblxuICBfY2hlY2tQbGF5ZXJOYW1lKG5hbWUpIHtcbiAgICBpZiAoIW5hbWUubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOYW1lIGNhbm5vdCBiZSBlbXB0eVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gIH1cblxuICBtYW51YWxBdHRhY2sob3Bwb25lbnQsIHJvdywgY29sdW1uKSB7XG4gICAgaWYgKG9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSkge1xuICAgICAgUGxheWVyLnR1cm5zLnB1c2godGhpcy5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBhdXRvbWF0aWNBdHRhY2sob3Bwb25lbnQpIHtcbiAgICBsZXQgYXR0YWNrU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuXG4gICAgZG8ge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhdHRhY2tTdWNjZXNzZnVsID0gb3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKCFhdHRhY2tTdWNjZXNzZnVsKTtcblxuICAgIFBsYXllci50dXJucy5wdXNoKHRoaXMubmFtZSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBjb25zdCBzZWxlY3RTaGlwc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtc2VsZWN0LXNoaXBzXCIpO1xuXG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbi8vICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbi8vICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuXG4vLyAgICAgc2VsZWN0U2hpcHNHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuLy8gICB9XG4vLyB9XG5cbi8vIGNvbnN0IGFpQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haWJvYXJkLWdyaWRcIik7XG4vLyBjb25zdCB5b3VyQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi55b3VyYm9hcmQtZ3JpZFwiKTtcblxuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4vLyAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJteXNoaXBzXCIpO1xuLy8gICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAvLyAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuICAgIC8vICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcbiAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcblxuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwyID0gc2luZ2xlQ2VsbC5jbG9uZU5vZGUodHJ1ZSk7XG4vLyAgICAgYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4vLyAgICAgeW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsMik7XG4vLyAgIH1cbi8vIH1cblxuaW1wb3J0IEdhbWVsb29wIGZyb20gXCIuL2dhbWVsb29wXCJcblxuR2FtZWxvb3AuaW5pdCgpOyJdLCJuYW1lcyI6WyJHYW1lbG9vcCIsIlBsYXllciIsIlVJIiwibmV3R2FtZUJ0biIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhvd1RvQnRuIiwiaG93VG9QbGF5TW9kYWwiLCJjbG9zZUJ0biIsInBsYWNlU2hpcHNNb2RhbCIsInNoaXBJbmZvUGFyYSIsImlucHV0Um93IiwiaW5wdXRDb2x1bW4iLCJob3Jpem9udGFsUmFkaW8iLCJ2ZXJ0aWNhbFJhZGlvIiwicGxhY2VTaGlwT3JTdGFydEdhbWVCdG4iLCJlcnJvclBsYWNpbmdTaGlwIiwicGxhY2VkU2hpcHNDb3VudGVyIiwic2hpcHNUb1BsYWNlIiwibmFtZSIsImxlbmd0aCIsInJlc3RhcnRHYW1lQnRuIiwic2VsZWN0U2hpcHNHcmlkIiwiYWlCb2FyZEdyaWQiLCJ5b3VyQm9hcmRHcmlkIiwiZHJhd0dhbWVib2FyZHMiLCJpbm5lckhUTUwiLCJpIiwiaiIsInNpbmdsZUNlbGwiLCJjcmVhdGVFbGVtZW50IiwiZGF0YXNldCIsInJvdyIsInRvU3RyaW5nIiwiY29sdW1uIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJzaW5nbGVDZWxsMiIsImNsb25lTm9kZSIsInJlbmRlckFkZFNoaXBHYW1lYm9hcmQiLCJyZW5kZXJTaGlwTmFtZVRvUGxhY2UiLCJnYW1lYm9hcmRDZWxsIiwiaXNTaGlwUGxhY2VkIiwicGxheWVyIiwiZ2FtZWJvYXJkIiwiZ3JpZCIsInNvbWUiLCJjZWxsIiwidGV4dENvbnRlbnQiLCJoYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrIiwic2hpcExlbmd0aCIsInZhbHVlIiwib3JpZW50YXRpb24iLCJjaGVja2VkIiwiY2hlY2tWYWxpZGl0eSIsInBsYWNlU2hpcCIsInJlbW92ZSIsImVycm9yIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcHV0ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwicGxhY2VTaGlwQXV0b21hdGljYWxseSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsIl9nZW5lcmF0ZUdyaWQiLCJhdHRhY2tzIiwic2hpcHMiLCJhcnIiLCJwdXNoIiwicGxhY2VtZW50IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY2hlY2tDZWxsIiwiZ2V0Q2VsbCIsIkVycm9yIiwicGxhY2VTaGlwSW5DZWxsIiwic2hpcCIsImZpbmQiLCJmaWVsZCIsIm1heFJldHJpZXMiLCJnZXRSYW5kb21JbmRleCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJldHJpZXMiLCJwbGFjZWQiLCJyZWNlaXZlQXR0YWNrIiwidGFyZ2V0Um93IiwidGFyZ2V0Q29sdW1uIiwiX3JlZiIsInIiLCJjb2wiLCJfcmVmMiIsImhpdCIsImFyZUFsbFNoaXBzU3VuayIsImlzU3VuayIsImluaXQiLCJ0dXJucyIsIl9jaGVja1BsYXllck5hbWUiLCJyZXBsYWNlIiwibWFudWFsQXR0YWNrIiwib3Bwb25lbnQiLCJhdXRvbWF0aWNBdHRhY2siLCJhdHRhY2tTdWNjZXNzZnVsIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=
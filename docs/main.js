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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDaUcsSUFBSSxHQUFHLENBQUM7RUFDZjtFQUVBWCxHQUFHQSxDQUFBLEVBQUc7SUFDSixJQUFJLElBQUksQ0FBQ1csSUFBSSxHQUFHLElBQUksQ0FBQ2pHLE1BQU0sRUFBRSxJQUFJLENBQUNpRyxJQUFJLElBQUksQ0FBQztFQUM3QztFQUVBVCxNQUFNQSxDQUFBLEVBQUc7SUFDUCxPQUFPLElBQUksQ0FBQ1MsSUFBSSxJQUFJLElBQUksQ0FBQ2pHLE1BQU07RUFDakM7QUFDRjs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFaUM7QUFFakNwQixzREFBYSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVsb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWxvb3AgZnJvbSBcIi4vZ2FtZWxvb3BcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLm5ldy1nYW1lXCIpO1xuXG4gIHN0YXRpYyBob3dUb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uaG93LXRvXCIpO1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gSE9XLVRPLVBMQVkgTU9EQUxcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIGhvd1RvUGxheU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3ctdG8tcGxheS1tb2RhbFwiKTtcblxuICBzdGF0aWMgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3Bhbi5jbG9zZS1idXR0b25cIik7XG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIFBMQUNFIFNISVBTIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIHBsYWNlU2hpcHNNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcHMtbW9kYWxcIik7XG5cbiAgc3RhdGljIHNoaXBJbmZvUGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mby1zaGlwLW5hbWUtbGVuZ3RoXCIpO1xuXG4gIHN0YXRpYyBpbnB1dFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm93XCIpO1xuXG4gIHN0YXRpYyBpbnB1dENvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29sdW1uXCIpO1xuXG4gIHN0YXRpYyBob3Jpem9udGFsUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvcml6b250YWxcIik7XG5cbiAgc3RhdGljIHZlcnRpY2FsUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZlcnRpY2FsXCIpO1xuXG4gIHN0YXRpYyBwbGFjZVNoaXBPclN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcC1idXR0b25cIik7XG5cbiAgc3RhdGljIGVycm9yUGxhY2luZ1NoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yLXBsYWNpbmdcIik7XG5cbiAgc3RhdGljICNwbGFjZWRTaGlwc0NvdW50ZXIgPSAwO1xuXG4gIHN0YXRpYyAjc2hpcHNUb1BsYWNlID0gW1xuICAgIHsgbmFtZTogXCJDYXJyaWVyXCIsIGxlbmd0aDogNSB9LFxuICAgIHsgbmFtZTogXCJCYXR0bGVzaGlwXCIsIGxlbmd0aDogNCB9LFxuICAgIHsgbmFtZTogXCJDcnVpc2VyXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJTdWJtYXJpbmVcIiwgbGVuZ3RoOiAzIH0sXG4gICAgeyBuYW1lOiBcIkRlc3Ryb3llclwiLCBsZW5ndGg6IDIgfSxcbiAgXTtcblxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBXSU5ORVIgQU5OT1VOQ0VNRU5UIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIHJlc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5yZXN0YXJ0LWdhbWVcIik7XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gR0FNRUJPQVJEU1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBzZWxlY3RTaGlwc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtc2VsZWN0LXNoaXBzXCIpO1xuXG4gIHN0YXRpYyBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuXG4gIHN0YXRpYyB5b3VyQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi55b3VyYm9hcmQtZ3JpZFwiKTtcblxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBEUkFXIFRIRSBHQU1FQk9BUkRTXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIGRyYXdHYW1lYm9hcmRzKCkge1xuICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuXG4gICAgICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbiAgICAgICAgLy8gc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICBjb25zdCBzaW5nbGVDZWxsMiA9IHNpbmdsZUNlbGwuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBVSS5haUJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbiAgICAgICAgVUkueW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsMik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKSB7XG4gICAgVUkuc2VsZWN0U2hpcHNHcmlkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG5cbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uLnRvU3RyaW5nKCk7XG4gICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG4gICAgICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRDZWxsKTtcblxuICAgICAgICBjb25zdCBpc1NoaXBQbGFjZWQgPSBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmdyaWQuc29tZShcbiAgICAgICAgICAoY2VsbCkgPT4gY2VsbFswXSA9PT0gcm93ICYmIGNlbGxbMV0gPT09IGNvbHVtbiAmJiBjZWxsWzJdXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgICBnYW1lYm9hcmRDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyU2hpcE5hbWVUb1BsYWNlKCkge1xuICAgIGlmIChVSS4jcGxhY2VkU2hpcHNDb3VudGVyIDwgVUkuI3NoaXBzVG9QbGFjZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbGVuZ3RoIH0gPSBVSS4jc2hpcHNUb1BsYWNlW1VJLiNwbGFjZWRTaGlwc0NvdW50ZXJdO1xuICAgICAgVUkuc2hpcEluZm9QYXJhLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHtuYW1lfSwgbGVuZ3RoICR7bGVuZ3RofWA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2soKSB7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IFVJLiNzaGlwc1RvUGxhY2VbVUkuI3BsYWNlZFNoaXBzQ291bnRlcl0ubGVuZ3RoO1xuICAgIGNvbnN0IHJvdyA9ICtVSS5pbnB1dFJvdy52YWx1ZTtcbiAgICBjb25zdCBjb2x1bW4gPSArVUkuaW5wdXRDb2x1bW4udmFsdWU7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBVSS5ob3Jpem9udGFsUmFkaW8uY2hlY2tlZCA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuXG4gICAgaWYgKCFVSS5pbnB1dFJvdy5jaGVja1ZhbGlkaXR5KCkgfHwgIVVJLmlucHV0Q29sdW1uLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC50ZXh0Q29udGVudCA9IFwiSW52YWxpZCBJbnB1dFwiO1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC5jbGFzc0xpc3QuYWRkKFwiZXJyb3ItcGxhY2luZy12aXNpYmxlXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pO1xuICAgICAgVUkuI3BsYWNlZFNoaXBzQ291bnRlciArPSAxO1xuICAgICAgVUkucmVuZGVyQWRkU2hpcEdhbWVib2FyZCgpO1xuICAgICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBlcnJvcjtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICB9XG5cbiAgICBpZiAoVUkuI3BsYWNlZFNoaXBzQ291bnRlciA9PT0gVUkuI3NoaXBzVG9QbGFjZS5sZW5ndGgpIHtcbiAgICAgIFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLnRleHRDb250ZW50ID0gXCJTdGFydCBnYW1lXCI7XG4gICAgICBVSS5zaGlwSW5mb1BhcmEudGV4dENvbnRlbnQgPSBcIkFsbCBzaGlwcyBzZXQhIFJlYWR5IHRvIHJvbGwhXCI7XG4gICAgfVxuICB9XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gTUFJTiBHQU1FIEFORCBCT0FSRFNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgcmVuZGVyUGxheWVyQm9hcmQoKSB7XG4gICAgVUkueW91ckJvYXJkR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQucm93ID0gcm93LnRvU3RyaW5nKCk7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW4udG9TdHJpbmcoKTtcbiAgICAgICAgLy8gZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcbiAgICAgICAgVUkueW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRDZWxsKTtcblxuICAgICAgICBjb25zdCBpc1NoaXBQbGFjZWQgPSBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmdyaWQuc29tZShcbiAgICAgICAgICAoY2VsbCkgPT4gY2VsbFswXSA9PT0gcm93ICYmIGNlbGxbMV0gPT09IGNvbHVtbiAmJiBjZWxsWzJdXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgICBnYW1lYm9hcmRDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzBdID09PSByb3cgJiZcbiAgICAgICAgICAgIEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsxXSA9PT0gY29sdW1uXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzJdID09PSBcIitcIikge1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsyXSA9PT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyQ29tcHV0ZXJCb2FyZCgpIHtcbiAgICBVSS5haUJvYXJkR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQucm93ID0gcm93LnRvU3RyaW5nKCk7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW4udG9TdHJpbmcoKTtcbiAgICAgICAgLy8gZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcbiAgICAgICAgVUkuYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgLy8gY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmdyaWQuc29tZShcbiAgICAgICAgLy8gICAoY2VsbCkgPT4gY2VsbFswXSA9PT0gcm93ICYmIGNlbGxbMV0gPT09IGNvbHVtbiAmJiBjZWxsWzJdXG4gICAgICAgIC8vICk7XG4gICAgICAgIC8vIGlmIChpc1NoaXBQbGFjZWQpIHtcbiAgICAgICAgLy8gICBnYW1lYm9hcmRDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgIC8vICAgLy8gZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrc1tpXVswXSA9PT0gcm93ICYmXG4gICAgICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsxXSA9PT0gY29sdW1uXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMl0gPT09IFwiK1wiKSB7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsyXSA9PT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBBREQgRVZFTlQgTElTVEVORVJTXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xuICAgIFVJLm5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIEdhbWVsb29wLnBsYXllciA9IG51bGw7XG4gICAgICBHYW1lbG9vcC5jb21wdXRlciA9IG51bGw7XG5cbiAgICAgIEdhbWVsb29wLnBsYXllciA9IG5ldyBQbGF5ZXIoXCJLcmlzXCIpO1xuICAgICAgR2FtZWxvb3AuY29tcHV0ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgICAgIFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgPSAwO1xuICAgICAgVUkucmVuZGVyQWRkU2hpcEdhbWVib2FyZCgpO1xuICAgICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG4gICAgICBVSS5pbnB1dFJvdy52YWx1ZSA9IFwiXCI7XG4gICAgICBVSS5pbnB1dENvbHVtbi52YWx1ZSA9IFwiXCI7XG4gICAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9IFwiUGxhY2Ugc2hpcFwiO1xuXG4gICAgICBVSS5wbGFjZVNoaXBzTW9kYWwuY2xhc3NMaXN0LmFkZChcInBsYWNlLXNoaXBzLW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5ob3dUb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgVUkuaG93VG9QbGF5TW9kYWwuY2xhc3NMaXN0LmFkZChcImhvdy10by1wbGF5LW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgVUkuaG93VG9QbGF5TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhvdy10by1wbGF5LW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9PT0gXCJTdGFydCBnYW1lXCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJPSyEgUmVhZHkgdG8gc3RhcnQhXCIpO1xuICAgICAgICBVSS5wbGFjZVNoaXBzTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlLXNoaXBzLW1vZGFsLXZpc2libGVcIik7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDUpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSg0KTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoMyk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDMpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSgyKTtcblxuICAgICAgICBVSS5yZW5kZXJQbGF5ZXJCb2FyZCgpO1xuICAgICAgICBVSS5yZW5kZXJDb21wdXRlckJvYXJkKCk7XG5cbiAgICAgICAgLy8gRE9ORTogc2V0IG1vZGFsIHRvIGRpc3BsYXk6IG5vbmVcbiAgICAgICAgLy8gRE9ORTogZ2VuZXJhdGUgdGhlIEFJIHNoaXBzXG4gICAgICAgIC8vIERPTkU6IHJlbmRlciB0aGUgcGxheWVyJ3Mgc2hpcHMgb24gbWFpbiBwYWdlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBVSS5oYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNoYWRvdyAqL1xuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5fZ2VuZXJhdGVHcmlkKCk7XG4gICAgdGhpcy5hdHRhY2tzID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgX2dlbmVyYXRlR3JpZCgpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbiArPSAxKSB7XG4gICAgICAgIGFyci5wdXNoKFtyb3csIGNvbHVtbiwgbnVsbF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIHBsYWNlbWVudCA9IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgaWYgKGxlbmd0aCA8IDEgfHwgbGVuZ3RoID4gMTApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2hpcCBsZW5ndGguXCIpO1xuICAgIH1cblxuICAgIGlmIChyb3cgPCAwIHx8IHJvdyA+IDkgfHwgY29sdW1uIDwgMCB8fCBjb2x1bW4gPiA5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0YXJ0aW5nIGNvb3JkaW5hdGVzLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGxldCBuZXdSb3cgPSByb3c7XG4gICAgICBsZXQgbmV3Q29sdW1uID0gY29sdW1uO1xuXG4gICAgICBpZiAocGxhY2VtZW50ID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBuZXdDb2x1bW4gKz0gaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1JvdyArPSBpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3Um93IDwgMCB8fCBuZXdSb3cgPiA5IHx8IG5ld0NvbHVtbiA8IDAgfHwgbmV3Q29sdW1uID4gOSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIHBsYWNlbWVudCBvdXQgb2YgYm91bmRzLlwiKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSB0aGlzLmdyaWRbal07XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGN1cnJlbnRDb29yZGluYXRlWzBdID09PSBuZXdSb3cgJiZcbiAgICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZVsxXSA9PT0gbmV3Q29sdW1uICYmXG4gICAgICAgICAgY3VycmVudENvb3JkaW5hdGVbMl0gIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCJTaGlwIGNvbGxpc2lvbiBkZXRlY3RlZC4gQ2Fubm90IHBsYWNlIHNoaXAgb24gdG9wIG9mIGFub3RoZXIgc2hpcC5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW25ld1JvdywgbmV3Q29sdW1uLCBudWxsXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb29yZGluYXRlID0gc2hpcENvb3JkaW5hdGVzW2tdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdyaWQuZmluZEluZGV4KFxuICAgICAgICAoZWxlbWVudCkgPT5cbiAgICAgICAgICBlbGVtZW50WzBdID09PSBjdXJyZW50Q29vcmRpbmF0ZVswXSAmJlxuICAgICAgICAgIGVsZW1lbnRbMV0gPT09IGN1cnJlbnRDb29yZGluYXRlWzFdXG4gICAgICApO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZ3JpZFtpbmRleF1bMl0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcEF1dG9tYXRpY2FsbHkobGVuZ3RoLCBtYXhSZXRyaWVzID0gNTAwMCkge1xuICAgIGNvbnN0IGdldFJhbmRvbUluZGV4ID0gKG1heCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcblxuICAgIGxldCByZXRyaWVzID0gMDtcbiAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoIXBsYWNlZCAmJiByZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgY29uc3Qgcm93ID0gZ2V0UmFuZG9tSW5kZXgoMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gZ2V0UmFuZG9tSW5kZXgoMTApO1xuICAgICAgY29uc3QgcGxhY2VtZW50ID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGBSb3cgZ2VuZXJhdGVkOiAke3Jvd31gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBDb2x1bW4gZ2VuZXJhdGVkOiAke2NvbHVtbn1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBQbGFjZW1lbnQgZ2VuZXJhdGVkOiAke3BsYWNlbWVudH1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBMZW5ndGg6ICR7bGVuZ3RofWApO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBwbGFjZW1lbnQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3MhIVwiKTtcbiAgICAgICAgcGxhY2VkID0gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIEludmFsaWQgcGxhY2VtZW50LCByZXRyeVxuICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3IgbXNnOiAke2Vycm9yfWApO1xuICAgICAgICByZXRyaWVzICs9IDE7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZXRyeWluZy4uLiAke3JldHJpZXN9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwbGFjZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBwbGFjZSBzaGlwIGFmdGVyIG1heGltdW0gcmV0cmllc1wiKTtcbiAgICB9XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgY29uc3QgW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uXSA9IFtyb3csIGNvbHVtbl07XG5cbiAgICBpZiAoXG4gICAgICB0YXJnZXRSb3cgPCAwIHx8XG4gICAgICB0YXJnZXRSb3cgPj0gMTAgfHxcbiAgICAgIHRhcmdldENvbHVtbiA8IDAgfHxcbiAgICAgIHRhcmdldENvbHVtbiA+PSAxMFxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3V0IG9mIGJvdW5kc1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkLmZpbmQoXG4gICAgICAoW3IsIGNvbF0pID0+IHIgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbHVtblxuICAgICk7XG5cbiAgICBpZiAoIWNlbGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgbm90IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuYXR0YWNrcy5maW5kKChbciwgY29sXSkgPT4gciA9PT0gdGFyZ2V0Um93ICYmIGNvbCA9PT0gdGFyZ2V0Q29sdW1uKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBhbHJlYWR5IGF0dGFja2VkXCIpO1xuICAgIH1cblxuICAgIGlmIChjZWxsWzJdKSB7XG4gICAgICBjZWxsWzJdLmhpdCgpO1xuICAgICAgdGhpcy5hdHRhY2tzLnB1c2goW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uLCBcIitcIl0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hdHRhY2tzLnB1c2goW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uLCBcIi1cIl0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFyZUFsbFNoaXBzU3VuaygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICghdGhpcy5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgVUkgZnJvbSBcIi4vZG9tXCI7XG5cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVsb29wIHtcbiAgc3RhdGljIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJLcmlzXCIpO1xuXG4gIHN0YXRpYyBjb21wdXRlciA9IG5ldyBQbGF5ZXIoKTtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBVSS5kcmF3R2FtZWJvYXJkcygpO1xuICAgIFVJLmV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRpbnVlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgc3RhdGljIHR1cm5zID0gW107XG5cbiAgY29uc3RydWN0b3IobmFtZSA9IFwiQ29tcHV0ZXJcIikge1xuICAgIHRoaXMubmFtZSA9IHRoaXMuX2NoZWNrUGxheWVyTmFtZShuYW1lKTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIF9jaGVja1BsYXllck5hbWUobmFtZSkge1xuICAgIGlmICghbmFtZS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5hbWUgY2Fubm90IGJlIGVtcHR5XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgfVxuXG4gIG1hbnVhbEF0dGFjayhvcHBvbmVudCwgcm93LCBjb2x1bW4pIHtcbiAgICBpZiAob3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pKSB7XG4gICAgICBQbGF5ZXIudHVybnMucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGF1dG9tYXRpY0F0dGFjayhvcHBvbmVudCkge1xuICAgIGxldCBhdHRhY2tTdWNjZXNzZnVsID0gZmFsc2U7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF0dGFja1N1Y2Nlc3NmdWwgPSBvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfSB3aGlsZSAoIWF0dGFja1N1Y2Nlc3NmdWwpO1xuXG4gICAgUGxheWVyLnR1cm5zLnB1c2godGhpcy5uYW1lKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGNvbnN0IHNlbGVjdFNoaXBzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1zZWxlY3Qtc2hpcHNcIik7XG5cbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG5cbi8vICAgICBzZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4vLyAgIH1cbi8vIH1cblxuLy8gY29uc3QgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcbi8vIGNvbnN0IHlvdXJCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnlvdXJib2FyZC1ncmlkXCIpO1xuXG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbi8vICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgIC8vICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG4gICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuICAgIC8vICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuXG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbDIgPSBzaW5nbGVDZWxsLmNsb25lTm9kZSh0cnVlKTtcbi8vICAgICBhaUJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbi8vICAgICB5b3VyQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwyKTtcbi8vICAgfVxuLy8gfVxuXG5pbXBvcnQgR2FtZWxvb3AgZnJvbSBcIi4vZ2FtZWxvb3BcIlxuXG5HYW1lbG9vcC5pbml0KCk7Il0sIm5hbWVzIjpbIkdhbWVsb29wIiwiUGxheWVyIiwiVUkiLCJuZXdHYW1lQnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaG93VG9CdG4iLCJob3dUb1BsYXlNb2RhbCIsImNsb3NlQnRuIiwicGxhY2VTaGlwc01vZGFsIiwic2hpcEluZm9QYXJhIiwiaW5wdXRSb3ciLCJpbnB1dENvbHVtbiIsImhvcml6b250YWxSYWRpbyIsInZlcnRpY2FsUmFkaW8iLCJwbGFjZVNoaXBPclN0YXJ0R2FtZUJ0biIsImVycm9yUGxhY2luZ1NoaXAiLCJwbGFjZWRTaGlwc0NvdW50ZXIiLCJzaGlwc1RvUGxhY2UiLCJuYW1lIiwibGVuZ3RoIiwicmVzdGFydEdhbWVCdG4iLCJzZWxlY3RTaGlwc0dyaWQiLCJhaUJvYXJkR3JpZCIsInlvdXJCb2FyZEdyaWQiLCJkcmF3R2FtZWJvYXJkcyIsImlubmVySFRNTCIsImkiLCJqIiwic2luZ2xlQ2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJkYXRhc2V0Iiwicm93IiwidG9TdHJpbmciLCJjb2x1bW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInNpbmdsZUNlbGwyIiwiY2xvbmVOb2RlIiwicmVuZGVyQWRkU2hpcEdhbWVib2FyZCIsInJlbmRlclNoaXBOYW1lVG9QbGFjZSIsImdhbWVib2FyZENlbGwiLCJpc1NoaXBQbGFjZWQiLCJwbGF5ZXIiLCJnYW1lYm9hcmQiLCJncmlkIiwic29tZSIsImNlbGwiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2siLCJzaGlwTGVuZ3RoIiwidmFsdWUiLCJvcmllbnRhdGlvbiIsImNoZWNrZWQiLCJjaGVja1ZhbGlkaXR5IiwicGxhY2VTaGlwIiwicmVtb3ZlIiwiZXJyb3IiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsImF0dGFja3MiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwiY29tcHV0ZXIiLCJldmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwicGxhY2VTaGlwQXV0b21hdGljYWxseSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsIl9nZW5lcmF0ZUdyaWQiLCJzaGlwcyIsImFyciIsInB1c2giLCJwbGFjZW1lbnQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJFcnJvciIsInNoaXBDb29yZGluYXRlcyIsIm5ld1JvdyIsIm5ld0NvbHVtbiIsImN1cnJlbnRDb29yZGluYXRlIiwic2hpcCIsImsiLCJpbmRleCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJtYXhSZXRyaWVzIiwiZ2V0UmFuZG9tSW5kZXgiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyZXRyaWVzIiwicGxhY2VkIiwicmVjZWl2ZUF0dGFjayIsInRhcmdldFJvdyIsInRhcmdldENvbHVtbiIsImZpbmQiLCJfcmVmIiwiciIsImNvbCIsIl9yZWYyIiwiaGl0IiwiYXJlQWxsU2hpcHNTdW5rIiwiaXNTdW5rIiwiaW5pdCIsInR1cm5zIiwiX2NoZWNrUGxheWVyTmFtZSIsInJlcGxhY2UiLCJtYW51YWxBdHRhY2siLCJvcHBvbmVudCIsImF1dG9tYXRpY0F0dGFjayIsImF0dGFja1N1Y2Nlc3NmdWwiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==
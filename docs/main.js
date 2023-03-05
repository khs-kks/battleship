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
      let aiBoard = [...document.querySelectorAll(".aiboard-grid div")];
      let playerBoard = [...document.querySelectorAll(".yourboard-grid div")];
      for (let i = 0; i < aiBoard.length; i += 1) {
        if (aiBoard[i].classList.length === 0) {
          // Get the value of the data-row attribute as a number
          let row = Number(aiBoard[i].dataset.row);

          // Get the value of the data-column attribute as a number
          let column = Number(aiBoard[i].dataset.column);
          aiBoard[i].addEventListener("click", () => {
            _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.manualAttack(_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer, row, column);
            _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].computer.automaticAttack(_gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player);
            UI.renderComputerBoard();
            UI.renderPlayerBoard();
            UI.gameStarted();
            //TODO keep the game until there is a winner somehow
          });
        }
      }
    } else {
      //Show the winner modal
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDO0VBQ3hCRSxXQUFXQSxDQUFDdEQsTUFBTSxFQUFFO0lBQ2xCLElBQUksQ0FBQ0EsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ2tHLElBQUksR0FBRyxDQUFDO0VBQ2Y7RUFFQVQsR0FBR0EsQ0FBQSxFQUFHO0lBQ0osSUFBSSxJQUFJLENBQUNTLElBQUksR0FBRyxJQUFJLENBQUNsRyxNQUFNLEVBQUUsSUFBSSxDQUFDa0csSUFBSSxJQUFJLENBQUM7RUFDN0M7RUFFQVAsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsT0FBTyxJQUFJLENBQUNPLElBQUksSUFBSSxJQUFJLENBQUNsRyxNQUFNO0VBQ2pDO0FBQ0Y7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDO0FBRWpDcEIsc0RBQWEsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVsb29wIGZyb20gXCIuL2dhbWVsb29wXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIHN0YXRpYyBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5uZXctZ2FtZVwiKTtcblxuICBzdGF0aWMgaG93VG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmhvdy10b1wiKTtcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEhPVy1UTy1QTEFZIE1PREFMXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBob3dUb1BsYXlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG93LXRvLXBsYXktbW9kYWxcIik7XG5cbiAgc3RhdGljIGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW4uY2xvc2UtYnV0dG9uXCIpO1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAvLyBQTEFDRSBTSElQUyBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBwbGFjZVNoaXBzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuXG4gIHN0YXRpYyBzaGlwSW5mb1BhcmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tc2hpcC1uYW1lLWxlbmd0aFwiKTtcblxuICBzdGF0aWMgaW5wdXRSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvd1wiKTtcblxuICBzdGF0aWMgaW5wdXRDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbHVtblwiKTtcblxuICBzdGF0aWMgaG9yaXpvbnRhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3Jpem9udGFsXCIpO1xuXG4gIHN0YXRpYyB2ZXJ0aWNhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2ZXJ0aWNhbFwiKTtcblxuICBzdGF0aWMgcGxhY2VTaGlwT3JTdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXAtYnV0dG9uXCIpO1xuXG4gIHN0YXRpYyBlcnJvclBsYWNpbmdTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvci1wbGFjaW5nXCIpO1xuXG4gIHN0YXRpYyAjcGxhY2VkU2hpcHNDb3VudGVyID0gMDtcblxuICBzdGF0aWMgI3NoaXBzVG9QbGFjZSA9IFtcbiAgICB7IG5hbWU6IFwiQ2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IG5hbWU6IFwiQ3J1aXNlclwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiwgbGVuZ3RoOiAyIH0sXG4gIF07XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gV0lOTkVSIEFOTk9VTkNFTUVOVCBNT0RBTFxuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24ucmVzdGFydC1nYW1lXCIpO1xuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIEdBTUVCT0FSRFNcbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBzdGF0aWMgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuICBzdGF0aWMgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcblxuICBzdGF0aWMgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gRFJBVyBUSEUgR0FNRUJPQVJEU1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIC8vIHN0YXRpYyBkcmF3R2FtZWJvYXJkcygpIHtcbiAgLy8gICBVSS5zZWxlY3RTaGlwc0dyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAvLyAgICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuICAvLyAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuXG4gIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgLy8gICAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIC8vICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4gIC8vICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4gIC8vICAgICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4gIC8vICAgICAgIC8vIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgLy8gICAgICAgY29uc3Qgc2luZ2xlQ2VsbDIgPSBzaW5nbGVDZWxsLmNsb25lTm9kZSh0cnVlKTtcbiAgLy8gICAgICAgVUkuYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4gIC8vICAgICAgIFVJLnlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbDIpO1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIHN0YXRpYyByZW5kZXJBZGRTaGlwR2FtZWJvYXJkKCkge1xuICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5yb3cgPSByb3cudG9TdHJpbmcoKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbi50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuICAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlclNoaXBOYW1lVG9QbGFjZSgpIHtcbiAgICBpZiAoVUkuI3BsYWNlZFNoaXBzQ291bnRlciA8IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGxlbmd0aCB9ID0gVUkuI3NoaXBzVG9QbGFjZVtVSS4jcGxhY2VkU2hpcHNDb3VudGVyXTtcbiAgICAgIFVJLnNoaXBJbmZvUGFyYS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7bmFtZX0sIGxlbmd0aCAke2xlbmd0aH1gO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrKCkge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS4jc2hpcHNUb1BsYWNlW1VJLiNwbGFjZWRTaGlwc0NvdW50ZXJdLmxlbmd0aDtcbiAgICBjb25zdCByb3cgPSArVUkuaW5wdXRSb3cudmFsdWU7XG4gICAgY29uc3QgY29sdW1uID0gK1VJLmlucHV0Q29sdW1uLnZhbHVlO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gVUkuaG9yaXpvbnRhbFJhZGlvLmNoZWNrZWQgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgIGlmICghVUkuaW5wdXRSb3cuY2hlY2tWYWxpZGl0eSgpIHx8ICFVSS5pbnB1dENvbHVtbi5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBcIkludmFsaWQgSW5wdXRcIjtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcbiAgICAgIFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgKz0gMTtcbiAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItcGxhY2luZy12aXNpYmxlXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLnRleHRDb250ZW50ID0gZXJyb3I7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgfVxuXG4gICAgaWYgKFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgPT09IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xuICAgICAgVUkuc2hpcEluZm9QYXJhLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgc2V0ISBSZWFkeSB0byByb2xsIVwiO1xuICAgIH1cbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIE1BSU4gR0FNRSBBTkQgQk9BUkRTXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgc3RhdGljIHJlbmRlclBsYXllckJvYXJkKCkge1xuICAgIFVJLnlvdXJCb2FyZEdyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG4gICAgICAgIFVJLnlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVswXSA9PT0gcm93ICYmXG4gICAgICAgICAgICBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMV0gPT09IGNvbHVtblxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsyXSA9PT0gXCIrXCIpIHtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMl0gPT09IFwiLVwiKSB7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlckNvbXB1dGVyQm9hcmQoKSB7XG4gICAgVUkuYWlCb2FyZEdyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4gKz0gMSkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG4gICAgICAgIFVJLmFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKGdhbWVib2FyZENlbGwpO1xuXG4gICAgICAgIC8vIGNvbnN0IGlzU2hpcFBsYWNlZCA9IEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgIC8vICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICAvLyApO1xuICAgICAgICAvLyBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgIC8vICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAvLyAgIC8vIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICBpIDwgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3MubGVuZ3RoO1xuICAgICAgICAgIGkgKz0gMVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrc1tpXVswXSA9PT0gcm93ICYmXG4gICAgICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQuYXR0YWNrc1tpXVsxXSA9PT0gY29sdW1uXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLmF0dGFja3NbaV1bMl0gPT09IFwiK1wiKSB7XG4gICAgICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJhbHJlYWR5LWNsaWNrZWRcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hdHRhY2tzW2ldWzJdID09PSBcIi1cIikge1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJhbHJlYWR5LWNsaWNrZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgLy8gQUREIEVWRU5UIExJU1RFTkVSU1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBldmVudExpc3RlbmVycygpIHtcbiAgICBVSS5uZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBHYW1lbG9vcC5wbGF5ZXIgPSBudWxsO1xuICAgICAgR2FtZWxvb3AuY29tcHV0ZXIgPSBudWxsO1xuXG4gICAgICBHYW1lbG9vcC5wbGF5ZXIgPSBuZXcgUGxheWVyKFwiS3Jpc1wiKTtcbiAgICAgIEdhbWVsb29wLmNvbXB1dGVyID0gbmV3IFBsYXllcigpO1xuXG4gICAgICBVSS4jcGxhY2VkU2hpcHNDb3VudGVyID0gMDtcbiAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgICAgVUkuaW5wdXRSb3cudmFsdWUgPSBcIlwiO1xuICAgICAgVUkuaW5wdXRDb2x1bW4udmFsdWUgPSBcIlwiO1xuICAgICAgVUkucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4udGV4dENvbnRlbnQgPSBcIlBsYWNlIHNoaXBcIjtcblxuICAgICAgVUkucGxhY2VTaGlwc01vZGFsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZS1zaGlwcy1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgVUkuaG93VG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFVJLmhvd1RvUGxheU1vZGFsLmNsYXNzTGlzdC5hZGQoXCJob3ctdG8tcGxheS1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgVUkuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFVJLmhvd1RvUGxheU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ctdG8tcGxheS1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgVUkucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoVUkucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4udGV4dENvbnRlbnQgPT09IFwiU3RhcnQgZ2FtZVwiKSB7XG4gICAgICAgIFVJLnBsYWNlU2hpcHNNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2Utc2hpcHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoNSk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDQpO1xuICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwQXV0b21hdGljYWxseSgzKTtcbiAgICAgICAgR2FtZWxvb3AuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcEF1dG9tYXRpY2FsbHkoMyk7XG4gICAgICAgIEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBBdXRvbWF0aWNhbGx5KDIpO1xuXG4gICAgICAgIFVJLnJlbmRlclBsYXllckJvYXJkKCk7XG4gICAgICAgIFVJLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcbiAgICAgICAgVUkuZ2FtZVN0YXJ0ZWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVJLmhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gIC8vIE1BSU4gR0FNRSBMT0dJQ1xuICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIHN0YXRpYyBnYW1lU3RhcnRlZCgpIHtcblxuICAgIEdhbWVsb29wLmNoZWNrV2lubmVyKCk7XG5cbiAgICBpZiAoIUdhbWVsb29wLndpbm5lcikge1xuICAgICAgVUkucmVuZGVyUGxheWVyQm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcblxuICAgICAgbGV0IGFpQm9hcmQgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5haWJvYXJkLWdyaWQgZGl2XCIpXTtcbiAgICAgIGxldCBwbGF5ZXJCb2FyZCA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnlvdXJib2FyZC1ncmlkIGRpdlwiKV07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWlCb2FyZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoYWlCb2FyZFtpXS5jbGFzc0xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgLy8gR2V0IHRoZSB2YWx1ZSBvZiB0aGUgZGF0YS1yb3cgYXR0cmlidXRlIGFzIGEgbnVtYmVyXG4gICAgICAgICAgbGV0IHJvdyA9IE51bWJlcihhaUJvYXJkW2ldLmRhdGFzZXQucm93KTtcblxuICAgICAgICAgIC8vIEdldCB0aGUgdmFsdWUgb2YgdGhlIGRhdGEtY29sdW1uIGF0dHJpYnV0ZSBhcyBhIG51bWJlclxuICAgICAgICAgIGxldCBjb2x1bW4gPSBOdW1iZXIoYWlCb2FyZFtpXS5kYXRhc2V0LmNvbHVtbik7XG5cbiAgICAgICAgICBhaUJvYXJkW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBHYW1lbG9vcC5wbGF5ZXIubWFudWFsQXR0YWNrKEdhbWVsb29wLmNvbXB1dGVyLCByb3csIGNvbHVtbik7XG4gICAgICAgICAgICBHYW1lbG9vcC5jb21wdXRlci5hdXRvbWF0aWNBdHRhY2soR2FtZWxvb3AucGxheWVyKTtcblxuICAgICAgICAgICAgVUkucmVuZGVyQ29tcHV0ZXJCb2FyZCgpO1xuICAgICAgICAgICAgVUkucmVuZGVyUGxheWVyQm9hcmQoKTtcblxuICAgICAgICAgICAgVUkuZ2FtZVN0YXJ0ZWQoKTtcbiAgICAgICAgICAgIC8vVE9ETyBrZWVwIHRoZSBnYW1lIHVudGlsIHRoZXJlIGlzIGEgd2lubmVyIHNvbWVob3dcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL1Nob3cgdGhlIHdpbm5lciBtb2RhbFxuICAgIH1cbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2hhZG93ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLl9nZW5lcmF0ZUdyaWQoKTtcbiAgICB0aGlzLmF0dGFja3MgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBfZ2VuZXJhdGVHcmlkKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgYXJyLnB1c2goW3JvdywgY29sdW1uLCBudWxsXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgcGxhY2VtZW50ID0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBpZiAobGVuZ3RoIDwgMSB8fCBsZW5ndGggPiAxMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaGlwIGxlbmd0aC5cIik7XG4gICAgfVxuXG4gICAgaWYgKHJvdyA8IDAgfHwgcm93ID4gOSB8fCBjb2x1bW4gPCAwIHx8IGNvbHVtbiA+IDkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RhcnRpbmcgY29vcmRpbmF0ZXMuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IG5ld1JvdyA9IHJvdztcbiAgICAgIGxldCBuZXdDb2x1bW4gPSBjb2x1bW47XG5cbiAgICAgIGlmIChwbGFjZW1lbnQgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIG5ld0NvbHVtbiArPSBpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Um93ICs9IGk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdSb3cgPCAwIHx8IG5ld1JvdyA+IDkgfHwgbmV3Q29sdW1uIDwgMCB8fCBuZXdDb2x1bW4gPiA5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgcGxhY2VtZW50IG91dCBvZiBib3VuZHMuXCIpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IHRoaXMuZ3JpZFtqXTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgY3VycmVudENvb3JkaW5hdGVbMF0gPT09IG5ld1JvdyAmJlxuICAgICAgICAgIGN1cnJlbnRDb29yZGluYXRlWzFdID09PSBuZXdDb2x1bW4gJiZcbiAgICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZVsyXSAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIlNoaXAgY29sbGlzaW9uIGRldGVjdGVkLiBDYW5ub3QgcGxhY2Ugc2hpcCBvbiB0b3Agb2YgYW5vdGhlciBzaGlwLlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbbmV3Um93LCBuZXdDb2x1bW4sIG51bGxdKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG5cbiAgICBmb3IgKGxldCBrID0gMDsgayA8IHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSBzaGlwQ29vcmRpbmF0ZXNba107XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ3JpZC5maW5kSW5kZXgoXG4gICAgICAgIChlbGVtZW50KSA9PlxuICAgICAgICAgIGVsZW1lbnRbMF0gPT09IGN1cnJlbnRDb29yZGluYXRlWzBdICYmXG4gICAgICAgICAgZWxlbWVudFsxXSA9PT0gY3VycmVudENvb3JkaW5hdGVbMV1cbiAgICAgICk7XG5cbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5ncmlkW2luZGV4XVsyXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwQXV0b21hdGljYWxseShsZW5ndGgsIG1heFJldHJpZXMgPSA1MDAwKSB7XG4gICAgY29uc3QgZ2V0UmFuZG9tSW5kZXggPSAobWF4KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuXG4gICAgbGV0IHJldHJpZXMgPSAwO1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlICghcGxhY2VkICYmIHJldHJpZXMgPCBtYXhSZXRyaWVzKSB7XG4gICAgICBjb25zdCByb3cgPSBnZXRSYW5kb21JbmRleCgxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBnZXRSYW5kb21JbmRleCgxMCk7XG4gICAgICBjb25zdCBwbGFjZW1lbnQgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIHBsYWNlbWVudCk7XG4gICAgICAgIHBsYWNlZCA9IHRydWU7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBJbnZhbGlkIHBsYWNlbWVudCwgcmV0cnlcbiAgICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcGxhY2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcGxhY2Ugc2hpcCBhZnRlciBtYXhpbXVtIHJldHJpZXNcIik7XG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGNvbnN0IFt0YXJnZXRSb3csIHRhcmdldENvbHVtbl0gPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0Um93IDwgMCB8fFxuICAgICAgdGFyZ2V0Um93ID49IDEwIHx8XG4gICAgICB0YXJnZXRDb2x1bW4gPCAwIHx8XG4gICAgICB0YXJnZXRDb2x1bW4gPj0gMTBcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk91dCBvZiBib3VuZHNcIik7XG4gICAgfVxuXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZC5maW5kKFxuICAgICAgKFtyLCBjb2xdKSA9PiByID09PSB0YXJnZXRSb3cgJiYgY29sID09PSB0YXJnZXRDb2x1bW5cbiAgICApO1xuXG4gICAgaWYgKCFjZWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIG5vdCBmb3VuZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmF0dGFja3MuZmluZCgoW3IsIGNvbF0pID0+IHIgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbHVtbilcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgYWxyZWFkeSBhdHRhY2tlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoY2VsbFsyXSkge1xuICAgICAgY2VsbFsyXS5oaXQoKTtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFt0YXJnZXRSb3csIHRhcmdldENvbHVtbiwgXCIrXCJdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYXR0YWNrcy5wdXNoKFt0YXJnZXRSb3csIHRhcmdldENvbHVtbiwgXCItXCJdKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhcmVBbGxTaGlwc1N1bmsoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoIXRoaXMuc2hpcHNbaV0uaXNTdW5rKCkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IFVJIGZyb20gXCIuL2RvbVwiO1xuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lbG9vcCB7XG4gIHN0YXRpYyBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiS3Jpc1wiKTtcblxuICBzdGF0aWMgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgc3RhdGljIHdpbm5lciA9IG51bGw7XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgLy8gVUkuZHJhd0dhbWVib2FyZHMoKTtcbiAgICBVSS5ldmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgc3RhdGljIGNoZWNrV2lubmVyKCkge1xuICAgIGlmIChHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBHYW1lbG9vcC53aW5uZXIgPSBHYW1lbG9vcC5jb21wdXRlcjtcbiAgICB9IGVsc2UgaWYgKEdhbWVsb29wLmNvbXB1dGVyLmdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgR2FtZWxvb3Aud2lubmVyID0gR2FtZWxvb3AucGxheWVyO1xuICAgIH1cbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29udGludWUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBzdGF0aWMgdHVybnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihuYW1lID0gXCJDb21wdXRlclwiKSB7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5fY2hlY2tQbGF5ZXJOYW1lKG5hbWUpO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgX2NoZWNrUGxheWVyTmFtZShuYW1lKSB7XG4gICAgaWYgKCFuYW1lLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmFtZSBjYW5ub3QgYmUgZW1wdHlcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICB9XG5cbiAgbWFudWFsQXR0YWNrKG9wcG9uZW50LCByb3csIGNvbHVtbikge1xuICAgIGlmIChvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikpIHtcbiAgICAgIFBsYXllci50dXJucy5wdXNoKHRoaXMubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXV0b21hdGljQXR0YWNrKG9wcG9uZW50KSB7XG4gICAgY29uc3QgYXR0YWNrc0luaXRpYWxMZW5ndGggPSBvcHBvbmVudC5nYW1lYm9hcmQuYXR0YWNrcy5sZW5ndGg7XG4gICBcbiAgICB3aGlsZSAoYXR0YWNrc0luaXRpYWxMZW5ndGggPT09IG9wcG9uZW50LmdhbWVib2FyZC5hdHRhY2tzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICB0cnkge1xuICAgICAgICBvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuICAgIFBsYXllci50dXJucy5wdXNoKHRoaXMubmFtZSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBjb25zdCBzZWxlY3RTaGlwc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtc2VsZWN0LXNoaXBzXCIpO1xuXG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbi8vICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbi8vICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuXG4vLyAgICAgc2VsZWN0U2hpcHNHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuLy8gICB9XG4vLyB9XG5cbi8vIGNvbnN0IGFpQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haWJvYXJkLWdyaWRcIik7XG4vLyBjb25zdCB5b3VyQm9hcmRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi55b3VyYm9hcmQtZ3JpZFwiKTtcblxuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4vLyAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJteXNoaXBzXCIpO1xuLy8gICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAvLyAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuICAgIC8vICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcbiAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcblxuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwyID0gc2luZ2xlQ2VsbC5jbG9uZU5vZGUodHJ1ZSk7XG4vLyAgICAgYWlCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4vLyAgICAgeW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsMik7XG4vLyAgIH1cbi8vIH1cblxuaW1wb3J0IEdhbWVsb29wIGZyb20gXCIuL2dhbWVsb29wXCJcblxuR2FtZWxvb3AuaW5pdCgpOyJdLCJuYW1lcyI6WyJHYW1lbG9vcCIsIlBsYXllciIsIlVJIiwibmV3R2FtZUJ0biIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhvd1RvQnRuIiwiaG93VG9QbGF5TW9kYWwiLCJjbG9zZUJ0biIsInBsYWNlU2hpcHNNb2RhbCIsInNoaXBJbmZvUGFyYSIsImlucHV0Um93IiwiaW5wdXRDb2x1bW4iLCJob3Jpem9udGFsUmFkaW8iLCJ2ZXJ0aWNhbFJhZGlvIiwicGxhY2VTaGlwT3JTdGFydEdhbWVCdG4iLCJlcnJvclBsYWNpbmdTaGlwIiwicGxhY2VkU2hpcHNDb3VudGVyIiwic2hpcHNUb1BsYWNlIiwibmFtZSIsImxlbmd0aCIsInJlc3RhcnRHYW1lQnRuIiwic2VsZWN0U2hpcHNHcmlkIiwiYWlCb2FyZEdyaWQiLCJ5b3VyQm9hcmRHcmlkIiwicmVuZGVyQWRkU2hpcEdhbWVib2FyZCIsImlubmVySFRNTCIsInJlbmRlclNoaXBOYW1lVG9QbGFjZSIsInJvdyIsImNvbHVtbiIsImdhbWVib2FyZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiZGF0YXNldCIsInRvU3RyaW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJpc1NoaXBQbGFjZWQiLCJwbGF5ZXIiLCJnYW1lYm9hcmQiLCJncmlkIiwic29tZSIsImNlbGwiLCJ0ZXh0Q29udGVudCIsImhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2siLCJzaGlwTGVuZ3RoIiwidmFsdWUiLCJvcmllbnRhdGlvbiIsImNoZWNrZWQiLCJjaGVja1ZhbGlkaXR5IiwicGxhY2VTaGlwIiwicmVtb3ZlIiwiZXJyb3IiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsImkiLCJhdHRhY2tzIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImNvbXB1dGVyIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwicGxhY2VTaGlwQXV0b21hdGljYWxseSIsImdhbWVTdGFydGVkIiwiY2hlY2tXaW5uZXIiLCJ3aW5uZXIiLCJhaUJvYXJkIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllckJvYXJkIiwiTnVtYmVyIiwibWFudWFsQXR0YWNrIiwiYXV0b21hdGljQXR0YWNrIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwiX2dlbmVyYXRlR3JpZCIsInNoaXBzIiwiYXJyIiwicHVzaCIsInBsYWNlbWVudCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIkVycm9yIiwic2hpcENvb3JkaW5hdGVzIiwibmV3Um93IiwibmV3Q29sdW1uIiwiaiIsImN1cnJlbnRDb29yZGluYXRlIiwic2hpcCIsImsiLCJpbmRleCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJtYXhSZXRyaWVzIiwiZ2V0UmFuZG9tSW5kZXgiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyZXRyaWVzIiwicGxhY2VkIiwicmVjZWl2ZUF0dGFjayIsInRhcmdldFJvdyIsInRhcmdldENvbHVtbiIsImZpbmQiLCJfcmVmIiwiciIsImNvbCIsIl9yZWYyIiwiaGl0IiwiYXJlQWxsU2hpcHNTdW5rIiwiaXNTdW5rIiwiaW5pdCIsInR1cm5zIiwiX2NoZWNrUGxheWVyTmFtZSIsInJlcGxhY2UiLCJvcHBvbmVudCIsImF0dGFja3NJbml0aWFsTGVuZ3RoIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=
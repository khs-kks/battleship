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

class UI {
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
  // static placedShipsCounter = 0;
  // static shipsToPlace = [
  //   ["Carrier", 5],
  //   ["Battleship", 4],
  //   ["Cruiser", 3],
  //   ["Submarine", 3],
  //   ["Destroyer", 2],
  // ];

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

  // static renderAddShipGameboard() {
  //   UI.selectShipsGrid.innerHTML = "";
  //   UI.renderShipNameToPlace();

  //   for (let i = 0; i < 10; i += 1) {
  //     for (let j = 0; j < 10; j += 1) {
  //       const singleCell = document.createElement("div");
  //       singleCell.dataset.row = i.toString();
  //       singleCell.dataset.column = j.toString();

  //       singleCell.classList.add("cell-relative");
  //       UI.selectShipsGrid.appendChild(singleCell);

  //       const gridElement = Gameloop.player.gameboard.grid.find(
  //         (el) => el[0] === i && el[1] === j
  //       );
  //       if (gridElement && gridElement[2]) {
  //         singleCell.textContent = "X";
  //         singleCell.classList.add("placed-ship");
  //       }
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

  // static renderShipNameToPlace() {
  //   if (UI.placedShipsCounter < 5) {
  //     const shipName = UI.shipsToPlace[UI.placedShipsCounter][0];
  //     const shipLength = UI.shipsToPlace[UI.placedShipsCounter][1];
  //     UI.shipInfoPara.textContent = `Place your ${shipName}, length ${shipLength}`;
  //   } else {
  // Change button to start game ane actually start it
  //     console.log("OPS");
  //   }
  // }

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
      // Change button to start game and actually start it
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

    // UI.placeShipOrStartGameBtn.addEventListener("click", (e) => {
    //   e.preventDefault();

    //   UI.renderShipNameToPlace();

    //   let placement = null;
    //   if (UI.horizontalRadio.checked) {
    //     placement = "horizontal";
    //   } else {
    //     placement = "vertical";
    //   }

    //   if (UI.inputRow.checkValidity() && UI.inputColumn.checkValidity()) {
    //     try {
    //       const shipLength = UI.shipsToPlace[UI.placedShipsCounter][1];
    //       Gameloop.player.gameboard.placeShip(
    //         shipLength,
    //         +UI.inputRow.value,
    //         +UI.inputColumn.value,
    //         placement
    //       );

    //       UI.renderAddShipGameboard();

    //       UI.placedShipsCounter += 1;
    //       UI.renderShipNameToPlace();
    //     } catch (error) {
    //       UI.errorPlacingShip.textContent = error;
    //       UI.errorPlacingShip.classList.add("error-placing-visible");
    //     }
    //   } else {
    //     console.log("Kurec x 2");
    //   }
    // });
    UI.placeShipOrStartGameBtn.addEventListener("click", e => {
      e.preventDefault();
      if (this.placeShipOrStartGameBtn.textContent === "Start game") {
        console.log("OK! Ready to start!");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7QUFDbkIsTUFBTUMsRUFBRSxDQUFDO0VBQ3RCLE9BQU9DLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7RUFDN0QsT0FBT0MsUUFBUSxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7O0VBRXpEO0VBQ0EsT0FBT0UsY0FBYyxHQUFHSCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUNwRSxPQUFPRyxRQUFRLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLG1CQUFtQixDQUFDOztFQUU3RDtFQUNBLE9BQU9JLGVBQWUsR0FBR0wsUUFBUSxDQUFDQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFDckUsT0FBT0ssWUFBWSxHQUFHTixRQUFRLENBQUNDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztFQUN0RSxPQUFPTSxRQUFRLEdBQUdQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztFQUNoRCxPQUFPTyxXQUFXLEdBQUdSLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQztFQUN0RCxPQUFPUSxlQUFlLEdBQUdULFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUM5RCxPQUFPUyxhQUFhLEdBQUdWLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUMxRCxPQUFPVSx1QkFBdUIsR0FBR1gsUUFBUSxDQUFDQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFDN0UsT0FBT1csZ0JBQWdCLEdBQUdaLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQ2xFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUEsT0FBTyxDQUFDWSxrQkFBa0IsR0FBRyxDQUFDO0VBQzlCLE9BQU8sQ0FBQ0MsWUFBWSxHQUFHLENBQ3JCO0lBQUVDLElBQUksRUFBRSxTQUFTO0lBQUVDLE1BQU0sRUFBRTtFQUFFLENBQUMsRUFDOUI7SUFBRUQsSUFBSSxFQUFFLFlBQVk7SUFBRUMsTUFBTSxFQUFFO0VBQUUsQ0FBQyxFQUNqQztJQUFFRCxJQUFJLEVBQUUsU0FBUztJQUFFQyxNQUFNLEVBQUU7RUFBRSxDQUFDLEVBQzlCO0lBQUVELElBQUksRUFBRSxXQUFXO0lBQUVDLE1BQU0sRUFBRTtFQUFFLENBQUMsRUFDaEM7SUFBRUQsSUFBSSxFQUFFLFdBQVc7SUFBRUMsTUFBTSxFQUFFO0VBQUUsQ0FBQyxDQUNqQzs7RUFFRDtFQUNBLE9BQU9DLGNBQWMsR0FBR2pCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHFCQUFxQixDQUFDOztFQUVyRTtFQUNBLE9BQU9pQixlQUFlLEdBQUdsQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUNyRSxPQUFPa0IsV0FBVyxHQUFHbkIsUUFBUSxDQUFDQyxhQUFhLENBQUMsZUFBZSxDQUFDO0VBQzVELE9BQU9tQixhQUFhLEdBQUdwQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQzs7RUFFaEU7RUFDQSxPQUFPb0IsY0FBY0EsQ0FBQSxFQUFHO0lBQ3RCdkIsRUFBRSxDQUFDb0IsZUFBZSxDQUFDSSxTQUFTLEdBQUcsRUFBRTtJQUNqQyxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDOUIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzlCLE1BQU1DLFVBQVUsR0FBR3pCLFFBQVEsQ0FBQzBCLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDaERELFVBQVUsQ0FBQ0UsT0FBTyxDQUFDQyxHQUFHLEdBQUdMLENBQUMsQ0FBQ00sUUFBUSxFQUFFO1FBQ3JDSixVQUFVLENBQUNFLE9BQU8sQ0FBQ0csTUFBTSxHQUFHTixDQUFDLENBQUNLLFFBQVEsRUFBRTtRQUN4QztRQUNBO1FBQ0FKLFVBQVUsQ0FBQ00sU0FBUyxDQUFDQyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBRXpDbEMsRUFBRSxDQUFDb0IsZUFBZSxDQUFDZSxXQUFXLENBQUNSLFVBQVUsQ0FBQztNQUM1QztJQUNGO0lBRUEsS0FBSyxJQUFJRixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQzlCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM5QixNQUFNQyxVQUFVLEdBQUd6QixRQUFRLENBQUMwQixhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2hERCxVQUFVLENBQUNFLE9BQU8sQ0FBQ0MsR0FBRyxHQUFHTCxDQUFDLENBQUNNLFFBQVEsRUFBRTtRQUNyQ0osVUFBVSxDQUFDRSxPQUFPLENBQUNHLE1BQU0sR0FBR04sQ0FBQyxDQUFDSyxRQUFRLEVBQUU7UUFDeENKLFVBQVUsQ0FBQ00sU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ25DO1FBQ0EsTUFBTUUsV0FBVyxHQUFHVCxVQUFVLENBQUNVLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDOUNyQyxFQUFFLENBQUNxQixXQUFXLENBQUNjLFdBQVcsQ0FBQ1IsVUFBVSxDQUFDO1FBQ3RDM0IsRUFBRSxDQUFDc0IsYUFBYSxDQUFDYSxXQUFXLENBQUNDLFdBQVcsQ0FBQztNQUMzQztJQUNGO0VBQ0Y7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQSxPQUFPRSxzQkFBc0JBLENBQUEsRUFBRztJQUM5QnRDLEVBQUUsQ0FBQ29CLGVBQWUsQ0FBQ0ksU0FBUyxHQUFHLEVBQUU7SUFDakN4QixFQUFFLENBQUN1QyxxQkFBcUIsRUFBRTtJQUUxQixLQUFLLElBQUlULEdBQUcsR0FBRyxDQUFDLEVBQUVBLEdBQUcsR0FBRyxFQUFFLEVBQUVBLEdBQUcsSUFBSSxDQUFDLEVBQUU7TUFDcEMsS0FBSyxJQUFJRSxNQUFNLEdBQUcsQ0FBQyxFQUFFQSxNQUFNLEdBQUcsRUFBRSxFQUFFQSxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzdDLE1BQU1RLGFBQWEsR0FBR3RDLFFBQVEsQ0FBQzBCLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDbkRZLGFBQWEsQ0FBQ1gsT0FBTyxDQUFDQyxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0MsUUFBUSxFQUFFO1FBQzFDUyxhQUFhLENBQUNYLE9BQU8sQ0FBQ0csTUFBTSxHQUFHQSxNQUFNLENBQUNELFFBQVEsRUFBRTtRQUNoRFMsYUFBYSxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDNUNsQyxFQUFFLENBQUNvQixlQUFlLENBQUNlLFdBQVcsQ0FBQ0ssYUFBYSxDQUFDO1FBRTdDLE1BQU1DLFlBQVksR0FBRzFDLDRFQUFtQyxDQUNyRCtDLElBQUksSUFBS0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLaEIsR0FBRyxJQUFJZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLZCxNQUFNLElBQUljLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDM0Q7UUFDRCxJQUFJTCxZQUFZLEVBQUU7VUFDaEJELGFBQWEsQ0FBQ08sV0FBVyxHQUFHLEdBQUc7VUFDL0JQLGFBQWEsQ0FBQ1AsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzVDO01BQ0Y7SUFDRjtFQUNGOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBLE9BQU9LLHFCQUFxQkEsQ0FBQSxFQUFHO0lBQzdCLElBQUl2QyxFQUFFLENBQUMsQ0FBQ2Usa0JBQWtCLEdBQUdmLEVBQUUsQ0FBQyxDQUFDZ0IsWUFBWSxDQUFDRSxNQUFNLEVBQUU7TUFDcEQsTUFBTTtRQUFFRCxJQUFJO1FBQUVDO01BQU8sQ0FBQyxHQUFHbEIsRUFBRSxDQUFDLENBQUNnQixZQUFZLENBQUNoQixFQUFFLENBQUMsQ0FBQ2Usa0JBQWtCLENBQUM7TUFDakVmLEVBQUUsQ0FBQ1EsWUFBWSxDQUFDdUMsV0FBVyxHQUFJLGNBQWE5QixJQUFLLFlBQVdDLE1BQU8sRUFBQztJQUN0RTtFQUNGO0VBRUEsT0FBTzhCLCtCQUErQkEsQ0FBQSxFQUFHO0lBQ3ZDLE1BQU1DLFVBQVUsR0FBR2pELEVBQUUsQ0FBQyxDQUFDZ0IsWUFBWSxDQUFDaEIsRUFBRSxDQUFDLENBQUNlLGtCQUFrQixDQUFDLENBQUNHLE1BQU07SUFDbEUsTUFBTVksR0FBRyxHQUFHLENBQUM5QixFQUFFLENBQUNTLFFBQVEsQ0FBQ3lDLEtBQUs7SUFDOUIsTUFBTWxCLE1BQU0sR0FBRyxDQUFDaEMsRUFBRSxDQUFDVSxXQUFXLENBQUN3QyxLQUFLO0lBQ3BDLE1BQU1DLFdBQVcsR0FBR25ELEVBQUUsQ0FBQ1csZUFBZSxDQUFDeUMsT0FBTyxHQUFHLFlBQVksR0FBRyxVQUFVO0lBRTFFLElBQUksQ0FBQ3BELEVBQUUsQ0FBQ1MsUUFBUSxDQUFDNEMsYUFBYSxFQUFFLElBQUksQ0FBQ3JELEVBQUUsQ0FBQ1UsV0FBVyxDQUFDMkMsYUFBYSxFQUFFLEVBQUU7TUFDbkVyRCxFQUFFLENBQUNjLGdCQUFnQixDQUFDaUMsV0FBVyxHQUFHLGVBQWU7TUFDakQvQyxFQUFFLENBQUNjLGdCQUFnQixDQUFDbUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7TUFDMUQ7SUFDRjtJQUVBLElBQUk7TUFDRm5DLDRFQUFtQyxDQUFDa0QsVUFBVSxFQUFFbkIsR0FBRyxFQUFFRSxNQUFNLEVBQUVtQixXQUFXLENBQUM7TUFDekVuRCxFQUFFLENBQUMsQ0FBQ2Usa0JBQWtCLElBQUksQ0FBQztNQUMzQmYsRUFBRSxDQUFDc0Msc0JBQXNCLEVBQUU7TUFDM0J0QyxFQUFFLENBQUN1QyxxQkFBcUIsRUFBRTtNQUMxQnZDLEVBQUUsQ0FBQ2MsZ0JBQWdCLENBQUNtQixTQUFTLENBQUNzQixNQUFNLENBQUMsdUJBQXVCLENBQUM7SUFDL0QsQ0FBQyxDQUFDLE9BQU9DLEtBQUssRUFBRTtNQUNkeEQsRUFBRSxDQUFDYyxnQkFBZ0IsQ0FBQ2lDLFdBQVcsR0FBR1MsS0FBSztNQUN2Q3hELEVBQUUsQ0FBQ2MsZ0JBQWdCLENBQUNtQixTQUFTLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztJQUM1RDtJQUVBLElBQUlsQyxFQUFFLENBQUMsQ0FBQ2Usa0JBQWtCLEtBQUtmLEVBQUUsQ0FBQyxDQUFDZ0IsWUFBWSxDQUFDRSxNQUFNLEVBQUU7TUFDdERsQixFQUFFLENBQUNhLHVCQUF1QixDQUFDa0MsV0FBVyxHQUFHLFlBQVk7TUFDckQvQyxFQUFFLENBQUNRLFlBQVksQ0FBQ3VDLFdBQVcsR0FBRywrQkFBK0I7TUFDN0Q7SUFDRjtFQUNGOztFQUVBO0VBQ0EsT0FBT1UsY0FBY0EsQ0FBQSxFQUFHO0lBQ3RCekQsRUFBRSxDQUFDQyxVQUFVLENBQUN5RCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUM1QzFELEVBQUUsQ0FBQ08sZUFBZSxDQUFDMEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7TUFDN0RsQyxFQUFFLENBQUN1QyxxQkFBcUIsRUFBRTtJQUM1QixDQUFDLENBQUM7SUFFRnZDLEVBQUUsQ0FBQ0ksUUFBUSxDQUFDc0QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07TUFDMUMxRCxFQUFFLENBQUNLLGNBQWMsQ0FBQzRCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0lBQzlELENBQUMsQ0FBQztJQUVGbEMsRUFBRSxDQUFDTSxRQUFRLENBQUNvRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUMxQzFELEVBQUUsQ0FBQ0ssY0FBYyxDQUFDNEIsU0FBUyxDQUFDc0IsTUFBTSxDQUFDLDJCQUEyQixDQUFDO0lBQ2pFLENBQUMsQ0FBQzs7SUFFRjtJQUNBOztJQUVBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQXZELEVBQUUsQ0FBQ2EsdUJBQXVCLENBQUM2QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLENBQUMsSUFBSztNQUMxREEsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7TUFDbEIsSUFBSSxJQUFJLENBQUMvQyx1QkFBdUIsQ0FBQ2tDLFdBQVcsS0FBSyxZQUFZLEVBQUU7UUFDN0RjLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixDQUFDO01BQ3BDLENBQUMsTUFBTTtRQUNMOUQsRUFBRSxDQUFDZ0QsK0JBQStCLEVBQUU7TUFDdEM7SUFDRixDQUFDLENBQUM7RUFDSjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7QUNuT0E7QUFDQTtBQUNBO0FBQzBCO0FBRVgsTUFBTWdCLFNBQVMsQ0FBQztFQUM3QkMsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSSxDQUFDckIsSUFBSSxHQUFHLElBQUksQ0FBQ3NCLGFBQWEsRUFBRTtJQUNoQyxJQUFJLENBQUNDLE9BQU8sR0FBRyxFQUFFO0lBQ2pCLElBQUksQ0FBQ0MsS0FBSyxHQUFHLEVBQUU7RUFDakI7RUFFQUYsYUFBYUEsQ0FBQSxFQUFHO0lBQ2QsTUFBTUcsR0FBRyxHQUFHLEVBQUU7SUFFZCxLQUFLLElBQUl2QyxHQUFHLEdBQUcsQ0FBQyxFQUFFQSxHQUFHLEdBQUcsRUFBRSxFQUFFQSxHQUFHLElBQUksQ0FBQyxFQUFFO01BQ3BDLEtBQUssSUFBSUUsTUFBTSxHQUFHLENBQUMsRUFBRUEsTUFBTSxHQUFHLEVBQUUsRUFBRUEsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3Q3FDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLENBQUN4QyxHQUFHLEVBQUVFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztNQUMvQjtJQUNGO0lBQ0EsT0FBT3FDLEdBQUc7RUFDWjs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBZixTQUFTQSxDQUFDcEMsTUFBTSxFQUFFWSxHQUFHLEVBQUVFLE1BQU0sRUFBNEI7SUFBQSxJQUExQnVDLFNBQVMsR0FBQUMsU0FBQSxDQUFBdEQsTUFBQSxRQUFBc0QsU0FBQSxRQUFBQyxTQUFBLEdBQUFELFNBQUEsTUFBRyxZQUFZO0lBQ3JELE1BQU1FLFNBQVMsR0FBR0EsQ0FBQ2hELENBQUMsRUFBRWlELE9BQU8sS0FBSztNQUNoQyxNQUFNN0IsSUFBSSxHQUFHNkIsT0FBTyxDQUFDakQsQ0FBQyxDQUFDO01BQ3ZCLElBQUksQ0FBQ29CLElBQUksSUFBSUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLE1BQU0sSUFBSThCLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztNQUMzQztJQUNGLENBQUM7SUFFRCxNQUFNQyxlQUFlLEdBQUdBLENBQUNuRCxDQUFDLEVBQUVpRCxPQUFPLEVBQUVHLElBQUksS0FBSztNQUM1QyxNQUFNaEMsSUFBSSxHQUFHNkIsT0FBTyxDQUFDakQsQ0FBQyxDQUFDO01BQ3ZCb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHZ0MsSUFBSTtJQUNoQixDQUFDO0lBRUQsTUFBTUEsSUFBSSxHQUFHLElBQUlmLDZDQUFJLENBQUM3QyxNQUFNLENBQUM7SUFFN0IsSUFBSXFELFNBQVMsS0FBSyxZQUFZLEVBQUU7TUFDOUIsS0FBSyxJQUFJN0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUixNQUFNLEVBQUVRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbENnRCxTQUFTLENBQUNoRCxDQUFDLEVBQUdBLENBQUMsSUFDYixJQUFJLENBQUNrQixJQUFJLENBQUNtQyxJQUFJLENBQUVDLEtBQUssSUFBS0EsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLbEQsR0FBRyxJQUFJa0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLaEQsTUFBTSxHQUFHTixDQUFDLENBQUMsQ0FDdkU7UUFDRG1ELGVBQWUsQ0FDYm5ELENBQUMsRUFDQUEsQ0FBQyxJQUNBLElBQUksQ0FBQ2tCLElBQUksQ0FBQ21DLElBQUksQ0FDWEMsS0FBSyxJQUFLQSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUtsRCxHQUFHLElBQUlrRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUtoRCxNQUFNLEdBQUdOLENBQUMsQ0FDdkQsRUFDSG9ELElBQUksQ0FDTDtNQUNIO0lBQ0YsQ0FBQyxNQUFNLElBQUlQLFNBQVMsS0FBSyxVQUFVLEVBQUU7TUFDbkMsS0FBSyxJQUFJN0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUixNQUFNLEVBQUVRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbENnRCxTQUFTLENBQUNoRCxDQUFDLEVBQUdBLENBQUMsSUFDYixJQUFJLENBQUNrQixJQUFJLENBQUNtQyxJQUFJLENBQUVDLEtBQUssSUFBS0EsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLbEQsR0FBRyxHQUFHSixDQUFDLElBQUlzRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUtoRCxNQUFNLENBQUMsQ0FDdkU7UUFDRDZDLGVBQWUsQ0FDYm5ELENBQUMsRUFDQUEsQ0FBQyxJQUNBLElBQUksQ0FBQ2tCLElBQUksQ0FBQ21DLElBQUksQ0FDWEMsS0FBSyxJQUFLQSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUtsRCxHQUFHLEdBQUdKLENBQUMsSUFBSXNELEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBS2hELE1BQU0sQ0FDdkQsRUFDSDhDLElBQUksQ0FDTDtNQUNIO0lBQ0Y7SUFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ0UsSUFBSSxDQUFDUSxJQUFJLENBQUM7RUFDdkI7RUFFQUcsc0JBQXNCQSxDQUFDL0QsTUFBTSxFQUFxQjtJQUFBLElBQW5CZ0UsVUFBVSxHQUFBVixTQUFBLENBQUF0RCxNQUFBLFFBQUFzRCxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLElBQUk7SUFDOUMsTUFBTVcsY0FBYyxHQUFJQyxHQUFHLElBQUtDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHSCxHQUFHLENBQUM7SUFFL0QsSUFBSUksT0FBTyxHQUFHLENBQUM7SUFDZixJQUFJQyxNQUFNLEdBQUcsS0FBSztJQUVsQixPQUFPLENBQUNBLE1BQU0sSUFBSUQsT0FBTyxHQUFHTixVQUFVLEVBQUU7TUFDdEMsTUFBTXBELEdBQUcsR0FBR3FELGNBQWMsQ0FBQyxJQUFJLENBQUN2QyxJQUFJLENBQUMxQixNQUFNLENBQUM7TUFDNUMsTUFBTWMsTUFBTSxHQUFHbUQsY0FBYyxDQUFDLElBQUksQ0FBQ3ZDLElBQUksQ0FBQzFCLE1BQU0sQ0FBQztNQUMvQyxNQUFNcUQsU0FBUyxHQUFHYyxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxZQUFZLEdBQUcsVUFBVTtNQUVqRSxJQUFJO1FBQ0YsSUFBSSxDQUFDakMsU0FBUyxDQUFDcEMsTUFBTSxFQUFFWSxHQUFHLEVBQUVFLE1BQU0sRUFBRXVDLFNBQVMsQ0FBQztRQUM5Q2tCLE1BQU0sR0FBRyxJQUFJO01BQ2YsQ0FBQyxDQUFDLE9BQU9qQyxLQUFLLEVBQUU7UUFDZDtRQUNBZ0MsT0FBTyxJQUFJLENBQUM7TUFDZDtJQUNGO0lBRUEsSUFBSSxDQUFDQyxNQUFNLEVBQUU7TUFDWCxNQUFNLElBQUliLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQztJQUMvRDtFQUNGO0VBRUFjLGFBQWFBLENBQUM1RCxHQUFHLEVBQUVFLE1BQU0sRUFBRTtJQUN6QixNQUFNLENBQUMyRCxTQUFTLEVBQUVDLFlBQVksQ0FBQyxHQUFHLENBQUM5RCxHQUFHLEVBQUVFLE1BQU0sQ0FBQztJQUUvQyxJQUNFMkQsU0FBUyxHQUFHLENBQUMsSUFDYkEsU0FBUyxJQUFJLEVBQUUsSUFDZkMsWUFBWSxHQUFHLENBQUMsSUFDaEJBLFlBQVksSUFBSSxFQUFFLEVBQ2xCO01BQ0EsTUFBTSxJQUFJaEIsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUNsQztJQUVBLE1BQU05QixJQUFJLEdBQUcsSUFBSSxDQUFDRixJQUFJLENBQUNtQyxJQUFJLENBQ3pCYyxJQUFBO01BQUEsSUFBQyxDQUFDQyxDQUFDLEVBQUVDLEdBQUcsQ0FBQyxHQUFBRixJQUFBO01BQUEsT0FBS0MsQ0FBQyxLQUFLSCxTQUFTLElBQUlJLEdBQUcsS0FBS0gsWUFBWTtJQUFBLEVBQ3REO0lBRUQsSUFBSSxDQUFDOUMsSUFBSSxFQUFFO01BQ1QsTUFBTSxJQUFJOEIsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0lBQ25DO0lBRUEsSUFDRSxJQUFJLENBQUNULE9BQU8sQ0FBQ1ksSUFBSSxDQUFDaUIsS0FBQTtNQUFBLElBQUMsQ0FBQ0YsQ0FBQyxFQUFFQyxHQUFHLENBQUMsR0FBQUMsS0FBQTtNQUFBLE9BQUtGLENBQUMsS0FBS0gsU0FBUyxJQUFJSSxHQUFHLEtBQUtILFlBQVk7SUFBQSxFQUFDLEVBQ3hFO01BQ0EsTUFBTSxJQUFJaEIsS0FBSyxDQUFDLHVCQUF1QixDQUFDO0lBQzFDO0lBRUEsSUFBSTlCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtNQUNYQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNtRCxHQUFHLEVBQUU7TUFDYixJQUFJLENBQUM5QixPQUFPLENBQUNHLElBQUksQ0FBQyxDQUFDcUIsU0FBUyxFQUFFQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7TUFDakQsT0FBTyxJQUFJO0lBQ2I7SUFFQSxJQUFJLENBQUN6QixPQUFPLENBQUNHLElBQUksQ0FBQyxDQUFDcUIsU0FBUyxFQUFFQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsT0FBTyxLQUFLO0VBQ2Q7RUFFQU0sZUFBZUEsQ0FBQSxFQUFHO0lBQ2hCLEtBQUssSUFBSXpFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUMyQyxLQUFLLENBQUNsRCxNQUFNLEVBQUVPLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQzJDLEtBQUssQ0FBQzNDLENBQUMsQ0FBQyxDQUFDMEUsTUFBTSxFQUFFLEVBQUUsT0FBTyxLQUFLO0lBQzNDO0lBRUEsT0FBTyxJQUFJO0VBQ2I7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2THVCO0FBRWE7QUFFTjtBQUVmLE1BQU1wRyxRQUFRLENBQUM7RUFDNUIsT0FBTzJDLE1BQU0sR0FBRyxJQUFJMEQsK0NBQU0sQ0FBQyxNQUFNLENBQUM7RUFFbEMsT0FBT0MsUUFBUSxHQUFHLElBQUlELCtDQUFNLEVBQUU7RUFFOUIsT0FBT0UsSUFBSUEsQ0FBQSxFQUFHO0lBQ1p0RywyREFBaUIsRUFBRTtJQUNuQkEsMkRBQWlCLEVBQUU7RUFDckI7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ29DO0FBRXJCLE1BQU1vRyxNQUFNLENBQUM7RUFDMUIsT0FBT0csS0FBSyxHQUFHLEVBQUU7RUFFakJ0QyxXQUFXQSxDQUFBLEVBQW9CO0lBQUEsSUFBbkJoRCxJQUFJLEdBQUF1RCxTQUFBLENBQUF0RCxNQUFBLFFBQUFzRCxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLFVBQVU7SUFDM0IsSUFBSSxDQUFDdkQsSUFBSSxHQUFHLElBQUksQ0FBQ3VGLGdCQUFnQixDQUFDdkYsSUFBSSxDQUFDO0lBQ3ZDLElBQUksQ0FBQzBCLFNBQVMsR0FBRyxJQUFJcUIsa0RBQVMsRUFBRTtFQUNsQztFQUVBd0MsZ0JBQWdCQSxDQUFDdkYsSUFBSSxFQUFFO0lBQ3JCLElBQUksQ0FBQ0EsSUFBSSxDQUFDQyxNQUFNLEVBQUU7TUFDaEIsTUFBTSxJQUFJMEQsS0FBSyxDQUFDLHNCQUFzQixDQUFDO0lBQ3pDO0lBRUEsT0FBTzNELElBQUksQ0FBQ3dGLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO0VBQ2hDO0VBRUFDLFlBQVlBLENBQUNDLFFBQVEsRUFBRTdFLEdBQUcsRUFBRUUsTUFBTSxFQUFFO0lBQ2xDLElBQUkyRSxRQUFRLENBQUNoRSxTQUFTLENBQUMrQyxhQUFhLENBQUM1RCxHQUFHLEVBQUVFLE1BQU0sQ0FBQyxFQUFFO01BQ2pEb0UsTUFBTSxDQUFDRyxLQUFLLENBQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDckQsSUFBSSxDQUFDO0lBQzlCO0VBQ0Y7RUFFQTJGLGVBQWVBLENBQUNELFFBQVEsRUFBRTtJQUN4QixJQUFJRSxnQkFBZ0IsR0FBRyxLQUFLO0lBRTVCLEdBQUc7TUFDRCxNQUFNL0UsR0FBRyxHQUFHdUQsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO01BQzFDLE1BQU12RCxNQUFNLEdBQUdxRCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7TUFFN0MsSUFBSTtRQUNGc0IsZ0JBQWdCLEdBQUdGLFFBQVEsQ0FBQ2hFLFNBQVMsQ0FBQytDLGFBQWEsQ0FBQzVELEdBQUcsRUFBRUUsTUFBTSxDQUFDO01BQ2xFLENBQUMsQ0FBQyxNQUFNO1FBQ047TUFDRjtJQUNGLENBQUMsUUFBUSxDQUFDNkUsZ0JBQWdCO0lBRTFCVCxNQUFNLENBQUNHLEtBQUssQ0FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUNyRCxJQUFJLENBQUM7RUFDOUI7QUFDRjs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7O0FBRWUsTUFBTThDLElBQUksQ0FBQztFQUN4QkUsV0FBV0EsQ0FBQy9DLE1BQU0sRUFBRTtJQUNsQixJQUFJLENBQUNBLE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUM0RixJQUFJLEdBQUcsQ0FBQztFQUNmO0VBRUFiLEdBQUdBLENBQUEsRUFBRztJQUNKLElBQUksSUFBSSxDQUFDYSxJQUFJLEdBQUcsSUFBSSxDQUFDNUYsTUFBTSxFQUFFLElBQUksQ0FBQzRGLElBQUksSUFBSSxDQUFDO0VBQzdDO0VBRUFYLE1BQU1BLENBQUEsRUFBRztJQUNQLE9BQU8sSUFBSSxDQUFDVyxJQUFJLElBQUksSUFBSSxDQUFDNUYsTUFBTTtFQUNqQztBQUNGOzs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpQztBQUVqQ25CLHNEQUFhLEVBQUUsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lbG9vcCBmcm9tIFwiLi9nYW1lbG9vcFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBzdGF0aWMgbmV3R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24ubmV3LWdhbWVcIik7XG4gIHN0YXRpYyBob3dUb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uaG93LXRvXCIpO1xuXG4gIC8vIEhPVy1UTy1QTEFZIE1PREFMXG4gIHN0YXRpYyBob3dUb1BsYXlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG93LXRvLXBsYXktbW9kYWxcIik7XG4gIHN0YXRpYyBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuLmNsb3NlLWJ1dHRvblwiKTtcblxuICAvLyBQTEFDRSBTSElQUyBNT0RBTFxuICBzdGF0aWMgcGxhY2VTaGlwc01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1zaGlwcy1tb2RhbFwiKTtcbiAgc3RhdGljIHNoaXBJbmZvUGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mby1zaGlwLW5hbWUtbGVuZ3RoXCIpO1xuICBzdGF0aWMgaW5wdXRSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvd1wiKTtcbiAgc3RhdGljIGlucHV0Q29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb2x1bW5cIik7XG4gIHN0YXRpYyBob3Jpem9udGFsUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvcml6b250YWxcIik7XG4gIHN0YXRpYyB2ZXJ0aWNhbFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2ZXJ0aWNhbFwiKTtcbiAgc3RhdGljIHBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1zaGlwLWJ1dHRvblwiKTtcbiAgc3RhdGljIGVycm9yUGxhY2luZ1NoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yLXBsYWNpbmdcIik7XG4gIC8vIHN0YXRpYyBwbGFjZWRTaGlwc0NvdW50ZXIgPSAwO1xuICAvLyBzdGF0aWMgc2hpcHNUb1BsYWNlID0gW1xuICAvLyAgIFtcIkNhcnJpZXJcIiwgNV0sXG4gIC8vICAgW1wiQmF0dGxlc2hpcFwiLCA0XSxcbiAgLy8gICBbXCJDcnVpc2VyXCIsIDNdLFxuICAvLyAgIFtcIlN1Ym1hcmluZVwiLCAzXSxcbiAgLy8gICBbXCJEZXN0cm95ZXJcIiwgMl0sXG4gIC8vIF07XG5cbiAgc3RhdGljICNwbGFjZWRTaGlwc0NvdW50ZXIgPSAwO1xuICBzdGF0aWMgI3NoaXBzVG9QbGFjZSA9IFtcbiAgICB7IG5hbWU6IFwiQ2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IG5hbWU6IFwiQ3J1aXNlclwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiwgbGVuZ3RoOiAyIH0sXG4gIF07XG5cbiAgLy8gV0lOTkVSIEFOTk9VTkNFTUVOVCBNT0RBTFxuICBzdGF0aWMgcmVzdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLnJlc3RhcnQtZ2FtZVwiKTtcblxuICAvLyBHQU1FQk9BUkRTXG4gIHN0YXRpYyBzZWxlY3RTaGlwc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtc2VsZWN0LXNoaXBzXCIpO1xuICBzdGF0aWMgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcbiAgc3RhdGljIHlvdXJCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnlvdXJib2FyZC1ncmlkXCIpO1xuXG4gIC8vIERSQVcgVEhFIEdBTUVCT0FSRFNcbiAgc3RhdGljIGRyYXdHYW1lYm9hcmRzKCkge1xuICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuICAgICAgICAvLyBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgIC8vIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuXG4gICAgICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbiAgICAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbiAgICAgICAgLy8gc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICBjb25zdCBzaW5nbGVDZWxsMiA9IHNpbmdsZUNlbGwuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBVSS5haUJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbiAgICAgICAgVUkueW91ckJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsMik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gc3RhdGljIHJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKSB7XG4gIC8vICAgVUkuc2VsZWN0U2hpcHNHcmlkLmlubmVySFRNTCA9IFwiXCI7XG4gIC8vICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG5cbiAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAvLyAgICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcblxuICAvLyAgICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuICAvLyAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG5cbiAgLy8gICAgICAgY29uc3QgZ3JpZEVsZW1lbnQgPSBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLmdyaWQuZmluZChcbiAgLy8gICAgICAgICAoZWwpID0+IGVsWzBdID09PSBpICYmIGVsWzFdID09PSBqXG4gIC8vICAgICAgICk7XG4gIC8vICAgICAgIGlmIChncmlkRWxlbWVudCAmJiBncmlkRWxlbWVudFsyXSkge1xuICAvLyAgICAgICAgIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgLy8gICAgICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIHN0YXRpYyByZW5kZXJBZGRTaGlwR2FtZWJvYXJkKCkge1xuICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdhbWVib2FyZENlbGwuZGF0YXNldC5yb3cgPSByb3cudG9TdHJpbmcoKTtcbiAgICAgICAgZ2FtZWJvYXJkQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbi50b1N0cmluZygpO1xuICAgICAgICBnYW1lYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpO1xuICAgICAgICBVSS5zZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgaXNTaGlwUGxhY2VkID0gR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5ncmlkLnNvbWUoXG4gICAgICAgICAgKGNlbGwpID0+IGNlbGxbMF0gPT09IHJvdyAmJiBjZWxsWzFdID09PSBjb2x1bW4gJiYgY2VsbFsyXVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNTaGlwUGxhY2VkKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGdhbWVib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gc3RhdGljIHJlbmRlclNoaXBOYW1lVG9QbGFjZSgpIHtcbiAgLy8gICBpZiAoVUkucGxhY2VkU2hpcHNDb3VudGVyIDwgNSkge1xuICAvLyAgICAgY29uc3Qgc2hpcE5hbWUgPSBVSS5zaGlwc1RvUGxhY2VbVUkucGxhY2VkU2hpcHNDb3VudGVyXVswXTtcbiAgLy8gICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS5zaGlwc1RvUGxhY2VbVUkucGxhY2VkU2hpcHNDb3VudGVyXVsxXTtcbiAgLy8gICAgIFVJLnNoaXBJbmZvUGFyYS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7c2hpcE5hbWV9LCBsZW5ndGggJHtzaGlwTGVuZ3RofWA7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gQ2hhbmdlIGJ1dHRvbiB0byBzdGFydCBnYW1lIGFuZSBhY3R1YWxseSBzdGFydCBpdFxuICAvLyAgICAgY29uc29sZS5sb2coXCJPUFNcIik7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgc3RhdGljIHJlbmRlclNoaXBOYW1lVG9QbGFjZSgpIHtcbiAgICBpZiAoVUkuI3BsYWNlZFNoaXBzQ291bnRlciA8IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGxlbmd0aCB9ID0gVUkuI3NoaXBzVG9QbGFjZVtVSS4jcGxhY2VkU2hpcHNDb3VudGVyXTtcbiAgICAgIFVJLnNoaXBJbmZvUGFyYS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7bmFtZX0sIGxlbmd0aCAke2xlbmd0aH1gO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVQbGFjZVNoaXBPclN0YXJ0R2FtZUNsaWNrKCkge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS4jc2hpcHNUb1BsYWNlW1VJLiNwbGFjZWRTaGlwc0NvdW50ZXJdLmxlbmd0aDtcbiAgICBjb25zdCByb3cgPSArVUkuaW5wdXRSb3cudmFsdWU7XG4gICAgY29uc3QgY29sdW1uID0gK1VJLmlucHV0Q29sdW1uLnZhbHVlO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gVUkuaG9yaXpvbnRhbFJhZGlvLmNoZWNrZWQgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgIGlmICghVUkuaW5wdXRSb3cuY2hlY2tWYWxpZGl0eSgpIHx8ICFVSS5pbnB1dENvbHVtbi5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBcIkludmFsaWQgSW5wdXRcIjtcbiAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcbiAgICAgIFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgKz0gMTtcbiAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItcGxhY2luZy12aXNpYmxlXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLnRleHRDb250ZW50ID0gZXJyb3I7XG4gICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgfVxuXG4gICAgaWYgKFVJLiNwbGFjZWRTaGlwc0NvdW50ZXIgPT09IFVJLiNzaGlwc1RvUGxhY2UubGVuZ3RoKSB7XG4gICAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xuICAgICAgVUkuc2hpcEluZm9QYXJhLnRleHRDb250ZW50ID0gXCJBbGwgc2hpcHMgc2V0ISBSZWFkeSB0byByb2xsIVwiO1xuICAgICAgLy8gQ2hhbmdlIGJ1dHRvbiB0byBzdGFydCBnYW1lIGFuZCBhY3R1YWxseSBzdGFydCBpdFxuICAgIH1cbiAgfVxuXG4gIC8vIEFERCBFVkVOVCBMSVNURU5FUlNcbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xuICAgIFVJLm5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFVJLnBsYWNlU2hpcHNNb2RhbC5jbGFzc0xpc3QuYWRkKFwicGxhY2Utc2hpcHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgIH0pO1xuXG4gICAgVUkuaG93VG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFVJLmhvd1RvUGxheU1vZGFsLmNsYXNzTGlzdC5hZGQoXCJob3ctdG8tcGxheS1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgVUkuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFVJLmhvd1RvUGxheU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ctdG8tcGxheS1tb2RhbC12aXNpYmxlXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gVUkucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuXG4gICAgLy8gICBsZXQgcGxhY2VtZW50ID0gbnVsbDtcbiAgICAvLyAgIGlmIChVSS5ob3Jpem9udGFsUmFkaW8uY2hlY2tlZCkge1xuICAgIC8vICAgICBwbGFjZW1lbnQgPSBcImhvcml6b250YWxcIjtcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIHBsYWNlbWVudCA9IFwidmVydGljYWxcIjtcbiAgICAvLyAgIH1cblxuICAgIC8vICAgaWYgKFVJLmlucHV0Um93LmNoZWNrVmFsaWRpdHkoKSAmJiBVSS5pbnB1dENvbHVtbi5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAvLyAgICAgdHJ5IHtcbiAgICAvLyAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gVUkuc2hpcHNUb1BsYWNlW1VJLnBsYWNlZFNoaXBzQ291bnRlcl1bMV07XG4gICAgLy8gICAgICAgR2FtZWxvb3AucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgLy8gICAgICAgICBzaGlwTGVuZ3RoLFxuICAgIC8vICAgICAgICAgK1VJLmlucHV0Um93LnZhbHVlLFxuICAgIC8vICAgICAgICAgK1VJLmlucHV0Q29sdW1uLnZhbHVlLFxuICAgIC8vICAgICAgICAgcGxhY2VtZW50XG4gICAgLy8gICAgICAgKTtcblxuICAgIC8vICAgICAgIFVJLnJlbmRlckFkZFNoaXBHYW1lYm9hcmQoKTtcblxuICAgIC8vICAgICAgIFVJLnBsYWNlZFNoaXBzQ291bnRlciArPSAxO1xuICAgIC8vICAgICAgIFVJLnJlbmRlclNoaXBOYW1lVG9QbGFjZSgpO1xuICAgIC8vICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vICAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAudGV4dENvbnRlbnQgPSBlcnJvcjtcbiAgICAvLyAgICAgICBVSS5lcnJvclBsYWNpbmdTaGlwLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1wbGFjaW5nLXZpc2libGVcIik7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiS3VyZWMgeCAyXCIpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICAgIFVJLnBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHRoaXMucGxhY2VTaGlwT3JTdGFydEdhbWVCdG4udGV4dENvbnRlbnQgPT09IFwiU3RhcnQgZ2FtZVwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT0shIFJlYWR5IHRvIHN0YXJ0IVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVJLmhhbmRsZVBsYWNlU2hpcE9yU3RhcnRHYW1lQ2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2hhZG93ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLl9nZW5lcmF0ZUdyaWQoKTtcbiAgICB0aGlzLmF0dGFja3MgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBfZ2VuZXJhdGVHcmlkKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uICs9IDEpIHtcbiAgICAgICAgYXJyLnB1c2goW3JvdywgY29sdW1uLCBudWxsXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICAvLyBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgcGxhY2VtZW50ID0gXCJob3Jpem9udGFsXCIpIHtcbiAgLy8gICBpZiAocGxhY2VtZW50ID09PSBcImhvcml6b250YWxcIikge1xuICAvLyAgICAgLy8gQ2hlY2sgaWYgdGhlIHNoaXAgcGxhY2VtZW50IGlzIHZhbGlkXG4gIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaiArPSAxKSB7XG4gIC8vICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWQuZmluZChcbiAgLy8gICAgICAgICAoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgJiYgZmllbGRbMV0gPT09IGNvbHVtbiArIGpcbiAgLy8gICAgICAgKTtcbiAgLy8gICAgICAgaWYgKCFjZWxsIHx8IGNlbGxbMl0pIHtcbiAgLy8gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNoaXAgcGxhY2VtZW50XCIpO1xuICAvLyAgICAgICB9XG4gIC8vICAgICB9XG5cbiAgLy8gICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAvLyAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gIC8vICAgICAvLyBQbGFjZSB0aGUgc2hpcCBpbiB0aGUgY2VsbHNcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqICs9IDEpIHtcbiAgLy8gICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZC5maW5kKFxuICAvLyAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyAmJiBmaWVsZFsxXSA9PT0gY29sdW1uICsgalxuICAvLyAgICAgICApO1xuICAvLyAgICAgICBjZWxsWzJdID0gc2hpcDtcbiAgLy8gICAgIH1cbiAgLy8gICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gIC8vICAgICAvLyBDaGVjayBpZiB0aGUgc2hpcCBwbGFjZW1lbnQgaXMgdmFsaWRcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqICs9IDEpIHtcbiAgLy8gICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZC5maW5kKFxuICAvLyAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyArIGogJiYgZmllbGRbMV0gPT09IGNvbHVtblxuICAvLyAgICAgICApO1xuICAvLyAgICAgICBpZiAoIWNlbGwgfHwgY2VsbFsyXSkge1xuICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2hpcCBwbGFjZW1lbnRcIik7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAvLyAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gIC8vICAgICAvLyBQbGFjZSB0aGUgc2hpcCBpbiB0aGUgY2VsbHNcbiAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqICs9IDEpIHtcbiAgLy8gICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZC5maW5kKFxuICAvLyAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyArIGogJiYgZmllbGRbMV0gPT09IGNvbHVtblxuICAvLyAgICAgICApO1xuICAvLyAgICAgICBjZWxsWzJdID0gc2hpcDtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgcGxhY2VtZW50ID0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBjb25zdCBjaGVja0NlbGwgPSAoaiwgZ2V0Q2VsbCkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGdldENlbGwoaik7XG4gICAgICBpZiAoIWNlbGwgfHwgY2VsbFsyXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNoaXAgcGxhY2VtZW50XCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwbGFjZVNoaXBJbkNlbGwgPSAoaiwgZ2V0Q2VsbCwgc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGdldENlbGwoaik7XG4gICAgICBjZWxsWzJdID0gc2hpcDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBjaGVja0NlbGwoaiwgKGopID0+XG4gICAgICAgICAgdGhpcy5ncmlkLmZpbmQoKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICYmIGZpZWxkWzFdID09PSBjb2x1bW4gKyBqKVxuICAgICAgICApO1xuICAgICAgICBwbGFjZVNoaXBJbkNlbGwoXG4gICAgICAgICAgaixcbiAgICAgICAgICAoaikgPT5cbiAgICAgICAgICAgIHRoaXMuZ3JpZC5maW5kKFxuICAgICAgICAgICAgICAoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgJiYgZmllbGRbMV0gPT09IGNvbHVtbiArIGpcbiAgICAgICAgICAgICksXG4gICAgICAgICAgc2hpcFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgY2hlY2tDZWxsKGosIChqKSA9PlxuICAgICAgICAgIHRoaXMuZ3JpZC5maW5kKChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyArIGogJiYgZmllbGRbMV0gPT09IGNvbHVtbilcbiAgICAgICAgKTtcbiAgICAgICAgcGxhY2VTaGlwSW5DZWxsKFxuICAgICAgICAgIGosXG4gICAgICAgICAgKGopID0+XG4gICAgICAgICAgICB0aGlzLmdyaWQuZmluZChcbiAgICAgICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICsgaiAmJiBmaWVsZFsxXSA9PT0gY29sdW1uXG4gICAgICAgICAgICApLFxuICAgICAgICAgIHNoaXBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICB9XG5cbiAgcGxhY2VTaGlwQXV0b21hdGljYWxseShsZW5ndGgsIG1heFJldHJpZXMgPSA1MDAwKSB7XG4gICAgY29uc3QgZ2V0UmFuZG9tSW5kZXggPSAobWF4KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuXG4gICAgbGV0IHJldHJpZXMgPSAwO1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlICghcGxhY2VkICYmIHJldHJpZXMgPCBtYXhSZXRyaWVzKSB7XG4gICAgICBjb25zdCByb3cgPSBnZXRSYW5kb21JbmRleCh0aGlzLmdyaWQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGdldFJhbmRvbUluZGV4KHRoaXMuZ3JpZC5sZW5ndGgpO1xuICAgICAgY29uc3QgcGxhY2VtZW50ID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBwbGFjZW1lbnQpO1xuICAgICAgICBwbGFjZWQgPSB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSW52YWxpZCBwbGFjZW1lbnQsIHJldHJ5XG4gICAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXBsYWNlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHBsYWNlIHNoaXAgYWZ0ZXIgbWF4aW11bSByZXRyaWVzXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBjb25zdCBbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW5dID0gW3JvdywgY29sdW1uXTtcblxuICAgIGlmIChcbiAgICAgIHRhcmdldFJvdyA8IDAgfHxcbiAgICAgIHRhcmdldFJvdyA+PSAxMCB8fFxuICAgICAgdGFyZ2V0Q29sdW1uIDwgMCB8fFxuICAgICAgdGFyZ2V0Q29sdW1uID49IDEwXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPdXQgb2YgYm91bmRzXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWQuZmluZChcbiAgICAgIChbciwgY29sXSkgPT4gciA9PT0gdGFyZ2V0Um93ICYmIGNvbCA9PT0gdGFyZ2V0Q29sdW1uXG4gICAgKTtcblxuICAgIGlmICghY2VsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBub3QgZm91bmRcIik7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5hdHRhY2tzLmZpbmQoKFtyLCBjb2xdKSA9PiByID09PSB0YXJnZXRSb3cgJiYgY29sID09PSB0YXJnZXRDb2x1bW4pXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGFscmVhZHkgYXR0YWNrZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKGNlbGxbMl0pIHtcbiAgICAgIGNlbGxbMl0uaGl0KCk7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW4sIFwiK1wiXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFja3MucHVzaChbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW4sIFwiLVwiXSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXJlQWxsU2hpcHNTdW5rKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKCF0aGlzLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tIFwiLi9kb21cIjtcblxuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWxvb3Age1xuICBzdGF0aWMgcGxheWVyID0gbmV3IFBsYXllcihcIktyaXNcIik7XG5cbiAgc3RhdGljIGNvbXB1dGVyID0gbmV3IFBsYXllcigpO1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIFVJLmRyYXdHYW1lYm9hcmRzKCk7XG4gICAgVUkuZXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29udGludWUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBzdGF0aWMgdHVybnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihuYW1lID0gXCJDb21wdXRlclwiKSB7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5fY2hlY2tQbGF5ZXJOYW1lKG5hbWUpO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgX2NoZWNrUGxheWVyTmFtZShuYW1lKSB7XG4gICAgaWYgKCFuYW1lLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmFtZSBjYW5ub3QgYmUgZW1wdHlcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICB9XG5cbiAgbWFudWFsQXR0YWNrKG9wcG9uZW50LCByb3csIGNvbHVtbikge1xuICAgIGlmIChvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikpIHtcbiAgICAgIFBsYXllci50dXJucy5wdXNoKHRoaXMubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXV0b21hdGljQXR0YWNrKG9wcG9uZW50KSB7XG4gICAgbGV0IGF0dGFja1N1Y2Nlc3NmdWwgPSBmYWxzZTtcblxuICAgIGRvIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXR0YWNrU3VjY2Vzc2Z1bCA9IG9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9IHdoaWxlICghYXR0YWNrU3VjY2Vzc2Z1bCk7XG5cbiAgICBQbGF5ZXIudHVybnMucHVzaCh0aGlzLm5hbWUpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gY29uc3Qgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4vLyAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuLy8gICAgIHNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbi8vICAgfVxuLy8gfVxuXG4vLyBjb25zdCBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuLy8gY29uc3QgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgLy8gICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcbiAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG4gICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG5cbi8vICAgICBjb25zdCBzaW5nbGVDZWxsMiA9IHNpbmdsZUNlbGwuY2xvbmVOb2RlKHRydWUpO1xuLy8gICAgIGFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuLy8gICAgIHlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbDIpO1xuLy8gICB9XG4vLyB9XG5cbmltcG9ydCBHYW1lbG9vcCBmcm9tIFwiLi9nYW1lbG9vcFwiXG5cbkdhbWVsb29wLmluaXQoKTsiXSwibmFtZXMiOlsiR2FtZWxvb3AiLCJVSSIsIm5ld0dhbWVCdG4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJob3dUb0J0biIsImhvd1RvUGxheU1vZGFsIiwiY2xvc2VCdG4iLCJwbGFjZVNoaXBzTW9kYWwiLCJzaGlwSW5mb1BhcmEiLCJpbnB1dFJvdyIsImlucHV0Q29sdW1uIiwiaG9yaXpvbnRhbFJhZGlvIiwidmVydGljYWxSYWRpbyIsInBsYWNlU2hpcE9yU3RhcnRHYW1lQnRuIiwiZXJyb3JQbGFjaW5nU2hpcCIsInBsYWNlZFNoaXBzQ291bnRlciIsInNoaXBzVG9QbGFjZSIsIm5hbWUiLCJsZW5ndGgiLCJyZXN0YXJ0R2FtZUJ0biIsInNlbGVjdFNoaXBzR3JpZCIsImFpQm9hcmRHcmlkIiwieW91ckJvYXJkR3JpZCIsImRyYXdHYW1lYm9hcmRzIiwiaW5uZXJIVE1MIiwiaSIsImoiLCJzaW5nbGVDZWxsIiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJyb3ciLCJ0b1N0cmluZyIsImNvbHVtbiIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwic2luZ2xlQ2VsbDIiLCJjbG9uZU5vZGUiLCJyZW5kZXJBZGRTaGlwR2FtZWJvYXJkIiwicmVuZGVyU2hpcE5hbWVUb1BsYWNlIiwiZ2FtZWJvYXJkQ2VsbCIsImlzU2hpcFBsYWNlZCIsInBsYXllciIsImdhbWVib2FyZCIsImdyaWQiLCJzb21lIiwiY2VsbCIsInRleHRDb250ZW50IiwiaGFuZGxlUGxhY2VTaGlwT3JTdGFydEdhbWVDbGljayIsInNoaXBMZW5ndGgiLCJ2YWx1ZSIsIm9yaWVudGF0aW9uIiwiY2hlY2tlZCIsImNoZWNrVmFsaWRpdHkiLCJwbGFjZVNoaXAiLCJyZW1vdmUiLCJlcnJvciIsImV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJfZ2VuZXJhdGVHcmlkIiwiYXR0YWNrcyIsInNoaXBzIiwiYXJyIiwicHVzaCIsInBsYWNlbWVudCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNoZWNrQ2VsbCIsImdldENlbGwiLCJFcnJvciIsInBsYWNlU2hpcEluQ2VsbCIsInNoaXAiLCJmaW5kIiwiZmllbGQiLCJwbGFjZVNoaXBBdXRvbWF0aWNhbGx5IiwibWF4UmV0cmllcyIsImdldFJhbmRvbUluZGV4IiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmV0cmllcyIsInBsYWNlZCIsInJlY2VpdmVBdHRhY2siLCJ0YXJnZXRSb3ciLCJ0YXJnZXRDb2x1bW4iLCJfcmVmIiwiciIsImNvbCIsIl9yZWYyIiwiaGl0IiwiYXJlQWxsU2hpcHNTdW5rIiwiaXNTdW5rIiwiUGxheWVyIiwiY29tcHV0ZXIiLCJpbml0IiwidHVybnMiLCJfY2hlY2tQbGF5ZXJOYW1lIiwicmVwbGFjZSIsIm1hbnVhbEF0dGFjayIsIm9wcG9uZW50IiwiYXV0b21hdGljQXR0YWNrIiwiYXR0YWNrU3VjY2Vzc2Z1bCIsImhpdHMiXSwic291cmNlUm9vdCI6IiJ9
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
  static placedShipsCounter = 0;
  static shipsToPlace = [["Carrier", 5], ["Battleship", 4], ["Cruiser", 3], ["Submarine", 3], ["Destroyer", 2]];

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
        const gridElement = _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.grid.find(el => el[0] === i && el[1] === j);
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
    UI.placeShipOrStartGameBtn.addEventListener("click", e => {
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
          _gameloop__WEBPACK_IMPORTED_MODULE_0__["default"].player.gameboard.placeShip(shipLength, +UI.inputRow.value, +UI.inputColumn.value, placement);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDd0MsSUFBSSxJQUFJLENBQUM7RUFDN0M7RUFFQVosTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsT0FBTyxJQUFJLENBQUNZLElBQUksSUFBSSxJQUFJLENBQUN4QyxNQUFNO0VBQ2pDO0FBQ0Y7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDO0FBRWpDckUsc0RBQWEsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVsb29wIGZyb20gXCIuL2dhbWVsb29wXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIHN0YXRpYyBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5uZXctZ2FtZVwiKTtcbiAgc3RhdGljIGhvd1RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5ob3ctdG9cIik7XG5cbiAgLy8gSE9XLVRPLVBMQVkgTU9EQUxcbiAgc3RhdGljIGhvd1RvUGxheU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3ctdG8tcGxheS1tb2RhbFwiKTtcbiAgc3RhdGljIGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW4uY2xvc2UtYnV0dG9uXCIpO1xuXG4gIC8vIFBMQUNFIFNISVBTIE1PREFMXG4gIHN0YXRpYyBwbGFjZVNoaXBzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuICBzdGF0aWMgc2hpcEluZm9QYXJhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvLXNoaXAtbmFtZS1sZW5ndGhcIik7XG4gIHN0YXRpYyBpbnB1dFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm93XCIpO1xuICBzdGF0aWMgaW5wdXRDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbHVtblwiKTtcbiAgc3RhdGljIGhvcml6b250YWxSYWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9yaXpvbnRhbFwiKTtcbiAgc3RhdGljIHZlcnRpY2FsUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZlcnRpY2FsXCIpO1xuICBzdGF0aWMgcGxhY2VTaGlwT3JTdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXAtYnV0dG9uXCIpO1xuICBzdGF0aWMgZXJyb3JQbGFjaW5nU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3ItcGxhY2luZ1wiKTtcbiAgc3RhdGljIHBsYWNlZFNoaXBzQ291bnRlciA9IDA7XG4gIHN0YXRpYyBzaGlwc1RvUGxhY2UgPSBbXG4gICAgW1wiQ2FycmllclwiLCA1XSxcbiAgICBbXCJCYXR0bGVzaGlwXCIsIDRdLFxuICAgIFtcIkNydWlzZXJcIiwgM10sXG4gICAgW1wiU3VibWFyaW5lXCIsIDNdLFxuICAgIFtcIkRlc3Ryb3llclwiLCAyXSxcbiAgXTtcblxuICAvLyBXSU5ORVIgQU5OT1VOQ0VNRU5UIE1PREFMXG4gIHN0YXRpYyByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24ucmVzdGFydC1nYW1lXCIpO1xuXG4gIC8vIEdBTUVCT0FSRFNcbiAgc3RhdGljIHNlbGVjdFNoaXBzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1zZWxlY3Qtc2hpcHNcIik7XG4gIHN0YXRpYyBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuICBzdGF0aWMgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbiAgLy8gRFJBVyBUSEUgR0FNRUJPQVJEU1xuICBzdGF0aWMgZHJhd0dhbWVib2FyZHMoKSB7XG4gICAgVUkuc2VsZWN0U2hpcHNHcmlkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgLy8gc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4gICAgICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG5cbiAgICAgICAgVUkuc2VsZWN0U2hpcHNHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJteXNoaXBzXCIpO1xuICAgICAgICAvLyBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgIGNvbnN0IHNpbmdsZUNlbGwyID0gc2luZ2xlQ2VsbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIFVJLmFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuICAgICAgICBVSS55b3VyQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyQWRkU2hpcEdhbWVib2FyZCgpIHtcbiAgICBVSS5zZWxlY3RTaGlwc0dyaWQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBVSS5yZW5kZXJTaGlwTmFtZVRvUGxhY2UoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuXG4gICAgICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG4gICAgICAgIFVJLnNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcblxuICAgICAgICBjb25zdCBncmlkRWxlbWVudCA9IEdhbWVsb29wLnBsYXllci5nYW1lYm9hcmQuZ3JpZC5maW5kKFxuICAgICAgICAgIChlbCkgPT4gZWxbMF0gPT09IGkgJiYgZWxbMV0gPT09IGpcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdyaWRFbGVtZW50ICYmIGdyaWRFbGVtZW50WzJdKSB7XG4gICAgICAgICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlclNoaXBOYW1lVG9QbGFjZSgpIHtcbiAgICBpZiAoVUkucGxhY2VkU2hpcHNDb3VudGVyIDwgNSkge1xuICAgICAgY29uc3Qgc2hpcE5hbWUgPSBVSS5zaGlwc1RvUGxhY2VbVUkucGxhY2VkU2hpcHNDb3VudGVyXVswXTtcbiAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS5zaGlwc1RvUGxhY2VbVUkucGxhY2VkU2hpcHNDb3VudGVyXVsxXTtcbiAgICAgIFVJLnNoaXBJbmZvUGFyYS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7c2hpcE5hbWV9LCBsZW5ndGggJHtzaGlwTGVuZ3RofWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vQ2hhbmdlIGJ1dHRvbiB0byBzdGFydCBnYW1lIGFuZSBhY3R1YWxseSBzdGFydCBpdFxuICAgICAgY29uc29sZS5sb2coXCJPUFNcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gQUREIEVWRU5UIExJU1RFTkVSU1xuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgVUkubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgVUkucGxhY2VTaGlwc01vZGFsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZS1zaGlwcy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG4gICAgfSk7XG5cbiAgICBVSS5ob3dUb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgVUkuaG93VG9QbGF5TW9kYWwuY2xhc3NMaXN0LmFkZChcImhvdy10by1wbGF5LW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5jbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgVUkuaG93VG9QbGF5TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImhvdy10by1wbGF5LW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG5cbiAgICBVSS5wbGFjZVNoaXBPclN0YXJ0R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG5cbiAgICAgIGxldCBwbGFjZW1lbnQgPSBudWxsO1xuICAgICAgaWYgKFVJLmhvcml6b250YWxSYWRpby5jaGVja2VkKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxhY2VtZW50ID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoVUkuaW5wdXRSb3cuY2hlY2tWYWxpZGl0eSgpICYmIFVJLmlucHV0Q29sdW1uLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBVSS5zaGlwc1RvUGxhY2VbVUkucGxhY2VkU2hpcHNDb3VudGVyXVsxXTtcbiAgICAgICAgICBHYW1lbG9vcC5wbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgIHNoaXBMZW5ndGgsXG4gICAgICAgICAgICArVUkuaW5wdXRSb3cudmFsdWUsXG4gICAgICAgICAgICArVUkuaW5wdXRDb2x1bW4udmFsdWUsXG4gICAgICAgICAgICBwbGFjZW1lbnRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgVUkucmVuZGVyQWRkU2hpcEdhbWVib2FyZCgpO1xuICAgICAgICAgIFxuXG4gICAgICAgICAgVUkucGxhY2VkU2hpcHNDb3VudGVyICs9IDE7XG4gICAgICAgICAgVUkucmVuZGVyU2hpcE5hbWVUb1BsYWNlKCk7XG4gICAgICAgICAgXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgVUkuZXJyb3JQbGFjaW5nU2hpcC50ZXh0Q29udGVudCA9IGVycm9yO1xuICAgICAgICAgIFVJLmVycm9yUGxhY2luZ1NoaXAuY2xhc3NMaXN0LmFkZChcImVycm9yLXBsYWNpbmctdmlzaWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJLdXJlYyB4IDJcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNoYWRvdyAqL1xuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5fZ2VuZXJhdGVHcmlkKCk7XG4gICAgdGhpcy5hdHRhY2tzID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgX2dlbmVyYXRlR3JpZCgpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbiArPSAxKSB7XG4gICAgICAgIGFyci5wdXNoKFtyb3csIGNvbHVtbiwgbnVsbF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgLy8gcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIHBsYWNlbWVudCA9IFwiaG9yaXpvbnRhbFwiKSB7XG4gIC8vICAgaWYgKHBsYWNlbWVudCA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgLy8gICAgIC8vIENoZWNrIGlmIHRoZSBzaGlwIHBsYWNlbWVudCBpcyB2YWxpZFxuICAvLyAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGogKz0gMSkge1xuICAvLyAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkLmZpbmQoXG4gIC8vICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICYmIGZpZWxkWzFdID09PSBjb2x1bW4gKyBqXG4gIC8vICAgICAgICk7XG4gIC8vICAgICAgIGlmICghY2VsbCB8fCBjZWxsWzJdKSB7XG4gIC8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaGlwIHBsYWNlbWVudFwiKTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuXG4gIC8vICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgLy8gICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcblxuICAvLyAgICAgLy8gUGxhY2UgdGhlIHNoaXAgaW4gdGhlIGNlbGxzXG4gIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaiArPSAxKSB7XG4gIC8vICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWQuZmluZChcbiAgLy8gICAgICAgICAoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgJiYgZmllbGRbMV0gPT09IGNvbHVtbiArIGpcbiAgLy8gICAgICAgKTtcbiAgLy8gICAgICAgY2VsbFsyXSA9IHNoaXA7XG4gIC8vICAgICB9XG4gIC8vICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFwidmVydGljYWxcIikge1xuICAvLyAgICAgLy8gQ2hlY2sgaWYgdGhlIHNoaXAgcGxhY2VtZW50IGlzIHZhbGlkXG4gIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaiArPSAxKSB7XG4gIC8vICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWQuZmluZChcbiAgLy8gICAgICAgICAoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgKyBqICYmIGZpZWxkWzFdID09PSBjb2x1bW5cbiAgLy8gICAgICAgKTtcbiAgLy8gICAgICAgaWYgKCFjZWxsIHx8IGNlbGxbMl0pIHtcbiAgLy8gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNoaXAgcGxhY2VtZW50XCIpO1xuICAvLyAgICAgICB9XG4gIC8vICAgICB9XG4gIC8vICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgLy8gICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcblxuICAvLyAgICAgLy8gUGxhY2UgdGhlIHNoaXAgaW4gdGhlIGNlbGxzXG4gIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaiArPSAxKSB7XG4gIC8vICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWQuZmluZChcbiAgLy8gICAgICAgICAoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgKyBqICYmIGZpZWxkWzFdID09PSBjb2x1bW5cbiAgLy8gICAgICAgKTtcbiAgLy8gICAgICAgY2VsbFsyXSA9IHNoaXA7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIHBsYWNlbWVudCA9IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgY29uc3QgY2hlY2tDZWxsID0gKGosIGdldENlbGwpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBnZXRDZWxsKGopO1xuICAgICAgaWYgKCFjZWxsIHx8IGNlbGxbMl0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaGlwIHBsYWNlbWVudFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcGxhY2VTaGlwSW5DZWxsID0gKGosIGdldENlbGwsIHNoaXApID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBnZXRDZWxsKGopO1xuICAgICAgY2VsbFsyXSA9IHNoaXA7XG4gICAgfTtcblxuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgY2hlY2tDZWxsKGosIChqKSA9PlxuICAgICAgICAgIHRoaXMuZ3JpZC5maW5kKChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyAmJiBmaWVsZFsxXSA9PT0gY29sdW1uICsgailcbiAgICAgICAgKTtcbiAgICAgICAgcGxhY2VTaGlwSW5DZWxsKFxuICAgICAgICAgIGosXG4gICAgICAgICAgKGopID0+XG4gICAgICAgICAgICB0aGlzLmdyaWQuZmluZChcbiAgICAgICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFswXSA9PT0gcm93ICYmIGZpZWxkWzFdID09PSBjb2x1bW4gKyBqXG4gICAgICAgICAgICApLFxuICAgICAgICAgIHNoaXBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGNoZWNrQ2VsbChqLCAoaikgPT5cbiAgICAgICAgICB0aGlzLmdyaWQuZmluZCgoZmllbGQpID0+IGZpZWxkWzBdID09PSByb3cgKyBqICYmIGZpZWxkWzFdID09PSBjb2x1bW4pXG4gICAgICAgICk7XG4gICAgICAgIHBsYWNlU2hpcEluQ2VsbChcbiAgICAgICAgICBqLFxuICAgICAgICAgIChqKSA9PlxuICAgICAgICAgICAgdGhpcy5ncmlkLmZpbmQoXG4gICAgICAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbMF0gPT09IHJvdyArIGogJiYgZmllbGRbMV0gPT09IGNvbHVtblxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBzaGlwXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgfVxuXG4gIHBsYWNlU2hpcEF1dG9tYXRpY2FsbHkobGVuZ3RoLCBtYXhSZXRyaWVzID0gNTAwMCkge1xuICAgIGNvbnN0IGdldFJhbmRvbUluZGV4ID0gKG1heCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcblxuICAgIGxldCByZXRyaWVzID0gMDtcbiAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoIXBsYWNlZCAmJiByZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgY29uc3Qgcm93ID0gZ2V0UmFuZG9tSW5kZXgodGhpcy5ncmlkLmxlbmd0aCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBnZXRSYW5kb21JbmRleCh0aGlzLmdyaWQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHBsYWNlbWVudCA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgcGxhY2VtZW50KTtcbiAgICAgICAgcGxhY2VkID0gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIEludmFsaWQgcGxhY2VtZW50LCByZXRyeVxuICAgICAgICByZXRyaWVzICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwbGFjZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBwbGFjZSBzaGlwIGFmdGVyIG1heGltdW0gcmV0cmllc1wiKTtcbiAgICB9XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgY29uc3QgW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uXSA9IFtyb3csIGNvbHVtbl07XG5cbiAgICBpZiAoXG4gICAgICB0YXJnZXRSb3cgPCAwIHx8XG4gICAgICB0YXJnZXRSb3cgPj0gMTAgfHxcbiAgICAgIHRhcmdldENvbHVtbiA8IDAgfHxcbiAgICAgIHRhcmdldENvbHVtbiA+PSAxMFxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3V0IG9mIGJvdW5kc1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkLmZpbmQoXG4gICAgICAoW3IsIGNvbF0pID0+IHIgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbHVtblxuICAgICk7XG5cbiAgICBpZiAoIWNlbGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgbm90IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuYXR0YWNrcy5maW5kKChbciwgY29sXSkgPT4gciA9PT0gdGFyZ2V0Um93ICYmIGNvbCA9PT0gdGFyZ2V0Q29sdW1uKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBhbHJlYWR5IGF0dGFja2VkXCIpO1xuICAgIH1cblxuICAgIGlmIChjZWxsWzJdKSB7XG4gICAgICBjZWxsWzJdLmhpdCgpO1xuICAgICAgdGhpcy5hdHRhY2tzLnB1c2goW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uLCBcIitcIl0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hdHRhY2tzLnB1c2goW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uLCBcIi1cIl0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFyZUFsbFNoaXBzU3VuaygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICghdGhpcy5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgVUkgZnJvbSBcIi4vZG9tXCI7XG5cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVsb29wIHtcbiAgc3RhdGljIHBsYXllciA9IG5ldyBQbGF5ZXIoXCJLcmlzXCIpO1xuXG4gIHN0YXRpYyBjb21wdXRlciA9IG5ldyBQbGF5ZXIoKTtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBVSS5kcmF3R2FtZWJvYXJkcygpO1xuICAgIFVJLmV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRpbnVlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgc3RhdGljIHR1cm5zID0gW107XG5cbiAgY29uc3RydWN0b3IobmFtZSA9IFwiQ29tcHV0ZXJcIikge1xuICAgIHRoaXMubmFtZSA9IHRoaXMuX2NoZWNrUGxheWVyTmFtZShuYW1lKTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIF9jaGVja1BsYXllck5hbWUobmFtZSkge1xuICAgIGlmICghbmFtZS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5hbWUgY2Fubm90IGJlIGVtcHR5XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgfVxuXG4gIG1hbnVhbEF0dGFjayhvcHBvbmVudCwgcm93LCBjb2x1bW4pIHtcbiAgICBpZiAob3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pKSB7XG4gICAgICBQbGF5ZXIudHVybnMucHVzaCh0aGlzLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGF1dG9tYXRpY0F0dGFjayhvcHBvbmVudCkge1xuICAgIGxldCBhdHRhY2tTdWNjZXNzZnVsID0gZmFsc2U7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF0dGFja1N1Y2Nlc3NmdWwgPSBvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfSB3aGlsZSAoIWF0dGFja1N1Y2Nlc3NmdWwpO1xuXG4gICAgUGxheWVyLnR1cm5zLnB1c2godGhpcy5uYW1lKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGNvbnN0IHNlbGVjdFNoaXBzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1zZWxlY3Qtc2hpcHNcIik7XG5cbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG5cbi8vICAgICBzZWxlY3RTaGlwc0dyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbCk7XG4vLyAgIH1cbi8vIH1cblxuLy8gY29uc3QgYWlCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpYm9hcmQtZ3JpZFwiKTtcbi8vIGNvbnN0IHlvdXJCb2FyZEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnlvdXJib2FyZC1ncmlkXCIpO1xuXG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbi8vICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LnJvdyA9IGkudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcIm15c2hpcHNcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgIC8vICAgc2luZ2xlQ2VsbC50ZXh0Q29udGVudCA9IFwiWFwiOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG4gICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuICAgIC8vICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTsgdGhpcyBzaG91bGQgcmVtYWluIGNvbW1lbnRlZFxuXG4vLyAgICAgY29uc3Qgc2luZ2xlQ2VsbDIgPSBzaW5nbGVDZWxsLmNsb25lTm9kZSh0cnVlKTtcbi8vICAgICBhaUJvYXJkR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbi8vICAgICB5b3VyQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwyKTtcbi8vICAgfVxuLy8gfVxuXG5pbXBvcnQgR2FtZWxvb3AgZnJvbSBcIi4vZ2FtZWxvb3BcIlxuXG5HYW1lbG9vcC5pbml0KCk7Il0sIm5hbWVzIjpbIkdhbWVsb29wIiwiVUkiLCJuZXdHYW1lQnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaG93VG9CdG4iLCJob3dUb1BsYXlNb2RhbCIsImNsb3NlQnRuIiwicGxhY2VTaGlwc01vZGFsIiwic2hpcEluZm9QYXJhIiwiaW5wdXRSb3ciLCJpbnB1dENvbHVtbiIsImhvcml6b250YWxSYWRpbyIsInZlcnRpY2FsUmFkaW8iLCJwbGFjZVNoaXBPclN0YXJ0R2FtZUJ0biIsImVycm9yUGxhY2luZ1NoaXAiLCJwbGFjZWRTaGlwc0NvdW50ZXIiLCJzaGlwc1RvUGxhY2UiLCJyZXN0YXJ0R2FtZUJ0biIsInNlbGVjdFNoaXBzR3JpZCIsImFpQm9hcmRHcmlkIiwieW91ckJvYXJkR3JpZCIsImRyYXdHYW1lYm9hcmRzIiwiaW5uZXJIVE1MIiwiaSIsImoiLCJzaW5nbGVDZWxsIiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJyb3ciLCJ0b1N0cmluZyIsImNvbHVtbiIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwic2luZ2xlQ2VsbDIiLCJjbG9uZU5vZGUiLCJyZW5kZXJBZGRTaGlwR2FtZWJvYXJkIiwicmVuZGVyU2hpcE5hbWVUb1BsYWNlIiwiZ3JpZEVsZW1lbnQiLCJwbGF5ZXIiLCJnYW1lYm9hcmQiLCJncmlkIiwiZmluZCIsImVsIiwidGV4dENvbnRlbnQiLCJzaGlwTmFtZSIsInNoaXBMZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlIiwiZSIsInByZXZlbnREZWZhdWx0IiwicGxhY2VtZW50IiwiY2hlY2tlZCIsImNoZWNrVmFsaWRpdHkiLCJwbGFjZVNoaXAiLCJ2YWx1ZSIsImVycm9yIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwiX2dlbmVyYXRlR3JpZCIsImF0dGFja3MiLCJzaGlwcyIsImFyciIsInB1c2giLCJsZW5ndGgiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJjaGVja0NlbGwiLCJnZXRDZWxsIiwiY2VsbCIsIkVycm9yIiwicGxhY2VTaGlwSW5DZWxsIiwic2hpcCIsImZpZWxkIiwicGxhY2VTaGlwQXV0b21hdGljYWxseSIsIm1heFJldHJpZXMiLCJnZXRSYW5kb21JbmRleCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJldHJpZXMiLCJwbGFjZWQiLCJyZWNlaXZlQXR0YWNrIiwidGFyZ2V0Um93IiwidGFyZ2V0Q29sdW1uIiwiX3JlZiIsInIiLCJjb2wiLCJfcmVmMiIsImhpdCIsImFyZUFsbFNoaXBzU3VuayIsImlzU3VuayIsIlBsYXllciIsImNvbXB1dGVyIiwiaW5pdCIsInR1cm5zIiwibmFtZSIsIl9jaGVja1BsYXllck5hbWUiLCJyZXBsYWNlIiwibWFudWFsQXR0YWNrIiwib3Bwb25lbnQiLCJhdXRvbWF0aWNBdHRhY2siLCJhdHRhY2tTdWNjZXNzZnVsIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=
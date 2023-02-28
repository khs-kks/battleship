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
class UI {
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

class Gameloop {
  static init() {
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].drawGameboards();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].eventListeners();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDO0FBRWpDa0Msc0RBQWEsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIHN0YXRpYyBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5uZXctZ2FtZVwiKTtcbiAgc3RhdGljIGhvd1RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5ob3ctdG9cIik7XG5cbiAgLy8gSE9XLVRPLVBMQVkgTU9EQUxcbiAgc3RhdGljIGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW4uY2xvc2UtYnV0dG9uXCIpO1xuXG4gIC8vIFBMQUNFIFNISVBTIE1PREFMXG4gIHN0YXRpYyBwbGFjZVNoaXBzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuICBzdGF0aWMgc2hpcEluZm9QYXJhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvLXNoaXAtbmFtZS1sZW5ndGhcIik7XG4gIHN0YXRpYyBpbnB1dFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm93XCIpO1xuICBzdGF0aWMgaW5wdXRDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbHVtblwiKTtcbiAgc3RhdGljIGhvcml6b250YWxSYWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9yaXpvbnRhbFwiKTtcbiAgc3RhdGljIHZlcnRpY2FsUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZlcnRpY2FsXCIpO1xuICBzdGF0aWMgcGxhY2VTaGlwT3JTdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXAtYnV0dG9uXCIpO1xuICBzdGF0aWMgZXJyb3JQbGFjaW5nU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3ItcGxhY2luZ1wiKTtcblxuICAvLyBXSU5ORVIgQU5OT1VOQ0VNRU5UIE1PREFMXG4gIHN0YXRpYyByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24ucmVzdGFydC1nYW1lXCIpO1xuXG4gIC8vIEdBTUVCT0FSRFNcbiAgc3RhdGljIHNlbGVjdFNoaXBzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1zZWxlY3Qtc2hpcHNcIik7XG4gIHN0YXRpYyBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuICBzdGF0aWMgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbiAgLy8gRFJBVyBUSEUgR0FNRUJPQVJEU1xuICBzdGF0aWMgZHJhd0dhbWVib2FyZHMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc2luZ2xlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4gICAgICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIHNpbmdsZUNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4gICAgICAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGwtcmVsYXRpdmVcIik7XG5cbiAgICAgICAgVUkuc2VsZWN0U2hpcHNHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmRhdGFzZXQuY29sdW1uID0gai50b1N0cmluZygpO1xuICAgICAgICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJteXNoaXBzXCIpO1xuICAgICAgICAvLyBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgIGNvbnN0IHNpbmdsZUNlbGwyID0gc2luZ2xlQ2VsbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIFVJLmFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuICAgICAgICBVSS55b3VyQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBREQgRVZFTlQgTElTVEVORVJTXG4gIHN0YXRpYyBldmVudExpc3RlbmVycygpIHtcbiAgICBVSS5uZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBVSS5wbGFjZVNoaXBzTW9kYWwuY2xhc3NMaXN0LmFkZChcInBsYWNlLXNoaXBzLW1vZGFsLXZpc2libGVcIik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tIFwiLi9kb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lbG9vcCB7XG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIFVJLmRyYXdHYW1lYm9hcmRzKCk7XG4gICAgICAgIFVJLmV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gY29uc3Qgc2VsZWN0U2hpcHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLXNlbGVjdC1zaGlwc1wiKTtcblxuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4vLyAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuLy8gICAgIGNvbnN0IHNpbmdsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5yb3cgPSBpLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5kYXRhc2V0LmNvbHVtbiA9IGoudG9TdHJpbmcoKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1yZWxhdGl2ZVwiKTtcblxuLy8gICAgIHNlbGVjdFNoaXBzR3JpZC5hcHBlbmRDaGlsZChzaW5nbGVDZWxsKTtcbi8vICAgfVxuLy8gfVxuXG4vLyBjb25zdCBhaUJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlib2FyZC1ncmlkXCIpO1xuLy8gY29uc3QgeW91ckJvYXJkR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueW91cmJvYXJkLWdyaWRcIik7XG5cbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbi8vICAgICBjb25zdCBzaW5nbGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbi8vICAgICBzaW5nbGVDZWxsLmRhdGFzZXQucm93ID0gaS50b1N0cmluZygpO1xuLy8gICAgIHNpbmdsZUNlbGwuZGF0YXNldC5jb2x1bW4gPSBqLnRvU3RyaW5nKCk7XG4vLyAgICAgc2luZ2xlQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXlzaGlwc1wiKTtcbi8vICAgICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgLy8gICBzaW5nbGVDZWxsLnRleHRDb250ZW50ID0gXCJYXCI7IHRoaXMgc2hvdWxkIHJlbWFpbiBjb21tZW50ZWRcbiAgICAvLyAgIHNpbmdsZUNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG4gICAgLy8gICBzaW5nbGVDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsLXJlbGF0aXZlXCIpOyB0aGlzIHNob3VsZCByZW1haW4gY29tbWVudGVkXG5cbi8vICAgICBjb25zdCBzaW5nbGVDZWxsMiA9IHNpbmdsZUNlbGwuY2xvbmVOb2RlKHRydWUpO1xuLy8gICAgIGFpQm9hcmRHcmlkLmFwcGVuZENoaWxkKHNpbmdsZUNlbGwpO1xuLy8gICAgIHlvdXJCb2FyZEdyaWQuYXBwZW5kQ2hpbGQoc2luZ2xlQ2VsbDIpO1xuLy8gICB9XG4vLyB9XG5cbmltcG9ydCBHYW1lbG9vcCBmcm9tIFwiLi9nYW1lbG9vcFwiXG5cbkdhbWVsb29wLmluaXQoKTsiXSwibmFtZXMiOlsiVUkiLCJuZXdHYW1lQnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaG93VG9CdG4iLCJjbG9zZUJ0biIsInBsYWNlU2hpcHNNb2RhbCIsInNoaXBJbmZvUGFyYSIsImlucHV0Um93IiwiaW5wdXRDb2x1bW4iLCJob3Jpem9udGFsUmFkaW8iLCJ2ZXJ0aWNhbFJhZGlvIiwicGxhY2VTaGlwT3JTdGFydEdhbWVCdG4iLCJlcnJvclBsYWNpbmdTaGlwIiwicmVzdGFydEdhbWVCdG4iLCJzZWxlY3RTaGlwc0dyaWQiLCJhaUJvYXJkR3JpZCIsInlvdXJCb2FyZEdyaWQiLCJkcmF3R2FtZWJvYXJkcyIsImkiLCJqIiwic2luZ2xlQ2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJkYXRhc2V0Iiwicm93IiwidG9TdHJpbmciLCJjb2x1bW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInNpbmdsZUNlbGwyIiwiY2xvbmVOb2RlIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiR2FtZWxvb3AiLCJpbml0Il0sInNvdXJjZVJvb3QiOiIifQ==
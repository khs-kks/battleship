import Ship from "./ship";
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Gameboard {
  constructor() {
    this.grid = this._generateGrid();
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
    const ship = new Ship(length);
    // for (let j = 0; j < length; j += 1) {
    //   for (let i = 0; i < this.grid.length; i += 1) {
    //     if (this.grid[i][0] === row && this.grid[i][1] === column) {
    //       this.grid[i + j] = [row, column + j, ship];
    //     }
    //   }
    // }

    // Check if the ship placement is valid
    for (let j = 0; j < length; j += 1) {
      const cell = this.grid.find(
        (field) => field[0] === row && field[1] === column + j
      );
      if (!cell || cell[2]) {
        throw new Error("Invalid ship placement");
      }
    }

    // Place the ship in the cells
    for (let j = 0; j < length; j += 1) {
      const cell = this.grid.find(
        (field) => field[0] === row && field[1] === column + j
      );
      cell[2] = ship;
    }
  }
}

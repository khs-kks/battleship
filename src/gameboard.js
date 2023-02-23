import Ship from "./ship";
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Gameboard {
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
    // Check if the ship placement is valid
    for (let j = 0; j < length; j += 1) {
      const cell = this.grid.find(
        (field) => field[0] === row && field[1] === column + j
      );
      if (!cell || cell[2]) {
        throw new Error("Invalid ship placement");
      }
    }

    const ship = new Ship(length);
    this.ships.push(ship);

    // Place the ship in the cells
    for (let j = 0; j < length; j += 1) {
      const cell = this.grid.find(
        (field) => field[0] === row && field[1] === column + j
      );
      cell[2] = ship;
    }
  }

  receiveAttack(row, column) {
    const [targetRow, targetColumn] = [row, column];

    if (
      targetRow < 0 ||
      targetRow >= 10 ||
      targetColumn < 0 ||
      targetColumn >= 10
    ) {
      throw new Error("Out of bounds");
    }

    const cell = this.grid.find(
      ([r, col]) => r === targetRow && col === targetColumn
    );

    if (!cell) {
      throw new Error("Cell not found");
    }

    if (
      this.attacks.find(([r, col]) => r === targetRow && col === targetColumn)
    ) {
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

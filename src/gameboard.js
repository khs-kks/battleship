/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Ship from "./ship";

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

  placeShip(length, row, column, placement = "horizontal") {
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

    const ship = new Ship(length);

    if (placement === "horizontal") {
      for (let j = 0; j < length; j += 1) {
        checkCell(j, (j) =>
          this.grid.find((field) => field[0] === row && field[1] === column + j)
        );
        placeShipInCell(
          j,
          (j) =>
            this.grid.find(
              (field) => field[0] === row && field[1] === column + j
            ),
          ship
        );
      }
    } else if (placement === "vertical") {
      for (let j = 0; j < length; j += 1) {
        checkCell(j, (j) =>
          this.grid.find((field) => field[0] === row + j && field[1] === column)
        );
        placeShipInCell(
          j,
          (j) =>
            this.grid.find(
              (field) => field[0] === row + j && field[1] === column
            ),
          ship
        );
      }
    }
    this.ships.push(ship);
  }

  placeShipAutomatically(length) {
    const getRandomIndex = (max) => Math.floor(Math.random() * max);

    const row = getRandomIndex(this.grid.length);
    const column = getRandomIndex(this.grid.length);
    const placement = Math.random() < 0.5 ? "horizontal" : "vertical";

    try {
      this.placeShip(length, row, column, placement);
    } catch (e) {
      // If the random placement is invalid, try again recursively
      this.placeShipAutomatically(length);
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

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

  placeShip(length, row, column, placement = "horizontal") {
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

        if (
          currentCoordinate[0] === newRow &&
          currentCoordinate[1] === newColumn &&
          currentCoordinate[2] !== null
        ) {
          throw new Error(
            "Ship collision detected. Cannot place ship on top of another ship."
          );
        }
      }

      shipCoordinates.push([newRow, newColumn, null]);
    }

    const ship = new Ship(length);
    this.ships.push(ship);

    for (let k = 0; k < shipCoordinates.length; k += 1) {
      const currentCoordinate = shipCoordinates[k];
      const index = this.grid.findIndex(
        (element) =>
          element[0] === currentCoordinate[0] &&
          element[1] === currentCoordinate[1]
      );

      if (index !== -1) {
        this.grid[index][2] = ship;
      }
    }
  }

  placeShipAutomatically(length, maxRetries = 5000) {
    const getRandomIndex = (max) => Math.floor(Math.random() * max);

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

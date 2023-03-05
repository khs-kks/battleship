/* eslint-disable no-continue */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Gameboard from "./gameboard";

export default class Player {
  static turns = [];

  constructor(name = "Computer") {
    this.name = this._checkPlayerName(name);
    this.gameboard = new Gameboard();
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

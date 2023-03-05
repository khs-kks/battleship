import UI from "./dom";

import Gameboard from "./gameboard";

import Player from "./player";

export default class Gameloop {
  static player = new Player("Kris");

  static computer = new Player();

  static winner = null;

  static init() {
    // UI.drawGameboards();
    UI.eventListeners();
  }

  static checkWinner() {
    if (Gameloop.player.gameboard.areAllShipsSunk()) {
      Gameloop.winner = Gameloop.computer;
    } else if (Gameloop.computer.gameboard.areAllShipsSunk()) {
      Gameloop.winner = Gameloop.player;
    }
  }
}

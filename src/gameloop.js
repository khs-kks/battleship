import UI from "./dom";

import Gameboard from "./gameboard";

import Player from "./player";

export default class Gameloop {
  static player = new Player("Kris");

  static computer = new Player();

  static init() {
    UI.drawGameboards();
    UI.eventListeners();
  }
}

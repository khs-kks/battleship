/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Player {
  constructor(name = "Computer") {
    this.name = this._checkPlayerName(name);
  }

  _checkPlayerName(name) {
    if (!name.length) {
      throw new Error("Name cannot be empty");
    }

    return name.replace(/\s/g, "");
  }
}

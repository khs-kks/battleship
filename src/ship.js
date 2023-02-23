/* eslint-disable no-underscore-dangle */
// Carrier 	5
// Battleship 	4
// Destroyer 	3
// Submarine 	3
// Patrol Boat 	2
export default class Ship {
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

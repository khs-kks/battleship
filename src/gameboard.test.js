import Gameboard from "./gameboard";
import Ship from "./ship";

test("placeShip() method", () => {
  const player1 = new Gameboard();
  player1.placeShip(3, 3, 5);
  expect(player1.grid).not.toContainEqual([3, 5, null]);
  expect(player1.grid).not.toContainEqual([3, 6, null]);
  expect(player1.grid).not.toContainEqual([3, 7, null]);
  expect(player1.grid).toContainEqual([3, 8, null]);
});

test("placeShip out of grid", () => {
  const player1 = new Gameboard();
  expect(() => player1.placeShip(3, 5, 8)).toThrow(Error);
});

test("Place ship on already existing ship", () => {
  const player1 = new Gameboard();
  player1.placeShip(5, 4, 3);

  expect(() => player1.placeShip(5, 4, 0)).toThrow(Error);
});

test("receiveAttack method", () => {
  const player1 = new Gameboard();
  player1.placeShip(3, 3, 5);

  expect(player1.receiveAttack(3, 6)).toBeTruthy();
  expect(player1.receiveAttack(2, 7)).toBeFalsy();
  expect(() => player1.receiveAttack(-1, 9)).toThrow(Error);
});

test("Check if Gameboard object is reporting wether or not all ships have been sunk", () => {
  const player1 = new Gameboard();
  player1.placeShip(3, 3, 5);
  player1.placeShip(2, 2, 3);

  player1.receiveAttack(3, 5);
  player1.receiveAttack(3, 6);
  player1.receiveAttack(3, 7);

  expect(player1.areAllShipsSunk()).toBeFalsy();

  player1.receiveAttack(2, 3);
  player1.receiveAttack(2, 4);

  expect(player1.areAllShipsSunk()).toBeTruthy();
});

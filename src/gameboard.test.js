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

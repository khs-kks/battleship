import Gameboard from "./gameboard";
import Ship from "./ship";

test("placeShip method for horizontal placement", () => {
  const player1 = new Gameboard();
  player1.placeShip(3, 3, 5, "horizontal");
  expect(player1.grid).not.toContainEqual([3, 5, null]);
  expect(player1.grid).not.toContainEqual([3, 6, null]);
  expect(player1.grid).not.toContainEqual([3, 7, null]);
  expect(player1.grid).toContainEqual([3, 8, null]);
});

test("placeShip method for vertical placement", () => {
  const player1 = new Gameboard();
  player1.placeShip(3, 3, 5, "vertical");
  player1.placeShip(5, 0, 0, "vertical");
  expect(player1.grid).not.toContainEqual([3, 5, null]);
  expect(player1.grid).not.toContainEqual([4, 5, null]);
  expect(player1.grid).not.toContainEqual([5, 5, null]);
  expect(player1.grid).toContainEqual([2, 5, null]);
  expect(player1.grid).toContainEqual([6, 5, null]);

  expect(player1.grid).not.toContainEqual([0, 0, null]);
  expect(player1.grid).not.toContainEqual([4, 0, null]);
});

test("Place ship on already existing ship", () => {
  const player1 = new Gameboard();
  player1.placeShip(5, 4, 3);

  expect(() => player1.placeShip(5, 4, 0)).toThrow(Error);
});

test("placeShip out of grid", () => {
  const player1 = new Gameboard();
  expect(() => player1.placeShip(3, 5, 8)).toThrow(Error);
});

describe("Gameboard", () => {
  describe("placeShipAutomatically", () => {
    test("should place a ship of length 3", () => {
      const obj = new Gameboard();
      obj.placeShipAutomatically(3);

      // Assert that the ship was placed correctly
      expect(obj.ships.length).toBe(1);
      expect(obj.ships[0].length).toBe(3);
    });

    test("should handle invalid placements gracefully", () => {
      const obj = new Gameboard();

      // Mock the placeShip method to always throw an error
      obj.placeShip = jest.fn().mockImplementation(() => {
        throw new Error("Invalid placement");
      });

      // Call placeShipAutomatically with a length of 2 and a maximum of 3 retries
      expect(() => obj.placeShipAutomatically(2, 3)).toThrowError(
        "Could not place ship after maximum retries"
      );
      expect(obj.placeShip).toHaveBeenCalledTimes(3);
    });
  });
});

test("receiveAttack method", () => {
  const player1 = new Gameboard();
  player1.placeShip(3, 3, 5);
  player1.placeShip(5, 0, 0, "vertical");

  expect(player1.receiveAttack(3, 6)).toBeTruthy();
  expect(player1.receiveAttack(2, 7)).toBeFalsy();
  expect(() => player1.receiveAttack(-1, 9)).toThrow(Error);
  expect(() => player1.receiveAttack(2, 7)).toThrow(Error);
  expect(player1.receiveAttack(0, 0)).toBeTruthy();
  expect(player1.receiveAttack(4, 0)).toBeTruthy();
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

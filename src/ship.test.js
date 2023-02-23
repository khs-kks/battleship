import Ship from "./ship";

test("hit() method", () => {
  const ship = new Ship(5);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(5);
});

test("isSunk() method should check if a Ship is dead", () => {
  const ship = new Ship(5);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

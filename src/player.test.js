import Player from "./player";

// beforeEach(() => {
//   const player = new Player("");
// });

test("default name value", () => {
  const comp = new Player();
  expect(comp.name).toMatch("Computer");
});

test("if name is empty", () => {
  expect(() => new Player("")).toThrow("Name cannot be empty");
});

test("if name has any whitespace", () => {
  const player = new Player(" Uaua Uaua Ok  ");
  const player2 = new Player("AllGood");

  expect(player.name).not.toMatch(/\s/);
  expect(player2.name).not.toMatch(/\s/);
});

test("Manual attack method", () => {
  const player = new Player("Kris");
  const comp = new Player();

  comp.gameboard.placeShip(3, 3, 5, "vertical");
  player.gameboard.placeShip(5, 0, 0, "vertical");

  expect(Player.turns.length).toBe(0);

  player.manualAttack(comp, 4, 5);

  expect(Player.turns.length).toBeGreaterThan(0);

  player.manualAttack(comp, 2, 5);

  expect(Player.turns.length).toBe(1);

  expect(Player.turns).toContain("Kris");

  comp.manualAttack(player, 4, 0);

  expect(Player.turns).toContain("Computer");
});

test("Automatic attack method", () => {
  Player.turns.length = 0;
  const player = new Player("Kris");
  const comp = new Player();

  comp.gameboard.placeShip(3, 3, 5, "vertical");
  player.gameboard.placeShip(5, 0, 0, "vertical");

  expect(Player.turns.length).toBe(0);

  player.automaticAttack(comp);

  expect(Player.turns.length).toBeGreaterThan(0);

  player.automaticAttack(comp);

  expect(Player.turns.length).toBe(2);

  expect(Player.turns).toContain("Kris");

  comp.automaticAttack(player);

  expect(Player.turns).toContain("Computer");
});

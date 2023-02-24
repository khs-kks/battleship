import Player from "./player";

// beforeEach(() => {
//   const player = new Player("");
// });

test("default name value", () => {
    const comp = new Player();
    expect(comp.name).toMatch("Computer");
})

test("if name is empty", () => {
    expect(() => new Player("")).toThrow('Name cannot be empty');
});

test("if name has any whitespace", () => {
    const player = new Player(" Uaua Uaua Ok  ");
    const player2 = new Player("AllGood");
    
    expect(player.name).not.toMatch(/\s/);
    expect(player2.name).not.toMatch(/\s/);
})


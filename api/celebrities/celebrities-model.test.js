const Celebrities = require("./celebrities-model");
const db = require("../../data/db-config");

test("it is the correct env for the tests", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

describe("Celebrity db access functions", () => {
  describe("Celebrities.getAll", () => {
    it("resolves to all celebrities in the celebrities table", async () => {
      const celebrities = await Celebrities.getAll();
      expect(celebrities).toHaveLength(5);
    });
    it("resolves to the correct celebrities shape", async () => {
      const celebrities = await Celebrities.getAll();
      expect(celebrities[0]).toMatchObject({
        celebrity_name: "Ariana Grande",
        celebrity_rating: 10,
      });
    });
  });
  describe("Celebrities.insert", () => {
    it("adds a new celebrity to the table", async () => {
      await Celebrities.insert({
        celebrity_name: "John Legend",
        celebrity_rating: 8,
      });
      const rows = await db("celebrities");
      expect(rows).toHaveLength(6);
    });
    it("resolves to the newly inserted hobbit", async () => {
      const newCelebrity = await Celebrities.insert({
        celebrity_name: "John Legend",
        celebrity_rating: 8,
      });
      expect(newCelebrity).toMatchObject({
        celebrity_id: 6,
        celebrity_name: "John Legend",
        celebrity_rating: 8,
      });
    });
  });
  describe("Celebrities.insert", () => {
    it("removes a celebrity from the table", async () => {
      await Celebrities.remove(5);
      const rows = await db("celebrities");
      expect(rows).toHaveLength(4);
    });
    it("removes the correct celebrity from the table", async () => {
      await Celebrities.remove(5);
      const rows = await db("celebrities");
      expect(rows).not.toContainEqual({
        celebrity_id: 5,
        celebrity_name: "Drake",
        celebrity_rating: 8,
      });
    });
  });
});

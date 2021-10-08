const request = require("supertest");
const db = require("../data/db-config");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("[GET] /api/celebrities", () => {
  it("Should return 200 OK status", async () => {
    const res = await request(server).get("/api/celebrities");
    expect(res.status).toBe(200);
  });
  it("should return JSON", async () => {
    const res = await request(server).get("/api/celebrities");
    expect(res.type).toBe("application/json");
  });
  it("should return a list of celebrities", async () => {
    const res = await request(server).get("/api/celebrities");
    expect(res.body).toHaveLength(5);
  });
});

describe("[GET] /api/celebrities/:id", () => {
  it("Should return 200 OK status", async () => {
    const res = await request(server).get("/api/celebrities/2");
    expect(res.status).toBe(200);
  });
  it("should return the celebrity with matching id", async () => {
    const res = await request(server).get("/api/celebrities/2");
    expect(res.body).toMatchObject({
      celebrity_id: 2,
      celebrity_name: "Kanye West",
      celebrity_rating: 2,
    });
  });

  describe("[POST] /api/celebrities", () => {
    it("should return 201 created status if created successfully", async () => {
      const res = await request(server).post("/api/celebrities").send({
        celebrity_id: 6,
        celebrity_name: "John Legend",
        celebrity_rating: 8,
      });
      expect(res.status).toBe(201);
    });
    it("should return 422 if missing name", async () => {
      const res = await request(server)
        .post("/api/celebrities")
        .send({ celebrity_rating: 8 });
      expect(res.status).toBe(422);
    });
    it("responds with the newly created celebrity", async () => {
      const res = await request(server).post("/api/celebrities").send({
        celebrity_id: 6,
        celebrity_name: "John Legend",
        celebrity_rating: 8,
      });
      expect(res.body).toMatchObject({
        celebrity_id: 6,
        celebrity_name: "John Legend",
        celebrity_rating: 8,
      });
    });
  });

  describe("[DELETE] /api/celebrities/:id", () => {
    it("responds with status 200 on successful deletion", async () => {
      const res = await request(server).delete("/api/celebrities/5");
      expect(res.status).toBe(200);
    });
    it("deletes a celebrity from the table", async () => {
      await request(server).delete("/api/celebrities/5");
      const rows = await db("celebrities");
      expect(rows).toHaveLength(4);
    });
    it("deletes the celebrity with inputted id from table", async () => {
      await request(server).delete("/api/celebrities/5");
      const rows = await db("celebrities");
      expect(rows).not.toContainEqual({
        celebrity_id: 5,
        celebrity_name: "Drake",
        celebrity_rating: 8,
      });
    });
  });
});

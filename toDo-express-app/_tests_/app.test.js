const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");
const { convertTimestampToDate } = require("../db/seeds/utils.js");

describe("GET/api/items", () => {
  test("status:200 - responds with an array of items, with the correct properties", () => {
    return request(app)
      .get("/api/items")
      .expect(200)
      .then(({ body }) => {
        const items = body;
        expect(items).toBeInstanceOf(Array);
        expect(items).toHaveLength(6);
        items.forEach((item) => {
          expect(item).toMatchObject({
            todo_id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            status: expect.any(String),
          });
        });
      });
  });

  describe("GET/api/items/todo_id", () => {
    test("status:200 - responds with todo item ", () => {
      return request(app)
        .get("/api/items/1")
        .expect(200)
        .then(({ body }) => {
          const item = body;

          expect(item).toBeInstanceOf(Object);
          expect(item).toMatchObject({
            todo_id: 1,
            name: "Organise items",
            description:
              " Organise lots of things 1. first things, 2nd thing ....",
            status: "to do",
          });
        });
    });
  });

  fdescribe("POST /api/item_add/:item_id test ", () => {
    test("201, post request, adds a todo item and returns the todo _item", () => {
      const inputItem = {
        name: "Write a todo lst",
        description: "Write a huge todo list...",
        status: "to do",
      };
      return request(app)
        .post("/api/item_add")
        .send(inputItem)
        .expect(201)
        .then(({ body }) => {
          const { item } = body;
          expect(item).toBeInstanceOf(Object);
          expect(item).toMatchObject({
            created_at: expect.any(String),
            description: "Write a huge todo list...",
            name: "Write a todo lst",
            status: "to do",
            todo_id: 7,
          });
        });
    });
    test("status 400 - responds with an error message 400 when you try to send an empty object", () => {
    
      const update ={};
      console.log(update)
          return request(app)
          .patch("/api/item_add")
          .send(update)
          .expect(400)
      .then(({ body }) => {
       expect(body.msg).toBe("invalid input");
        })
  });
  });

  describe(". DELETE /api/todo/:todo_id", () => {
    test("Status 204 ,deletes todo and returns 204 status", () => {
      return request(app).delete("/api/todo/5").expect(204);
    });
  });

  test("Status 404  not found ,when toddo id doesnt exist", () => {
    return request(app).delete("/api/todo/12").expect(404);
  });
});


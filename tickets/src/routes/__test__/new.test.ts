import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/signin-helper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const cookie = signin();
  const response = await request(app).post("/api/tickets").send({}).expect(401);
});

it("can only be accessed if the user is signed in", async () => {
  const cookie = signin();
  console.log(cookie);
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {});

it("returns an error if an invalid price is provided", async () => {});

it("creates a ticket with valid inputs", async () => {});

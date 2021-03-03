import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

export function signin(): string[] {
  const payload = {
    id: "238029384",
    email: "test@test.com",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return ["express:sess=" + base64];
}

//export { signin };

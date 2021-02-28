import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

export function signin(): string[] {
  const payload: { email: string; password: string } = {
    email: "test@test.com",
    password: "password",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return ["express:sess=" + base64];
}

//export { signin };

import request from "supertest";
import { app } from "../app";

export async function signin() {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  console.log(cookie);

  return cookie;
}

//export { signin };

import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUser, errorHandler } from "@ticket-learning/common";
import { NotFoundError } from "@ticket-learning/common";
import { createTicketRouter } from "../src/routes/new";
import { showTicketRouter } from "../src/routes/show";
import { indexTicketRouter } from "../src/routes/index";
import { updateTicketRouter } from "../src/routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

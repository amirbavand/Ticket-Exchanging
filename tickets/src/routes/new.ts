import express, { Request, Response } from "express";
import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@ticket-learning/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),

    body("price")
      .isFloat({ gt: 0 })
      .withMessage("price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    console.log(req.currentUser!.id);

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    console.log(ticket);
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };

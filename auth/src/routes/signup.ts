import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@ticket-learning/common";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateRequest } from "@ticket-learning/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("email is wrong"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4 and 20 character"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in Use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userjwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userjwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

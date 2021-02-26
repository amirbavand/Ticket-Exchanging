import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };

import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

export default app.post("/", async (req, res) => {
  // Validation
  const body = res.req.body;
  if (!body.email || !body.name || !body.password) {
    res.json("Fields are empty...");
    return;
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.username,
      password: body.password,
    }
  }).catch((err) => {
    res.json(err);
  });
  res.json(user);
});
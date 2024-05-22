import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

export default app.post("/", async (req, res) => {
  // Validation
  const body = res.req.body;
  if (!body.email) {
    res.json("Email is empty...");
    return;
  }
  await prisma.user.findUnique({
    where: {
      email: body.email,
    }
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    console.log(err);
    res.json("Unknown error occurred");
  });
});
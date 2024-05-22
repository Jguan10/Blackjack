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
  await prisma.user.update({
    where: {
      email: body.email,
    },
    data: {
      roundsPlayed: {
        increment: 1
      }
    }
  }).then(() => {
    res.json("Success!");
  }).catch((err) => {
    console.log(err);
    res.json("Unknown error occurred");
  });
});
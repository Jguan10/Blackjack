import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

export default app.post("/", async (req, res) => {
  // Validation
  const body = res.req.body;
  if (!body.email || !body.password) {
    res.json("There are empty fields...");
    return;
  }
  await prisma.user.findUnique({
    where: {
      email: body.email,
    }
  }).then((user) => {

    if(!user)
      res.json("Invalid email!");
    else if (user.password !== body.password)
      res.json("Invalid password!");
    else
      res.json("Logged In!");
  }).catch((err) => {
    console.log(err);
    res.json("Unknown error occurred");
  });
});
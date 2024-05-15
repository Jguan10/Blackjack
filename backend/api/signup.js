import express from "express";
import { PrismaClient } from "@prisma/client";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/binary";

const app = express();
const prisma = new PrismaClient();

export default app.post("/", async (req, res) => {
  // Validation
  const body = res.req.body;
  if (!body.email || !body.username || !body.password) {
    res.json("There are empty fields...");
    return;
  }
  await prisma.user.create({
    data: {
      email: body.email,
      name: body.username,
      password: body.password,
    }
  }).then((user) => {
    res.json("User created!");
  }).catch((err) => {
    console.log(err);
    if (err.code === "P2002") {
      // Email Already Exists
      res.json("Email already exists");
    } else {
      res.json("Unknown error occurred");
    }
  });
});
import express from "express";
import { createServer } from "http";
import cors from "cors";
import signup from "./api/signup.js";
import login from "./api/login.js";
import userData from "./api/userData.js";
import addJoin from "./api/addJoin.js";
import addRound from "./api/addRound.js";
import addWin from "./api/addWin.js";

const app = express();

app.use(cors());
app.use(express.json());

// API calls

app.use("/signup", signup);
app.use("/login", login);
app.use("/userData", userData);
app.use("/addJoin", addJoin);
app.use("/addRound", addRound);
app.use("/addWin", addWin);

const httpServer = createServer(app);

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({data: "Hi this works"}));
});

httpServer.listen(3000);

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hi this works");
}) 

app.listen(3000, () => {
    console.log("Hello World");
}); 

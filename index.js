import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let usuarios = [];
let tweets =[];

app.post("/sign-up", (req, res) => {
    const usuario = req.body;
    usuarios.push(usuario);
    res.status(200).send("OK");
});

app.post("/tweets", (req,res) => {
    const tweet = req.body;
    tweets.unshift(tweet);
    res.status(200).send("OK");
})

app.get("/tweets", (req, res) => {
    res.send(tweets.slice(0, 10));
})

app.listen(5000)
import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let usuarios = [];
let tweets =[];

function verificaVazio(dado){
    if(dado === undefined || dado === "" || dado === null){
        return false
    }
    else{
        return true
    }
}

app.post("/sign-up", (req, res) => {
    const usuario = req.body;
    
    if(verificaVazio(usuario.username) === false || verificaVazio(usuario.avatar) === false){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    else{
        usuarios.push(usuario);
        res.status(201).send("Created");
    }
});

app.post("/tweets", (req,res) => {
    const tweet = {
        username: req.headers.user,
        tweet: req.body.tweet
    }

    if(verificaVazio(tweet.username) === false || verificaVazio(tweet.tweet) === false){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    else{
        tweets.unshift(tweet);
        res.status(201).send("Created");
    }
})

app.get("/tweets", (req, res) => {
    res.send(tweets.slice(0, 10));
})

app.get('/tweets/:username', (req, res) => {
    const usuario = req.params.username;

    const tweetsusuario = tweets.filter(elemento => elemento.username === usuario);

    res.send(tweetsusuario);
})

app.listen(5000);
import express from 'express';
import bodyParser from 'body-parser';
/*variables*/
const app = express();
let tentativesUser = [];
const port = 3001;
let numberGot = 0;

/*code*/
function randomNumberGot (difficult){
    let x = 0;
    if (difficult === "easy"){
        x = Math.floor(Math.random() * 10) + 1;
        return x;
    }

    else if (difficult === "medium"){
        x = Math.floor(Math.random() * 50) + 1;
        return x;
    }

    else{
        x = Math.floor(Math.random() * 100) + 1;
        return x;
    }
}

tentativesUser.splice(0, tentativesUser.length);
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    tentativesUser.splice(0, tentativesUser.length);
    res.render("levels.ejs");
});

app.post("/game1", (req,res) =>{
    tentativesUser.splice(0, tentativesUser.length);
    numberGot = randomNumberGot("easy");
    console.log(`This is a number: ${numberGot}`);
    res.render("structure.ejs", {
        level: "easy (0 - 10)",
        numberGenerated: numberGot
    });
});

app.post("/game2", (req,res) =>{
    tentativesUser.splice(0, tentativesUser.length);
    numberGot = randomNumberGot("medium");
    console.log(`This is a number: ${numberGot}`); 
    res.render("structure.ejs", {
        level: "medium (0 - 50)",
        numberGenerated: numberGot
    });
});

app.post("/game3", (req,res) =>{
    tentativesUser.splice(0, tentativesUser.length);
    numberGot = randomNumberGot("hard");
    console.log(`This is a number: ${numberGot}`); 
    res.render("structure.ejs", {
        level: "hard (0 - 100)",
        numberGenerated: numberGot
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.post("/submit", (req, res) =>{
    console.log(req.body['numberInserted']);
    console.log(numberGot);
    tentativesUser.push(req.body['numberInserted']);
    if((req.body['numberInserted']) == numberGot){
        res.render("structure.ejs", {
            level: "Congratulations! You did it",
            numberGenerated: numberGot
        });
    }
    else{
        res.render("structure.ejs", {
            level: "Try again",
            numberGenerated: numberGot,
            tentatives: tentativesUser
        });
    }
});

app.listen(port, () => {
    console.log(`Listen to port ${port}`);
});
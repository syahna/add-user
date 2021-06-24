const express = require("express");
const app = express();
const mysql = require ('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'userdetail',
});

app.post('/create', (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    db.query("INSERT INTO user (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
     (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    });
});

app.get('/getuser', (req,res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("It's work");
});
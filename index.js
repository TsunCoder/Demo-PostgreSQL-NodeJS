const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { Client } = require('pg');

const client = new Client({
    user: 'thienson',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'recipeBookDB'
})

client.connect().then(() => {
    console.log('Connected Database');
});
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './views')));
app.use(express.static(path.join(__dirname, './public/css')));
app.use('/public/js', express.static(path.join(__dirname, './public/js')));

app.get('/', function (req, res) {
    client.query("SELECT * FROM recipes", (err, data) => {
        res.render('index', { title: "Recipes", data: data.rows })
        client.end;
    })
})

app.post('/add', (req, res) => {
    client.query("INSERT INTO recipes(name, ingredients, direction) VALUES ($1, $2, $3)", [req.body.name, req.body.ingredients, req.body.directions]);
    client.end;
    res.redirect('/');
})

app.post('/edit', (req, res) => {
    client.query("UPDATE recipes SET name=$1, ingredients=$2, direction=$3 WHERE id = $4", [req.body.name, req.body.ingredients, req.body.directions, req.body.id]);
    client.end;
    res.redirect('/');
})

app.post('/delete/:id', (req, res) => {
    client.query("DELETE FROM recipes WHERE id = $1", [req.params.id]).then(() => {
        res.send(200);
    });
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})
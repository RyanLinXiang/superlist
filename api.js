// begin api
const express = require('express');
const mariadb = require('mariadb');
const bodyParser =  require('body-parser');

let connection_id = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'kleinanzeigen'
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// routing for index.html
app.get('/', (req, res) => {
    const path = require('path');
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// routing api show all items
app.get('/show', (req, res) => {
    let apiData = [];
    apiData.push([]);
    apiData.push([]);
    
connection_id.then (async kleinanzeigen => {

    await kleinanzeigen.query(
            'SELECT DISTINCT location FROM anzeigen LIMIT 20',
        )
        .then(function(currentValue) {
            currentValue.forEach(element => {
                apiData[0].push(element.location);
            });
        });

    await kleinanzeigen.query(
            'SELECT location, count(*) nums FROM anzeigen GROUP BY location ORDER BY nums DESC LIMIT 5',
        )
        .then(function(currentValue) {
            currentValue.forEach(element => {
                apiData[1].push(element.location);
            });
        });

    await kleinanzeigen.query(
            'SELECT id, title, description FROM anzeigen LIMIT 20',
        )
        .then(function(currentValue) {
            currentValue.forEach(element => {
                apiData.push(element);
            });
        });

    res.json(apiData);
});
});

// routing api show id
app.get('/show/:id', (req, res) => {
    connection_id.then(connection => {
        connection.query(
            'SELECT id, title, description, creation_date FROM anzeigen WHERE id = ?',
            req.params.id
        )
        .then(function(currentValue) {res.json(currentValue[0])});
    });
})

// routing for api search keyword in title
app.get('/search/:keyword', (req, res) => {
    connection_id.then(connection => {
        connection.query(
            'SELECT id, title, description FROM anzeigen WHERE (LOWER (title) LIKE LOWER (?) OR LOWER (title) LIKE LOWER (?) OR LOWER (title) LIKE LOWER (?)) AND creation_date > DATE_SUB(NOW(), INTERVAL 2 WEEK) LIMIT 20',
            [req.params.keyword + '%', '%' + req.params.keyword + '%', '%' + req.params.keyword]
        )
        .then(function(currentValue) {res.json(currentValue)});
    });
})

// routing for api search city
app.get('/search/loc/:city', (req, res) => {
    connection_id.then(connection => {
        connection.query(
            'SELECT id, title, description, location, creation_date FROM anzeigen WHERE location = ? AND creation_date > DATE_SUB(NOW(), INTERVAL 2 WEEK) LIMIT 20',
            req.params.city
        )
        .then(function(currentValue) {res.json(currentValue)});
    });
})

// routing api add new item
app.post('/add', (req, res) => {
    const newItem = {
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
        location: req.body.loc,
        price: req.body.price,
        vb: req.body.vb,
        email: req.body.email
    };

    res.json('new item added');

    connection_id.then(connection => {    
        connection.query(
            'INSERT INTO anzeigen (title, description, name, location, price, vb, email, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
            [newItem.title, newItem.description, newItem.name, newItem.location, newItem.price, newItem.vb, newItem.email]
        )
        .then(console.log)
        .catch(console.log);
    });
})

app.listen(port, () => console.log(`Server is running... Port: ${port}`));
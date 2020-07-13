// using node.js and express.js
// initializing express.js and mariadb
const express = require("express");
const mariadb = require("mariadb");
const bodyParser = require("body-parser");

// mariadb connector
let connection_id = mariadb.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "superlist",
});

// initialize constant app with express.js, set server port to 3000
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// routing for index.html
app.get("/", (req, res) => {
  const path = require("path");
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// routing show all entries
app.get("/show", (req, res) => {
  let apiData = [];
  apiData.push([]);
  apiData.push([]);

  // asynchronous function
  connection_id.then(async (superlist) => {
    // query select all location names once from database
    await superlist
      .query(
        "SELECT DISTINCT location FROM ads WHERE creation_date > DATE_SUB(NOW(), INTERVAL 2 WEEK)"
      )
      // push data in apiData array at index 0
      .then((currentValue) => {
        currentValue.forEach((element) => {
          apiData[0].push(element.location);
        });
      });

    // query select top 5 locations in descending order
    await superlist
      .query(
        "SELECT location, count(*) nums FROM ads WHERE creation_date > DATE_SUB(NOW(), INTERVAL 2 WEEK) GROUP BY location ORDER BY nums DESC LIMIT 5"
      )
      // push data in apiData at index 1
      .then((currentValue) => {
        currentValue.forEach((element) => {
          apiData[1].push(element.location);
        });
      });

    // query select 20 entries in descending order not older than 2 weeks
    await superlist
      .query(
        "SELECT id, title, description FROM ads WHERE creation_date > DATE_SUB(NOW(), INTERVAL 2 WEEK) ORDER BY creation_date DESC LIMIT 20"
      )
      // push date in apiData at index 2
      .then((currentValue) => {
        currentValue.forEach((element) => {
          apiData.push(element);
        });
      });

    res.json(apiData);
  });
});

// routing show id
app.get("/show/:id", (req, res) => {
  connection_id.then((connection) => {
    connection
      .query(
        "SELECT *, DATEDIFF(CURRENT_TIMESTAMP , creation_date) AS dayspast FROM ads WHERE id = ?",
        req.params.id
      )
      .then((currentValue) => res.json(currentValue[0]));
  });
});

// routing search keyword in title
app.get("/search/:keyword", (req, res) => {
  connection_id.then((connection) => {
    connection
      .query(
        "SELECT id, title, description FROM ads WHERE (LOWER (title) LIKE LOWER (?) OR LOWER (title) LIKE LOWER (?) OR LOWER (title) LIKE LOWER (?)) AND creation_date > DATE_SUB(NOW(), INTERVAL 2 WEEK) ORDER BY creation_date DESC LIMIT 20",
        [
          req.params.keyword + "%",
          "%" + req.params.keyword + "%",
          "%" + req.params.keyword,
        ]
      )
      .then((currentValue) => res.json(currentValue));
  });
});

// routing search city
app.get("/search/loc/:city", (req, res) => {
  connection_id.then((connection) => {
    connection
      .query(
        "SELECT id, title, description, location, creation_date FROM ads WHERE location = ? AND creation_date > DATE_SUB(NOW(), INTERVAL 2 WEEK) ORDER BY creation_date DESC LIMIT 20",
        req.params.city
      )
      .then((currentValue) => res.json(currentValue));
  });
});

// routing add new item
app.post("/add", (req, res) => {
  const newItem = {
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    location: req.body.loc,
    price: req.body.price,
    vb: req.body.vb,
    email: req.body.email,
  };

  connection_id.then((connection) => {
    connection
      .query(
        "INSERT INTO ads (title, description, name, location, price, vb, email, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
        [
          newItem.title,
          newItem.description,
          newItem.name,
          newItem.location,
          newItem.price,
          newItem.vb,
          newItem.email,
        ]
      )
      .then(console.log)
      .catch(console.log);
  });
});

app.listen(port, () => console.log(`Server is running... Port: ${port}`));

var express = require("express");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, X-Requested-With"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

const MongoClient = require("mongodb").MongoClient;

var db;

MongoClient.connect(
  "mongodb+srv://admin:rIzJ3bY4NWSZur5n@messeges-jhdyy.mongodb.net/test?retryWrites=true&w=majority",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("messages_db");
    app.listen(8080, () => {
      console.log("listening on 8080");
    });
  }
);

app.get("/messages", (req, res) => {
  db.collection("messages")
    .find()
    .toArray(function(err, results) {
      res.send(results);
    });
});

app.post("/messages", (req, res) => {
  var body = JSON.stringify(req.body);
  console.log("stringBody: ", body);
  db.collection("messages").insert(req.body);
  res.send("Insertado exitosamente");
});

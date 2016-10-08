"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
  mongoClient = mongodb.MongoClient,
  ObjectID = mongodb.ObjectID,
  db;

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors());
app.use(express.static("www"));

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_03zcbl71:lcncgf0b8cvrebf99bsi4n554g@ds033106.mlab.com:33106/heroku_03zcbl71';

mongoClient.connect(MONGODB_URI, function(err, database) {
  if (err) {
    process.exit(1);
  }

  db = database;

  console.log("Database connection ready");

  app.listen(app.get('port'), function() {
    console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
  });
});


app.get("/api/levels", function(req, res) {
  db.collection("levels").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get levels");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/levels", function(req, res) {
  var newLevel = {
    levelNum: req.body.levelNum,
    levelName: req.body.levelName,
  }

  db.collection("levels").insertOne(newLevel, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to add level");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});


app.get("/api/levels/:id", function(req, res) {
  db.collection("levels").findOne({
    _id: new ObjectID(req.params.id)
  }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get level by _id");
    } else {
      res.status(200).json(doc);
    }
  });
});


app.put("/api/levels/:id", function(req, res) {
  var updateLevel = req.body;
  delete updateLevel._id;

  db.collection("levels").updateOne({
    _id: new ObjectID(req.params.id)
  }, updateLevel, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update level");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/api/levels/:id", function(req, res) {
  db.collection("levels").deleteOne({
    _id: new ObjectID(req.params.id)
  }, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete level");
    } else {
      res.status(204).end();
    }
  });
});

function handleError(res, reason, message, code) {
  console.log("API Error: " + reason);
  res.status(code || 500).json({"Error": message});
}

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://mattwendzina:${process.env.MONGO_PASSWORD}@cluster0.hfqbdqr.mongodb.net/common?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log("Error", error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No DB found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

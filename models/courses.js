const mongodb = require("mongodb");

const { getDb } = require("../util/database");

class Course {
  constructor(title, price, description, categories, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.categories = categories;
    // Only set an ID if one has been passed in
    this._id = id && new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;
    // If ID exists, then course exists so update, otherwise
    // create new course
    if (this._id) {
      dbOp = db.collection("courses").updateOne(
        {
          _id: this._id,
        },
        { $set: this }
      );
    } else {
      dbOp = db.collection("courses").insertOne(this);
    }
    return dbOp
      .then((result) => console.log("result", result))
      .catch((err) => console.log("Err", err));
  }

  static fetchAll(limit, sort, category, allCategories) {
    const db = getDb();
    let dbOp;
    if (limit) {
      dbOp = db
        .collection("courses")
        .find()
        .limit(+limit)
        .toArray();
    } else if (sort) {
      dbOp = db
        .collection("courses")
        .aggregate([{ $sort: { title: +sort } }])
        .toArray();
    } else if (category) {
      return db
        .collection("courses")
        .find()
        .toArray()
        .then((res) =>
          res.filter((course) =>
            course.categories.some((cat) => cat === category)
          )
        );
    } else if (allCategories === "true") {
      return db
        .collection("courses")
        .find()
        .toArray()
        .then((res) => {
          const result = res.reduce((course, nextCourse) => {
            return [...course, ...nextCourse.categories.map((cat) => cat)];
          }, []);
          const uniqueCategories = result.filter(
            (cat, idx, arr) => arr.indexOf(cat) === idx
          );
          return uniqueCategories;
        });
    } else {
      dbOp = db.collection("courses").find().toArray();
    }

    return dbOp
      .then((courses) => courses)
      .catch((err) => console.log("ERR", err));
  }

  static findById(courseId) {
    const db = getDb();
    return db
      .collection("courses")
      .find({ _id: new mongodb.ObjectId(courseId) })
      .next()
      .then((course) => course)
      .catch((err) => console.log("ERR", err));
  }

  static deleteById(courseId) {
    const db = getDb();
    return db
      .collection("courses")
      .deleteOne({ _id: new mongodb.ObjectId(courseId) })
      .then((result) => {
        console.log("RESULT", result);
        return result;
      })
      .catch((err) => console.log("ERR", err));
  }
}

module.exports = Course;

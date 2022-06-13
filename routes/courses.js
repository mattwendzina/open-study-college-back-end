const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

const Course = require("../models/courses");

router.get("/new-course", (req, res) => {
  res.send(`
    <form action="/courses/add-new-course" method="POST">
        <input type='text' name='title' placeholder='title'/>
        <input type='text' name='price' placeholder='price'/>
        <input type='text' name='description' placeholder='description'/>
        <button type='submit'> Submit </button>
    </form>
    `);
});

router.get("/all-courses", (req, res) => {
  const { limit, sort, category, allCategories } = req.query;
  Course.fetchAll(limit, sort, category, allCategories)
    .then((result) => {
      res.json({ result: result });
    })
    .catch((err) => console.log("ERR", err));
});

router.put("/update-course/:courseId", (req, res) => {
  const { title, price, description, categories } = req.body;
  const { courseId } = req.params;
  const updatedCourse = new Course(
    title,
    price,
    description,
    categories,
    new mongodb.ObjectId(courseId)
  );

  updatedCourse
    .save()
    .then((result) => {
      res.status(200).json({ result: result });
    })
    .catch((err) => console.log("ERR", err));
});

router.delete("/delete-course/:courseId", (req, res) => {
  const { courseId } = req.params;

  Course.deleteById(courseId)
    .then((result) => {
      res.json({ result: result });
    })
    .catch((err) => console.log("ERR", err));
});

router.get("/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findById(courseId)
    .then((result) => res.json({ course: result }))
    .catch((err) => console.log("ERR", err));
});

router.post("/add-new-course", (req, res) => {
  const { title, price, description, categories } = req.body;
  const newCourse = new Course(title, price, description, categories);

  newCourse
    .save()
    .then((res) => console.log("RES", res))
    .catch((err) => console.log("Err", err));

  res.redirect("/");
});

module.exports = router;

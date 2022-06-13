const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();

const app = express();
const { mongoConnect } = require("./util/database");

const coursesRoutes = require("./routes/courses");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );

  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/courses", coursesRoutes);

app.get("/", (req, res, next) => {
  res.send("<h1> Hello from Express </h1>");
});

mongoConnect(() => {
  app.listen(3001);
});

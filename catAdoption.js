"use strict";

const express = require("express");
const app = express();
app.use(express.static('public'));
const appRouter = require("./app");
const path = require("path");
const portNumber = 5001;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));

// require("dotenv").config({
//    path: path.resolve(__dirname, "credentialsDontPost/.env"),
// });

app.get("/", (req, res) => {
  const variables = { activePage: "home" };
  res.render("home", variables);
});

app.get("/catImages", (req, res) => {
  const variables = { activePage: "images" };
  res.render("catImages", variables);
});

app.use("/application", appRouter);

app.listen(portNumber);
console.log(`Server is running at http://localhost:${portNumber}/`);
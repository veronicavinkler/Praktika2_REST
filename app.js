const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); //front end jaoks
//const indexRoutes = require("../routes/index.routes");

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
//app.use("/", indexRoutes);


module.exports = app;


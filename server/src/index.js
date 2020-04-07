const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("./db");

const config = require("./config");
const routes = require("./api/routes");
const erroHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(helmet());
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use(routes);

app.use(function (err, req, res, next) {
  res.status(err.code).json(erroHandler(err));
});

app.listen(config.PORT, (err) => {
  if (err) return console.log("Server error has occured!!!");
  console.info("Server is running ...😻");
});

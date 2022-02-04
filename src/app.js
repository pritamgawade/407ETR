const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const routes = require("./routes");
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(routes);

module.exports= app;

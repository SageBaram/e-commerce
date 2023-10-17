const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const _ = require("lodash");

const corsOptions = require("@config/corsOptions");
const errorHandlerMiddleware = require("@middlewares/errorMiddleware");

const app = express();

app.locals._ = _;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));
app.use(cors(corsOptions));
app.use(cors(errorHandlerMiddleware));

module.exports = app;

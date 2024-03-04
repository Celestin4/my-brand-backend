const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

module.exports = app;

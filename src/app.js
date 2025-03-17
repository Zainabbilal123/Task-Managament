const express = require("express");
const connectDB = require("./config/db");
const taskroutes = require("./routes/taskroutes");
const authroutes = require("./routes/authroutes");
require("dotenv").config();

const app = express();
connectDB();
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/task", taskroutes);

module.exports = app;

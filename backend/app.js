const express= require("express");
const errorMiddleware = require("./middleware/error")

const app = express();

app.use(express.json());


//Routes Import
const user = require('./routes/userRoute')

app.use("/api/v1",user);

module.exports = app;
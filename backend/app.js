const express= require("express");
const errorMiddleware = require("./middleware/error")

const app = express();

app.use(express.json());


//Routes Import
const user = require('./routes/userRoute')
const quiz = require("./routes/quizRoute");

app.use("/api/v1",user);
app.use("/api/v1",quiz);

app.use(errorMiddleware);

module.exports = app;
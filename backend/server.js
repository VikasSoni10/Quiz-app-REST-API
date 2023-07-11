const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//config...
dotenv.config({ path: "config.env" });
const port  = process.env.PORT;
//Connecting to database
connectDatabase();


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})  
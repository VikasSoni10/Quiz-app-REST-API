const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

const  PORT = 4000; 

//config...
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
})  
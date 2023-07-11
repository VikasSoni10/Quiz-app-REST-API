const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const port  = process.env.PORT || 4000;

// //config...
// dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})  
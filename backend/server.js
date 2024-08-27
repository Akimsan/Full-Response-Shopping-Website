const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');

//connectb env file
dotenv.config({path:path.join(__dirname,"config/.env")});

//use database.js file foe connect the mongodb
connectDatabase();

//set port
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server listening on : ${process.env.PORT} in ${process.env.NODE_ENV}`)
})
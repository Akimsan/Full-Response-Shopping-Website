const express = require('express');
const app = express();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(express.json()); // allow the json data to express thatb data come from req 
app.use(cookieParser()); // use of this "acces the cookie property"
app.use(cors())
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);


app.use(errorMiddleware)
module.exports = app;



//files
const api = require('./api');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


//use
app.use('/', api)

//run
app.listen(process.env.PORT, () => console.log('app is running at \x1b[95mhttp://localhost:'+ process.env.PORT + '\x1b[0m'));
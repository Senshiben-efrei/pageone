const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
//files
const api = require('./routes/api');

//use
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/api', api)



//run
app.listen(process.env.PORT, () => console.log('app is running'));
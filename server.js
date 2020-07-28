const express = require('express');
const cors = require('cors')
const app = express()
const dotenv = require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URL}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
} )

mongoose.Promise = global.Promise;

require('./src/models/user')
require('./src/models/manager')

app.use('/api', require('./src/routes'))

app.listen(process.env.PORT || 3000)
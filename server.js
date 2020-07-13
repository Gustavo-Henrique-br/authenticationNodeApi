const express = require('express');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node_rest', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
} )

mongoose.Promise = global.Promise;

app.get('/', (req,res)=>{
    res.send('<h1>Hello</h1>')
});

require('./src/models/user')
require('./src/models/manager')

app.use('/api', require('./src/routes'))

app.listen(3000)
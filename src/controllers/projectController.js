const express = require('express');
const  Mongoose  = require('mongoose');
const routes = express.Router();
const Post = Mongoose.model('Manager')

module.exports = {
    ok(req,res) {
        res.send({
            ok: true,
            user: req.userId
        })
    }
}
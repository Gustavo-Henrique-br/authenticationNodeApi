const express = require('express');
const mongoose= require('mongoose')
const bcrypt =  require('bcrypt')
const jwt =     require('jsonwebtoken')
const authConfig = require('../config/auth.json')

const User = mongoose.model('User')

function generateToken (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {
    async register(req,res) {
        const { email } = req.body
        if (await User.findOne({ email })) {
            return res.status(400).send({error: 'user already exists'})
        }

        const user = await User.create(req.body)

        user.password = undefined

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        })
        
    },

    async auth(req,res){
        const { email, password } = req.body

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(400).send({error: 'user not found'})
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({error: 'invalid password'})
        }

        user.password = undefined

        res.send({ 
            user, 
            token: generateToken({ id: user.id }) 
        })
        
    },

    async index(req,res) {
        const { page } = req.body
        const users = await User.paginate({}, { page, limit: 10 })

        return res.json(users)
    },

    async destroy(req,res) {
        await User.findByIdAndRemove(req.params.id);

        return res.send()
    },

    async show(req,res) {
        const filteredUser = await User.findById(req.params.id);

        return res.json(filteredUser)
    }

}
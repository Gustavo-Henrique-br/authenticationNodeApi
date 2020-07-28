const express = require('express');
const  Mongoose  = require('mongoose');
const routes = express.Router();
const Post = Mongoose.model('Manager')

module.exports = {
    async create(req,res) {
        const user = await Post.create(req.body)

        return res.json(user)
    },
    async index(req,res) {
        const { page } = req.body
        const post = await Post.paginate({}, { page, limit: 15 })

        return res.json(post)
    },
    async userProjects(req,res) {
        const filteredProjects = await Post.find({user_id: req.params.id})

        return res.json(filteredProjects)
    },
    async update(req,res) {
        const updatedProject = await Post.findByIdAndUpdate(req.params.id, req.body)

        return res.json(updatedProject)
    },
    async delete(req,res) {
        await Post.findByIdAndRemove(req.params.id)

        res.send('deleted')
    },
}
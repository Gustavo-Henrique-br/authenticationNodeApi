const express = require('express');
const routes = express.Router();

const userController = require('./controllers/authController')
const projectController = require('./controllers/projectController')

const authMiddleware = require('./middlewares/auth')

routes.get('/users', userController.index)
routes.get('/users/:id', userController.show)

routes.delete('/users/:id', userController.destroy)

routes.post('/authenticate', userController.auth)
routes.post('/register', userController.register)

routes.use('/projects', authMiddleware)
routes.post('/projects', projectController.create)
routes.get('/projects/all', projectController.index)
routes.get('/projects//filter/:id', projectController.userProjects)
routes.put('/projects/update/:id', projectController.update)
routes.delete('/projects/destroy/:id', projectController.delete)

module.exports = routes
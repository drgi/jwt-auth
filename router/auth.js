const express = require('express');
const router = express.Router();
const usersDb = require('../controllers/user')
const rfServise = require('../controllers/refreshToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const uuid = require('uuid')
const jwtMiddleware = require('express-jwt');

router.post('/auth/login', async (req, res) => {
    console.log(' auth/login:', req.body)
    const {password, name} = req.body
    const user = usersDb.findById({name})
    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }
    if (bcrypt.compareSync(password, user.password)) {
        // Create token
        const token = jwt.sign({id: user.id}, config.secret)
        const refreshToken = uuid.v4()
        return res.status(200).json({token, refreshToken})
    }
    return res.status(403).json({error: 'Invalid password/login'})

})

router.post('/auth/refresh', (req, res) => {
    console.log(' auth/refresh:', req.body)
    const { id, refreshToken} = req.body
    const user = rfServise.findByToken({refreshToken})
    console.log(user)
    if (!user) {
        return res.status(404).json({error: 'Invalid token'})
    }
    rfServise.remove({refreshToken})
    const newToken = jwt.sign({id: user.id}, config.secret)
    const newRefreshToken = uuid.v4()
        return res.status(200).json({token: newToken, refreshToken: newRefreshToken})

})

router.post('/auth/logout', jwtMiddleware({secret: config.secret, algorithms: ['HS256']}), (req, res) => {
    console.log('logout:', req.user)
    const { id } = req.user
    //Delete refreshTokens
    rfServise.remove({id})
    return res.status(200).json({succes: true})

})



module.exports = router

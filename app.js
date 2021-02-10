const express = require('express');
//const path = require('path');
const userRoute = require('./router/user')
const authRoute = require('./router/auth')
const jwtMiddleware = require('express-jwt');
const config = require('./config/config');
const PORT = 3000


function authErrorHandler(err, req, res, next) {
    console.log(err.code)
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: 'invalid token...'});
    }
    next()
}

function createApp() {
    const app = express()

    
    app.use(express.json())
    app.use(authRoute)
    app.use(jwtMiddleware({secret: config.secret, algorithms: ['HS256']})) 
    app.use(userRoute)
    app.use(authErrorHandler)
    

        return app
}

if (!module.parent) {
    createApp().listen(PORT, () => {
        console.log(`Server start at ${PORT}`)
    })
}
module.exports = createApp
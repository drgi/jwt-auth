const express = require('express');
const path = require('path');
const userRoute = require('./router/user')
const PORT = 3000
const app = express()

app.use(userRoute)


app.listen(PORT, () => {
    console.log(`Server start at ${PORT}`)
})

module.exports = app
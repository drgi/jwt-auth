const express = require('express');
const router = express.Router();
const usersDb = require('../controllers/user')

router.get('/user/:id', (req, res) => {
    console.log(req.params)
    const user = usersDb.findById(req.params)
    console.log(user) 
    res.status(200).json(user)

})

router.get('/allusers', (req, res) => {
    const data = usersDb.allUsers()
    res.status(200).json(data)
})


module.exports = router

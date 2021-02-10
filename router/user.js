const express = require('express');
const router = express.Router();
const usersDb = require('../controllers/user')

router.get('/user/:id', async (req, res) => {
    console.log(req.params)
    const user = await usersDb.findById(req.params)
    console.log('User:',user)
    if (!user) {
        return res.status(404).json({error: 'Invalid id'})
    } 
    return res.status(200).json(user)

})

router.get('/allusers', (req, res) => {
    const data = usersDb.allUsers()
    res.status(200).json(data)
})


module.exports = router

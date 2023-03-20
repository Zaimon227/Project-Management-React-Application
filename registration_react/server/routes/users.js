const express = require("express")
const router = express.Router()
const User = require('../models/userModel')

router.get('/', async (req, res) => {
    const user = await User.query();

        console.log(user[0] instanceof User); // --> true
        console.log('there are', user.length, 'users in total');

    res.status(200).json(user)
})

router.post('/', (req, res) => {
    res.send({data: "User Created"});
})

router.put('/', (req, res) => {
    res.send({data: "User Updated"});
})

router.delete('/', (req, res) => {
    res.send({data: "User Deleted"});
})

module.exports = router;
const express = require("express")
const router = express.Router()
const Contact = require('../models/contactModel')

router.get('/', async (req, res) => {
    const contact = await Contact.query()
        .select( 
            "id",
            "name",
            "address",
            "email",
            "contact",
        )

        console.log(contact[0] instanceof Contact); // --> true
        // console.log('there are', user.length, 'users in total');

    res.status(200).json(contact)
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
const express = require("express")
const router = express.Router()
const Contact = require('../models/contactModel')

router.get('/:pageNumber', async (req, res) => {
    const {pageNumber} = req.params
    const limit = 10
    const contact = await Contact.query()
        .select(
            "id",
            "name",
            "address",
            "email",
            "contact",
        )
        .orderBy('id')
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(contact[0] instanceof Contact); // --> true

    res.status(200).json(contact)
})

router.get('/:pageNumber/:search', async (req, res) => {
    const {pageNumber} = req.params
    const {search} = req.params
    const limit = 10
    const contact = await Contact.query()
        .select(
            "id",
            "name",
            "address",
            "email",
            "contact",
        )
        .orderBy('id')
        .whereRaw(`name like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(contact[0] instanceof Contact); // --> true

    res.status(200).json(contact)
})

router.post('/add', async (req, res) => {
    const { name, address, email, contact } = req.body
    if (!name && !address && !email && !contact) {
        return res
        .status(400)
        .json({success: false, msg: 'Incomplete Inputs'})
    }

    const insertContact = await Contact.query().insert({
        name: name,
        address: address,
        email: email,
        contact: contact,
    })
        
    console.log(insertContact instanceof Contact); // --> true
    
    res.status(201).send({success: true})
})

router.put('/', (req, res) => {
    res.send({data: "User Updated"});
})

router.delete('/', (req, res) => {
    res.send({data: "User Deleted"});
})

module.exports = router;
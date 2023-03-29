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
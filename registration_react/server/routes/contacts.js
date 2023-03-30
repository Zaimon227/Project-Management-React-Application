const express = require("express")
const router = express.Router()
const Contact = require('../models/contactModel')

router.get('/get/:id', async (req, res) => {
    const {id} = req.params
    const contact = await Contact.query().findById(id)

    console.log(contact[0] instanceof Contact) // --> true

    res.status(200).json(contact)
})

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

router.put('/update/:id', async (req, res) => {
    const {id} = req.params
    const {name, address, email, contact} = req.body

    if (!name && !address && !email && !contact) {
        return res
        .status(404)
        .json({success: false, msg: 'Incomplete Inputs' })
    }

    const updateContact = await Contact.query()
        .findById(id)
        .patch({
            name: name,
            address: address,
            email: email,
            contact: contact
        });

    if (!updateContact) {
        return res
        .status(404)
        .json({success: false, msg: `update with id ${id} failed!` })
    }

    res.status(200).json({ success:true })
})

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params
    const deleteContact = await Contact.query().deleteById(id);

    if (!deleteContact) {
        return res
        .status(404)
        .json({success: false, msg: `Deletion of contact with id ${id} has failed!` })
    }

    return res.status(200).json( {success: true} )
})

module.exports = router;
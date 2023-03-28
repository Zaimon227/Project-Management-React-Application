const express = require("express")
const router = express.Router()
const Religion = require('../models/religionModel')

router.get('/:pageNumber', async (req, res) => {
    const {pageNumber} = req.params
    const limit = 10
    const religion = await Religion.query()
        .select( 
            "religionid",
            "religionname",
            "description",
            "created_by",
            "created_datetime",
        )
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(religion[0] instanceof Religion); // --> true
    // console.log('there are', user.length, 'users in total');

    res.status(200).json(religion)
})

router.get('/:pageNumber/:search', async (req, res) => {
    const {pageNumber} = req.params
    const {search} = req.params
    const limit = 10
    const religion = await Religion.query()
        .select( 
            "religionid",
            "religionname",
            "description",
            "created_by",
            "created_datetime",
        )
        .whereRaw(`religionname like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

        console.log(religion[0] instanceof Religion); // --> true

    res.status(200).json(religion)
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
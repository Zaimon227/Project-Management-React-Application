const express = require("express")
const router = express.Router()
const Nationality = require('../models/nationalityModel')

router.get('/:pageNumber', async (req, res) => {
    const {pageNumber} = req.params
    const limit = 10
    const nationality = await Nationality.query()
        .select( 
            "nationalityid",
            "nationalityname",
            "description",
            "created_by",
            "created_datetime",
        )
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(nationality[0] instanceof Nationality); // --> true

    res.status(200).json(nationality)
})

router.get('/:pageNumber/:search', async (req, res) => {
    const {pageNumber} = req.params
    const {search} = req.params
    const limit = 10
    const nationality = await Nationality.query()
        .select( 
            "nationalityid",
            "nationalityname",
            "description",
            "created_by",
            "created_datetime",
        )
        .whereRaw(`nationalityname like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(nationality[0] instanceof Nationality); // --> true

    res.status(200).json(nationality)
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
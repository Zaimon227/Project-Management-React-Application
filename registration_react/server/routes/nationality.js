const express = require("express")
const router = express.Router()
const { beforeInsert } = require("../models/nationalityModel")
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
        .orderBy('nationalityid')
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
        .orderBy('nationalityid')
        .whereRaw(`nationalityname like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(nationality[0] instanceof Nationality); // --> true

    res.status(200).json(nationality)
})

router.post('/add', async (req, res) => {
    const { nationalityname, description } = req.body
    if (!nationalityname && !description) {
        return res
        .status(400)
        .json({success: false, msg: 'Incomplete Inputs'})
    }

    const insertNationality = await Nationality.query().insert({
        nationalityname: nationalityname,
        description: description,
        is_active: 0,
        created_by: "admin",
        created_datetime: beforeInsert()
    })
        
    console.log(insertNationality instanceof Nationality); // --> true
    
    res.status(201).send({success: true})
})

router.put('/', (req, res) => {
    res.send({data: "User Updated"});
})

router.delete('/', (req, res) => {
    res.send({data: "User Deleted"});
})

module.exports = router;
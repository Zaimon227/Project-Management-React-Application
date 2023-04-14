const express = require("express")
const router = express.Router()
const { beforeInsert } = require("../models/nationalityModel")
const Nationality = require('../models/nationalityModel')

router.get('/', async (req, res) => {
    const nationality = await Nationality.query()

    console.log(nationality[0] instanceof Nationality) // --> true

    res.status(200).json(nationality)
})

router.get('/get/:nationalityid', async (req, res) => {
    const {nationalityid} = req.params
    const nationality = await Nationality.query().findById(nationalityid)

    console.log(nationality[0] instanceof Nationality) // --> true

    res.status(200).json(nationality)
})

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

router.put('/update/:nationalityid', async (req, res) => {
    const {nationalityid} = req.params
    const {nationalityname, description} = req.body

    if (!nationalityname && !description) {
        return res
        .status(404)
        .json({success: false, msg: 'Incomplete Inputs' })
    }

    const updateNationality = await Nationality.query()
        .findById(nationalityid)
        .patch({
            nationalityname: nationalityname,
            description: description,
            updated_by: "admin",
            updated_datetime: beforeInsert()
        });

    if (!updateNationality) {
        return res
        .status(404)
        .json({success: false, msg: `update with nationalityid ${nationalityid} failed!` })
    }

    res.status(200).json({ success:true })
})

router.delete('/delete/:nationalityid', async (req, res) => {
    const {nationalityid} = req.params
    const deleteNationality = await Nationality.query().deleteById(nationalityid);

    if (!deleteNationality) {
        return res
        .status(404)
        .json({success: false, msg: `Deletion of contact with nationalityid ${nationalityid} has failed!` })
    }

    return res.status(200).json( {success: true} )
})

module.exports = router;
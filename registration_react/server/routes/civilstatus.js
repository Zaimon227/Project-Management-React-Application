const express = require("express")
const router = express.Router()
const { beforeInsert } = require("../models/civilstatusModel")
const CivilStatus = require('../models/civilstatusModel')

router.get('/get/:civilstatusid', async (req, res) => {
    const {civilstatusid} = req.params
    const civilstatus = await CivilStatus.query().findById(civilstatusid)

    console.log(civilstatus[0] instanceof CivilStatus) // --> true

    res.status(200).json(civilstatus)
})

router.get('/:pageNumber', async (req, res) => {
    const {pageNumber} = req.params
    const limit = 10
    const civilstatus = await CivilStatus.query()
        .select( 
            "civilstatusid",
            "civilstatusname",
            "description",
            "created_by",
            "created_datetime",
        )
        .orderBy('civilstatusid')
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(civilstatus[0] instanceof CivilStatus); // --> true

    res.status(200).json(civilstatus)
})

router.get('/:pageNumber/:search', async (req, res) => {
    const {pageNumber} = req.params
    const {search} = req.params
    const limit = 10
    const civilstatus = await CivilStatus.query()
        .select( 
            "civilstatusid",
            "civilstatusname",
            "description",
            "created_by",
            "created_datetime",
        )
        .orderBy('civilstatusid')
        .whereRaw(`civilstatusname like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(civilstatus[0] instanceof CivilStatus); // --> true

    res.status(200).json(civilstatus)
})

router.post('/add', async (req, res) => {
    const { civilstatusname, description } = req.body
    if (!civilstatusname && !description) {
        return res
        .status(400)
        .json({success: false, msg: 'Incomplete Inputs'})
    }

    const insertCivilStatus = await CivilStatus.query().insert({
        civilstatusname: civilstatusname,
        description: description,
        is_active: 0,
        created_by: "admin",
        created_datetime: beforeInsert()
    })
        
    console.log(insertCivilStatus instanceof CivilStatus); // --> true
    
    res.status(201).send({success: true})
})

router.put('/update/:civilstatusid', async (req, res) => {
    const {civilstatusid} = req.params
    const {civilstatusname, description} = req.body

    if (!civilstatusname && !description) {
        return res
        .status(404)
        .json({success: false, msg: 'Incomplete Inputs' })
    }

    const updateCivilStatus = await CivilStatus.query()
        .findById(civilstatusid)
        .patch({
            civilstatusname: civilstatusname,
            description: description,
            updated_by: "admin",
            updated_datetime: beforeInsert()
        });

    if (!updateCivilStatus) {
        return res
        .status(404)
        .json({success: false, msg: `update with civilstatusid ${civilstatusid} failed!` })
    }

    res.status(200).json({ success:true })
})

router.delete('/delete/:civilstatusid', async (req, res) => {
    const {civilstatusid} = req.params
    const deleteCivilStatus = await CivilStatus.query().deleteById(civilstatusid);

    if (!deleteCivilStatus) {
        return res
        .status(404)
        .json({success: false, msg: `Deletion of contact with civilstatusid ${civilstatusid} has failed!` })
    }

    return res.status(200).json( {success: true} )
})

module.exports = router;
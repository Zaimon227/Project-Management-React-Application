const express = require("express")
const router = express.Router()
const { beforeInsert } = require("../models/religionModel")
const Religion = require('../models/religionModel')

router.get('/get/:religionid', async (req, res) => {
    const {religionid} = req.params
    const religion = await Religion.query().findById(religionid)

    console.log(religion[0] instanceof Religion) // --> true

    res.status(200).json(religion)
})

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
        .orderBy('religionid')
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
        .orderBy('religionid')
        .whereRaw(`religionname like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

        console.log(religion[0] instanceof Religion); // --> true

    res.status(200).json(religion)
})

router.post('/add', async (req, res) => {
    const { religionname, description } = req.body
    if (!religionname && !description) {
        return res
        .status(400)
        .json({success: false, msg: 'Incomplete Inputs'})
    }

    const insertReligion = await Religion.query().insert({
        religionname: religionname,
        description: description,
        is_active: 0,
        created_by: "admin",
        created_datetime: beforeInsert()
    })
        
    console.log(insertReligion instanceof Religion); // --> true
    
    res.status(201).send({success: true})
})

router.put('/update/:religionid', async (req, res) => {
    const {religionid} = req.params
    const {religionname, description} = req.body

    if (!religionname && !description) {
        return res
        .status(404)
        .json({success: false, msg: 'Incomplete Inputs' })
    }

    const updateReligion = await Religion.query()
        .findById(religionid)
        .patch({
            religionname: religionname,
            description: description,
            updated_by: "admin",
            updated_datetime: beforeInsert()
        });

    if (!updateReligion) {
        return res
        .status(404)
        .json({success: false, msg: `update with religionid ${religionid} failed!` })
    }

    res.status(200).json({ success:true })
})

router.delete('/delete/:religionid', async (req, res) => {
    const {religionid} = req.params
    const deleteReligion = await Religion.query().deleteById(religionid);

    if (!deleteReligion) {
        return res
        .status(404)
        .json({success: false, msg: `Deletion of contact with religionid ${religionid} has failed!` })
    }

    return res.status(200).json( {success: true} )
})

module.exports = router;
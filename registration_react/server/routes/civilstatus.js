const express = require("express")
const router = express.Router()
const CivilStatus = require('../models/civilstatusModel')

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
        .whereRaw(`civilstatusname like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

    console.log(civilstatus[0] instanceof CivilStatus); // --> true

    res.status(200).json(civilstatus)
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
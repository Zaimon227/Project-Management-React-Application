const express = require("express")
const router = express.Router()
const { raw } = require('objection');
const { beforeInsert } = require("../models/userModel");
const User = require('../models/userModel')

router.get('/:pageNumber', async (req, res) => {
    const {pageNumber} = req.params
    const limit = 10
    const user = await User.query()
        .select(
            raw("CONCAT(lastname, ', ', firstname, ' ', middlename)").as('completename'),
            "userid",
            "gender",
            "birthdate",
            "tbReligion.religionname",
            "tbNationality.nationalityname",
            "tbCivilStatus.civilstatusname",
            "email"
            )
        .orderBy('userid')
        .innerJoin('tbReligion', 'tbReligion.religionid', 'tbUsers.religionid')
        .innerJoin('tbNationality', 'tbNationality.nationalityid', 'tbUsers.nationalityid')
        .innerJoin('tbCivilStatus', 'tbCivilStatus.civilstatusid', 'tbUsers.civilstatusid')
        .limit(limit)
        .offset((limit * pageNumber) - limit);

        console.log(user[0] instanceof User); // --> true
        // console.log('there are', user.length, 'users in total');

    res.status(200).json(user)
})

router.get('/:pageNumber/:search', async (req, res) => {
    const {pageNumber} = req.params
    const {search} = req.params
    const limit = 10
    const user = await User.query()
        .select(
            raw("CONCAT(lastname, ', ', firstname, ' ', middlename)").as('completename'),
            "userid",
            "gender",
            "birthdate",
            "tbReligion.religionname",
            "tbNationality.nationalityname",
            "tbCivilStatus.civilstatusname",
            "email"
            )
        .orderBy('userid')
        .innerJoin('tbReligion', 'tbReligion.religionid', 'tbUsers.religionid')
        .innerJoin('tbNationality', 'tbNationality.nationalityid', 'tbUsers.nationalityid')
        .innerJoin('tbCivilStatus', 'tbCivilStatus.civilstatusid', 'tbUsers.civilstatusid')
        .whereRaw(`firstname like '${search}%'`)
        .limit(limit)
        .offset((limit * pageNumber) - limit);

        console.log(user[0] instanceof User); // --> true
        // console.log('there are', user.length, 'users in total');

    res.status(200).json(user)
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    const user = await User.query()
        .select('userid')
        .where('email', email)
        .where('password', password);
        
    res.status(200).json(user)
})

router.post('/signup', async (req, res) => {
    // const created_datetime = new Date().toISOString()
    const { 
        firstname, 
        middlename, 
        lastname, 
        gender, 
        birthdate, 
        religionid, 
        nationalityid, 
        civilstatusid, 
        email, 
        password 
    } = req.body
    if ( 
        !firstname && 
        !middlename && 
        !lastname && 
        !gender && 
        !birthdate && 
        !religionid && 
        !nationalityid && 
        !civilstatusid && 
        !email && 
        !password 
        ) 
    {
        return res.status(400).json({success: false, msg: "Incomplete Inputs"})
    }
    const insertUser = await User.query()
    .insert({
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        gender: gender,
        birthdate: birthdate,
        religionid: religionid,
        nationalityid: nationalityid,
        civilstatusid: civilstatusid,
        email: email,
        password: password,
        is_active: '0',
        created_datetime:  beforeInsert(),
        created_by: 'admin'
    })

    console.log(insertUser instanceof User); // --> true
    res.status(201).send({success: true})
})

router.put('/', (req, res) => {
    res.send({data: "User Updated"});
})

router.delete('/', (req, res) => {
    res.send({data: "User Deleted"});
})

module.exports = router;
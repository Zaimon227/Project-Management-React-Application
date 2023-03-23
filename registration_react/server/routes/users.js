const express = require("express")
const router = express.Router()
const { raw } = require('objection');
const User = require('../models/userModel')


router.get('/', async (req, res) => {
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
        .innerJoin('tbReligion', 'tbReligion.religionid', 'tbUsers.religionid')
        .innerJoin('tbNationality', 'tbNationality.nationalityid', 'tbUsers.nationalityid')
        .innerJoin('tbCivilStatus', 'tbCivilStatus.civilstatusid', 'tbUsers.civilstatusid')

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
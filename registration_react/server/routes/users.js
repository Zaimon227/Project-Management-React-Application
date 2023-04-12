const express = require('express')
const router = express.Router()
const { raw } = require('objection')
const { beforeInsert } = require('../models/userModel')
const User = require('../models/userModel')
const path = require('path')

// --------------------- IMAGE UPLOADING -----------------------------------
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../client/src/uploads')
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb("Make sure proper file format")
    }
})

router.put('/upload/:userid', upload.single('image'), async (req, res) => {
    const {userid} = req.params
    const image = req.file.filename
    console.log(image)

    if (!req.file) {
        console.log("No file upload")
    } else {
        console.log(req.file.path)
        console.log("file uploaded")
    }

    const updateProfilePicture = await User.query()
        .findById(userid)
        .patch({
            profilepicture: image
        })

    if (!updateProfilePicture) {
        return res
        .status(404)
        .json({success: false, msg: `update with userid ${userid} failed!` })
    }

    res.status(200).json({ success:true })
})
// ----------------- END OF IMAGE UPLOADING ------------------------------------------

router.get('/get/:userid', async (req, res) => {
    const {userid} = req.params
    const user = await User.query().findById(userid)

    console.log(user[0] instanceof User) // --> true

    res.status(200).json(user)
})

router.get('/:pageNumber', async (req, res) => {
    const {pageNumber} = req.params
    const limit = 8
    const user = await User.query()
        .select(
            "profilepicture",
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
    const limit = 8
    const user = await User.query()
        .select(
            "profilepicture",
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

router.delete('/delete/:userid', async (req, res) => {
    const {userid} = req.params
    const deleteUser = await User.query().deleteById(userid);

    if (!deleteUser) {
        return res
        .status(404)
        .json({success: false, msg: `Deletion of contact with userid ${userid} has failed!` })
    }

    return res.status(200).json( {success: true} )
})

module.exports = router;
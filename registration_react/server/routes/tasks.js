const express = require("express")
const router = express.Router()
const { beforeInsert } = require("../models/religionModel")
const Task = require('../models/taskModel')

router.get('/get/:taskid', async (req, res) => {
    const {taskid} = req.params
    const task = await Task.query().findById(taskid)

    console.log(task[0] instanceof Task) // --> true

    res.status(200).json(task)
})

router.post('/add', async (req, res) => {
    const { name, description, assignee, reporter, deadline } = req.body
    if (!name && !description && !assignee && !reporter && !deadline) {
        return res
        .status(400)
        .json({success: false, msg: 'Incomplete Inputs'})
    }

    const insertTask = await Task.query().insert({
        name: name,
        description: description,
        taskstatus: "todo", 
        assignee: assignee,
        reporter: reporter,
        start: beforeInsert(),
        deadline: deadline
    })
        
    console.log(insertTask instanceof Task); // --> true
    
    res.status(201).send({success: true})
})

router.put('/update/:taskid', async (req, res) => {
    const {taskid} = req.params
    const {name, description, email, contact} = req.body

    if (!name && !address && !email && !contact) {
        return res
        .status(404)
        .json({success: false, msg: 'Incomplete Inputs' })
    }

    const updateContact = await Contact.query()
        .findById(id)
        .patch({
            name: name,
            address: address,
            email: email,
            contact: contact
        });

    if (!updateContact) {
        return res
        .status(404)
        .json({success: false, msg: `update with id ${id} failed!` })
    }

    res.status(200).json({ success:true })
})

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params
    const deleteContact = await Contact.query().deleteById(id);

    if (!deleteContact) {
        return res
        .status(404)
        .json({success: false, msg: `Deletion of contact with id ${id} has failed!` })
    }

    return res.status(200).json( {success: true} )
})

module.exports = router;
const express = require('express')
const { raw } = require('objection')
const router = express.Router()
const { beforeInsert } = require("../models/taskModel")
const Task = require('../models/taskModel')

router.get('/get/:taskid', async (req, res) => {
    const {taskid} = req.params
    const task = await Task.query().findById(taskid)

    console.log(task[0] instanceof Task) // --> true

    res.status(200).json(task)
})

router.get('/todo', async (req, res) => {
    const todo = await Task.query()
    .select('assignee', 'name', 'taskid', 'deadline')
    .where('taskstatus', 'todo')
    .orderBy('ordernum')

    console.log(todo[0] instanceof Task) // --> true

    res.status(200).json(todo)
})

router.get('/inprogress', async (req, res) => {
    const inprogress = await Task.query()
    .select('assignee', 'name', 'taskid', 'deadline')
    .where('taskstatus', 'inprogress')
    .orderBy('ordernum')

    console.log(inprogress[0] instanceof Task) // --> true

    res.status(200).json(inprogress)
})

router.get('/fortesting', async (req, res) => {
    const fortesting = await Task.query()
    .select('assignee', 'name', 'taskid', 'deadline')
    .where('taskstatus', 'fortesting')
    .orderBy('ordernum')

    console.log(fortesting[0] instanceof Task) // --> true

    res.status(200).json(fortesting)
})

router.get('/done', async (req, res) => {
    const done = await Task.query()
    .select('assignee', 'name', 'taskid', 'deadline')
    .where('taskstatus', 'done')
    .orderBy('ordernum')

    console.log(done[0] instanceof Task) // --> true

    res.status(200).json(done)
})

router.get('/invalid', async (req, res) => {
    const invalid = await Task.query()
    .select('assignee', 'name', 'taskid', 'deadline')
    .where('taskstatus', 'invalid')
    .orderBy('ordernum')

    console.log(invalid[0] instanceof Task) // --> true

    res.status(200).json(invalid)
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

router.put('/:taskid/comment', async (req, res) => {
    const {taskid} = req.params
    const {comment, commenter} = req.body
    if (!comment && !commenter) {
        return res
        .status(400)
        .json({success: false, msg: 'Incomplete Inputs'})
    }

    jsonComment = JSON.stringify({
        comment: comment, 
        commenter: commenter,
    })

    const insertComment = await Task.query()
    .findById(taskid)
    .patch({
        comments: jsonComment
    })
        
    console.log(insertComment instanceof Task); // --> true
    
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

router.put('/movedown/:draggableId/:indexDestination/:indexSource', async (req, res) => {
    const {draggableId, indexDestination, indexSource} = req.params
    const addedIndexDestination = parseInt(indexDestination) + 1

    console.log(draggableId, '-', indexDestination, '-', indexSource, '-', addedIndexDestination)

    const knex = Task.knex()

    await knex.raw(`
        UPDATE tbTasks
        SET ordernum = ${addedIndexDestination}
        WHERE taskid = ${draggableId}
    `)

    await knex.raw(`
        UPDATE tbTasks
        SET ordernum = ordernum - 1
        WHERE (taskid != ${draggableId}) AND (ordernum <= ${addedIndexDestination}) AND (ordernum > ${indexSource})
    `)

    res.status(200).json({ success:true })
})

router.put('/moveup/:draggableId/:indexDestination/:indexSource', async (req, res) => {
    const {draggableId, indexDestination, indexSource} = req.params
    const addedIndexDestination = parseInt(indexDestination) + 1

    const knex = Task.knex()

    await knex.raw(`
        UPDATE tbTasks
        SET ordernum = ${addedIndexDestination}
        WHERE taskid = ${draggableId}
    `)

    await knex.raw(`
        UPDATE tbTasks
        SET ordernum = ordernum + 1
        WHERE (taskid != ${draggableId}) AND (ordernum <= ${indexSource}) AND (ordernum >= ${addedIndexDestination})
    `)

    res.status(200).json({ success:true })
})

router.put('/movetable/:droppableIdSource/:droppableIdDestination/:draggableId/:indexDestination/:indexSource', async (req, res) => {
    const {droppableIdSource, droppableIdDestination, draggableId, indexDestination, indexSource} = req.params
    
    const knex = Task.knex()

    await knex.raw(`
        UPDATE tbTasks
        SET taskstatus = '${droppableIdDestination}', ordernum = ${indexDestination} + 1
        WHERE taskid = ${draggableId}
    `)

    await knex.raw(`
        UPDATE tbTasks
        SET ordernum = ordernum - 1
        WHERE (taskstatus = '${droppableIdSource}') AND (ordernum > ${indexSource})
    `)

    await knex.raw(`
        UPDATE tbTasks
        SET ordernum = ordernum + 1
        WHERE (taskstatus = '${droppableIdDestination}') AND (taskid != ${draggableId}) AND (ordernum > ${indexDestination})
    `)

    res.status(200).json({ success:true })
})

router.put('/update/:taskid', async (req, res) => {
    const {taskid} = req.params
    const {name, description, email, contact} = req.body
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
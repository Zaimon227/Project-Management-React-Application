const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const knex = require('./database')

const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)

app.use(express.json())
app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    // SOCKETS FOR REORDER SAME STATUS DATA
    socket.on("send_changeSameStatusTodo", (data) => {
        socket.broadcast.emit("receive_changeSameStatusTodo", data)
    })
    socket.on("send_changeSameStatusInprogress", (data) => {
        socket.broadcast.emit("receive_changeSameStatusInprogress", data)
    })
    socket.on("send_changeSameStatusFortesting", (data) => {
        socket.broadcast.emit("receive_changeSameStatusFortesting", data)
    })
    socket.on("send_changeSameStatusDone", (data) => {
        socket.broadcast.emit("receive_changeSameStatusDone", data)
    })
    socket.on("send_changeSameStatusInvalid", (data) => {
        socket.broadcast.emit("receive_changeSameStatusInvalid", data)
    })

    // SOCKETS FOR CHANGE DIFFERENT STATUS DATA
    socket.on("send_changeDiffStatusTodo", (data) => {
        socket.broadcast.emit("receive_changeDiffStatusTodo", data)
    })
    socket.on("send_changeDiffStatusInprogress", (data) => {
        socket.broadcast.emit("receive_changeDiffStatusInprogress", data)
    })
    socket.on("send_changeDiffStatusFortesting", (data) => {
        socket.broadcast.emit("receive_changeDiffStatusFortesting", data)
    })
    socket.on("send_changeDiffStatusDone", (data) => {
        socket.broadcast.emit("receive_changeDiffStatusDone", data)
    })
    socket.on("send_changeDiffStatusInvalid", (data) => {
        socket.broadcast.emit("receive_changeDiffStatusInvalid", data)
    })

    // SOCKET FOR CHANGE NOTIFICATION
    socket.on("send_diffStatusNotification", (data) => {
        socket.broadcast.emit("receive_diffStatusNotification", data)
    })
})

// MORGAN LOGGER
app.use(morgan('dev'))

// ROUTES IMPORT
const contactsRoutes = require('./routes/contacts')
const usersRoutes = require('./routes/users')
const tasksRoutes = require('./routes/tasks')
const religionRoutes = require('./routes/religion')
const nationalityRoutes = require('./routes/nationality')
const civilstatusRoutes = require('./routes/civilstatus')

// UTILIZING ROUTES
app.use('/contact', contactsRoutes)
app.use('/user', usersRoutes)
app.use('/religion', religionRoutes)
app.use('/nationality', nationalityRoutes)
app.use('/civilstatus', civilstatusRoutes)
app.use('/task', tasksRoutes)

server.listen(3001, () => {
    console.log('Server is listening on port 3001.. ')
})
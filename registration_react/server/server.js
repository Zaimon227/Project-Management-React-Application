const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const knex = require('./database')

// ROUTES IMPORT
const contactsRoutes = require('./routes/contacts')
const usersRoutes = require('./routes/users')
const tasksRoutes = require('./routes/tasks')
const religionRoutes = require('./routes/religion')
const nationalityRoutes = require('./routes/nationality')
const civilstatusRoutes = require('./routes/civilstatus')


app.use(express.json())
app.use(cors())

// MORGAN LOGGER
app.use(morgan('dev'))

// UTILIZING ROUTES
app.use('/contact', contactsRoutes)
app.use('/user', usersRoutes)
app.use('/religion', religionRoutes)
app.use('/nationality', nationalityRoutes)
app.use('/civilstatus', civilstatusRoutes)
app.use('/task', tasksRoutes)

app.listen(5000, () => {
    console.log('Server is listening on port 5000.. ')
})
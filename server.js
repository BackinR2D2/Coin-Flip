require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const path = require('path')
const mongoose = require('mongoose')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const hp = require('./routes/home')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname, '/public')))
app.use(cookieParser())

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((result) => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
        console.log('connected to DB')
    })
    .catch((err) => {
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use(hp)
app.use((req, res) => {
    res.redirect('/home')
})
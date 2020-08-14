const router = require('express').Router()
const Chatters = require('../models/chatters')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.USERPASS
    }
})

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const emailExists = await Chatters.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json({ msg: 'Email exists' })

    const usernameExists = await Chatters.findOne({ name: req.body.username })
    if (usernameExists) return res.status(400).json({ msg: 'Username is taken' })

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(req.body.email).toLowerCase());

    if ((req.body.username).length < 6) return res.status(400).json({ msg: 'Username must have at least 6 characters' })
    if ((req.body.password).length < 6) return res.status(400).json({ msg: 'Password must have at least 6 characters' })

    if (!validEmail) return res.status(400).json({ msg: 'Invalid email' })
    const chatters = new Chatters({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    const options = {
        from: process.env.USERMAIL,
        to: req.body.email,
        subject: 'Howdy!!',
        html: '<b>Hello and have a great time on the website!</b>'
    }

    transporter.sendMail(options, (err, info) => {
        if (err) {
            res.status(400).json({ msg: err.message })
            return
        } else {
            res.json({ msg: info.response })
            return
        }
    })

    chatters.save()
        .then((resp) => {
            res.status(201).json({
                msg: 'Updated'
            })
            return
        })
        .catch((err) => {
            res.status(403).json({
                msg: err.message
            })
            return
        })
})

module.exports = router
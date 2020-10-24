const router = require('express').Router()
const Chatters = require('../models/chatters')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const emailExists = await Chatters.findOne({ email: req.body.email })
        if (emailExists) return res.status(400).json({ msg: 'Email exists' })

        const usernameExists = await Chatters.findOne({ name: req.body.username })
        if (usernameExists) return res.status(400).json({ msg: 'Username is taken' })

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(String(req.body.email).toLowerCase());

        if ((req.body.username).length === 0) return res.status(400).json({ msg: 'Username can not be empty' })
        if ((req.body.password).length < 6) return res.status(400).json({ msg: 'Password must have at least 6 characters' })

        if (!validEmail) return res.status(400).json({ msg: 'Invalid email' })
        const chatters = new Chatters({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const save = await chatters.save();
        res.status(201).json({
            msg: 'Updated'
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Some error occured... Try again'
        })
    }
})

module.exports = router
const router = require('express').Router()
const Chatters = require('../models/chatters')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    try {
        const user = await Chatters.findOne({ email: req.body.email, name: req.body.username })
        if (!user) return res.status(400).json({ msg: 'Email or username not correct' })
        const confirmPass = await bcrypt.compare(req.body.password, user.password)
        if (!confirmPass) return res.status(400).json({ msg: 'Password not correct' })
        if (user !== null && confirmPass) {
            const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '1d' })
            res.cookie('token', token, {
                httpOnly: true
            }).json({
                msg: 'OK'
            })
        }
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

module.exports = router
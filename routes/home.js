const router = require('express').Router()
const verify = require('./checkAuth')
const Chatter = require('../models/chatters')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.KEY)

router.get('/contact', verify, (req, res) => {
    res.render('contact')
})

router.post('/contact', verify, async (req, res) => {
    try {
        const userEmail = jwt.verify(req.cookies.token, process.env.SECRET).email
        const msg = {
            to: process.env.USERMAIL,
            from: process.env.USERMAIL,
            subject: req.body.title,
            html: `${req.body.message}. Text sent by: ${userEmail}`,
        }

        const mail = await sgMail.send(msg);
        res.json({
            status: 'OK'
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.get('/home', verify, (req, res) => {
    res.render('hp')
})

router.get('/coin-flip', verify, (req, res) => {
    res.render('flipCoin')
})

router.get('/guess-coin', verify, async (req, res) => {
    try {
        const id = jwt.verify(req.cookies.token, process.env.SECRET)._id
        const player = await Chatter.findOne({ _id: id })
        const score = player.score
        res.render('guessCoin', { score })
    } catch (error) {
        res.status(400).render('error')
    }
})

router.patch('/guess-coin', verify, async (req, res) => {
    try {
        const score = req.body.score
        const id = jwt.verify(req.cookies.token, process.env.SECRET)._id
        const updateScore = await Chatter.findByIdAndUpdate({ _id: id }, {
            score: score,
        })
        res.json(score)
    } catch (error) {
        res.status(500).render('error')
    }
})

router.get('/account', verify, async (req, res) => {
    try {
        const accID = jwt.verify(req.cookies.token, process.env.SECRET)._id
        const getData = await Chatter.findById({ _id: accID })
        const date = moment(getData.createdAt).format('YYYY-MM-DD')
        res.render('account', { getData, date })
    } catch (error) {
        res.status(400).render('error')
    }
})

router.patch('/account', verify, async (req, res) => {
    try {
        const username = req.body.username
        const usernameExists = await Chatter.findOne({ name: username })
        if (usernameExists) return res.status(400).json({
            message: 'Username is taken.'
        })
        const id = jwt.verify(req.cookies.token, process.env.SECRET)._id
        const updatedUsername = await Chatter.findByIdAndUpdate({ _id: id }, {
            name: username
        })
        res.status(201).json(username)
    } catch (error) {
        res.status(500).render('error')
    }
})

router.delete('/account', verify, async (req, res) => {
    try {
        const token = jwt.verify(req.cookies.token, process.env.SECRET)
        const chatter = await Chatter.findOneAndDelete({ _id: token._id })
        res.clearCookie('token').status(200).json({
            status: 'OK',
        })
    } catch (error) {
        res.status(400).render('error')
    }
})

router.get('/leaderboards', verify, async (req, res) => {
    try {
        const users = await Chatter.find().sort({ 'score': -1 })
        res.render('leaderboards', { users })
    } catch (error) {
        res.status(400).render('error')
    }
})

router.delete('/logout', verify, async (req, res) => {
    try {
        res.clearCookie('token').status(201).json({
            msg: 'OK'
        })
    } catch (error) {
        res.json({
            msg: error
        })
    }
})

module.exports = router
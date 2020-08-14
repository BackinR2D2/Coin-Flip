const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const situation = jwt.decode(req.cookies.token)
        if (situation == null) return res.redirect('/login')
        if (Date.now() >= situation.exp * 1000) {
            return res.status(401).json({ msg: 'Token expired. Login again.' })
        }
        if (!req.cookies.token) {
            return res.status(403).json({ msg: 'Login required.' })
        } else if (req.cookies.token) {
            return next()
        }
    } catch (error) {
        res.status(400).json({ msg: 'Some error occured. I am sorry!' })
    }
}
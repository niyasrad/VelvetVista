const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = require('express').Router()
const User =  require('../models/user.model')
const authVer = require('../utils/auth.utils')

router.post('/signup', async(req, res) => {

    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Please check your fields!"
        })
    }

    try {

        const findUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })
    
        if (findUser) {
            return res.status(400).json({
                message: "Email/Username already exists!"
            })
        }
    
        const hashedPass = await bcrypt.hash(req.body.password, 10)
    
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
    
        await user.save()

        const token = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY, { expiresIn: '2d' })
    
        return res.status(200).json({
            message: "Account initialized successfully!",
            token
        })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            message: "Something went wrong!"
        })

    }
})

router.post('/login', async (req, res) => {

    if (!req.body.handle || !req.body.password) {
        return res.status(400).json({
            message: "Please check your fields!"
        })
    }

    try {

        const findUser = await User.findOne({
            $or: [
                {
                    username: req.body.handle
                },
                {
                    email: req.body.handle
                }
            ]
        })

        if (!findUser) {
            return res.status(400).json({
                message: "Invalid Credentials!"
            })
        }

        const matchingPass = await bcrypt.compare(req.body.password, findUser.password)

        if (!matchingPass) {
            return res.status(400).json({
                message: "Invalid Credentials!"
            })
        }

        const token = jwt.sign({ username: findUser.username }, process.env.SECRET_KEY, { expiresIn: '2d' })

        return res.status(200).json({
            message: "Logged into account!",
            token,
            username: findUser.username
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }

})

router.get('/checkauth', authVer, (req, res) => {
    
    return res.status(200).json({
        username: req.username,
        message: "Logged In!"
    })

})

module.exports = router
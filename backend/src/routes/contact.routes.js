const router = require('express').Router()

const User = require('../models/user.model')
const Message = require('../models/message.model')
const authVer = require('../utils/auth.utils')

router.get('/getuser', authVer, async (req, res) => {

    const user = await User.findOne({ username: req.username })

    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    if (user.username == req.query.username) {
        return res.status(400).json({
            message: "You cannot add yourself!"
        })
    }

    const findUser = await User.findOne({ username: req.query.username })

    if (!findUser) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    return res.status(200).json({
        userID: findUser._id,
        username: findUser.username
    })

})

router.get('/chats', authVer, async (req, res) => {

    const user = await User.findOne({ username: req.username })

    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    try {

        const contacts = user.previousContacts

        const chats = []

        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i]
            const lastMessage = await Message.findOne({
                $or: [
                    { sender: user._id, receiver: contact },
                    { sender: contact, receiver: user._id }
                ]
            }).sort({ timestamp: -1 })

            const contactUser = await User.findById(contact)

            chats.push({
                userID: contact,
                name: contactUser.username,
                message: lastMessage.content,
                sentByUser: lastMessage.sender.equals(user._id),
                status: contactUser.onlineStatus.length > 0 ? 'online' : 'offline'
            })
        }

        return res.status(200).json({
            chats: chats
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    
})

router.get('/messages', authVer, async (req, res) => {

    const user = await User.findOne({ username: req.username })
    const otherUser = await User.findById(req.query.id)

    if (!user || !otherUser) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    try {
            
            const messages = await Message.find({
                $or: [
                    { sender: user._id, receiver: otherUser._id },
                    { sender: otherUser._id, receiver: user._id }
                ]
            }).sort({ timestamp: 1 })
    
            return res.status(200).json({
                username: otherUser.username,
                messages: messages
            })
    
        } catch (err) { 
            return res.status(500).json({
                message: err.message
            })
        }

})

module.exports = router
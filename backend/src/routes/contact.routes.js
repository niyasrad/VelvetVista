const router = require('express').Router()

const User = require('../models/user.model')
const Message = require('../models/message.model')
const authVer = require('../utils/auth.utils')

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
                sentByUser: lastMessage.sender == user._id
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
                messages: messages
            })
    
        } catch (err) { 
            return res.status(500).json({
                message: err.message
            })
        }

})

module.exports = router
const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    }
})

module.exports = mongoose.model('Message', messageSchema)
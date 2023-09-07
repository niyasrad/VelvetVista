const Message = require('../models/message.model')

const messageSocket = (io, socket) => {

    socket.on('sendMessage', async ({ sender, receiver, content }) => {

        const roomName = `private_${sender}_${receiver}`

        const newMessage = new Message({
            sender,
            receiver,
            content
        })
        await newMessage.save()

        io.to(roomName).emit('receiveMessage', { sender, receiver, message })

    })

}

module.exports = messageSocket
const Message = require('../models/message.model')

const messageSocket = (io, socket) => {

    socket.on('sendMessage', async ({ receiver, content }) => {

        const roomName = `private_${socket.userid}_${receiver}`

        const newMessage = new Message({
            sender: socket.userid,
            receiver,
            content
        })
        await newMessage.save()

        io.to(roomName).emit('receiveMessage', { sender: socket.userid , receiver, content })

    })

}

module.exports = messageSocket
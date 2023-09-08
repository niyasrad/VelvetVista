const Message = require('../models/message.model')
const User = require('../models/user.model')

const messageSocket = (io, socket) => {

    socket.on('sendMessage', async ({ receiver, content }) => {

        const user = await User.findOne({ username: socket.username })

        const roomName = `private_${socket.userid}_${receiver}`
        const lobbyNameOne = `private_${receiver}_lobby`
        const lobbyNameTwo = `private_${socket.userid}_lobby}`

        const newMessage = new Message({
            sender: socket.userid,
            receiver,
            content
        })
        await newMessage.save()

        if (!user.previousContacts.includes(receiver)) {
            user.previousContacts.push(receiver)
            await user.save()
        }

        io
        .to(roomName)
        .to(lobbyNameOne)
        .to(lobbyNameTwo)
        .emit('receiveMessage', { sender: socket.userid , receiver, content })

    })

}

module.exports = messageSocket
const Message = require('../models/message.model')
const User = require('../models/user.model')

const messageSocket = (io, socket) => {

    socket.on('sendMessage', async ({ receiver, content }) => {

        const userAccount = await User.findOne({ username: socket.username })
        const receiverAccount = await User.findById(receiver)

        const roomName = `private_${socket.userid}_${receiver}`
        const lobbyNameOne = `private_${receiver}_lobby`
        const lobbyNameTwo = `private_${socket.userid}_lobby`

        const newMessage = new Message({
            sender: socket.userid,
            receiver,
            content
        })
        await newMessage.save()

        if (!userAccount.previousContacts.includes(receiver)) {
            userAccount.previousContacts.push(receiver)
            await userAccount.save()
        }
        if (!receiverAccount.previousContacts.includes(socket.userid)) {    
            receiverAccount.previousContacts.push(socket.userid)
            await receiverAccount.save()
        }

        io 
        .to(roomName)
        .to(lobbyNameOne)
        .to(lobbyNameTwo)
        .emit('receiveMessage', { 
            sender: socket.userid,
            senderName: userAccount.username,
            receiver,
            receiverName: receiverAccount.username,
            content 
        })

    })

}

module.exports = messageSocket
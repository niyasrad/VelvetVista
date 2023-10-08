const { Server } = require("socket.io")

const User = require('../models/user.model')

const roomSocket = require('./room.socket')
const messageSocket = require('./message.socket')
const authSocket = require('./auth.socket')

const combineSockets = (server) => {

    const io = new Server(server, {
        cors: {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
    })

    io.use(authSocket)

    io.on("connection", async (socket) => {

        const user = await User.findById(socket.userid)
        if (user) {
            user.onlineStatus.push(socket.id)
            await user.save()
        }
        
        io.emit('userOnline', { 
            userID: socket.userid,
        })

        console.log(`User connected with socket id: ${socket.id}`) 

        roomSocket(io, socket)
        messageSocket(io, socket)
        
        socket.on('disconnect', async () => {
            const user = await User.findById(socket.userid)
            if (user) {
                user.onlineStatus = user.onlineStatus.filter((id) => id !== socket.id)
                await user.save()
            }

            io.emit('userOffline', {
                userID: socket.userid
            })

            console.log(`User disconnected with socket id: ${socket.id}`)
        })

    })

}

module.exports = combineSockets
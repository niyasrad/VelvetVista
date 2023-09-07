const { Server } = require("socket.io")

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

    io.on("connection", (socket) => {

        console.log(`User connected with socket id: ${socket.id}`)

        roomSocket(io, socket)
        messageSocket(io, socket)
        
        socket.on('disconnect', () => {
            console.log(`User disconnected with socket id: ${socket.id}`)
        })

    })

}

module.exports = combineSockets
const jwt = require('jsonwebtoken')
const { Server } = require("socket.io")

const roomSocket = require('./room.socket')
const messageSocket = require('./message.socket')

const combineSockets = (server) => {

    const io = new Server(server, {
        cors: {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
    })

    io.use((socket, next) => {

        const token = socket.handshake.auth.token
        if (!token) {
            return next(new Error("No Token Provided"))
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            socket.username = decoded.username
            next()

        } catch (err) {
            return next(new Error("Authentication failed: Invalid Token"));
        }
        
    })

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
const { Server } = require("socket.io")

const combineSockets = (server) => {

    const io = new Server(server, {
        cors: {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
    })

    io.on("connection", (socket) => {
        console.log(`User connected with socket id: ${socket.id}`)

        socket.on('disconnect', () => {
            console.log(`User disconnected with socket id: ${socket.id}`);
        })
    })

}

module.exports = combineSockets
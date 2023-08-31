const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

app.use(cors())
app.use(morgan('dev'))

app.get('/server', (req, res) => {
    return res.status(200).json({
        message: "Server Up and Running!"
    })
})

app.get('*', (req, res) => {
    return res.status(400).json({
        message: "Request Not Found!"
    })
})

const port = process.env.PORT || 8080

server.listen(port, () => {
    console.log(`---LISTENING ON PORT ${port}---`)
})
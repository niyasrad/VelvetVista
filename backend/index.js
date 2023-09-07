require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { createServer } = require('http')

const app = express()
const httpServer = createServer(app)

const combineRoutes = require('./src/routes')
const combineMiddleware = require('./src/utils')
const combineSockets = require('./src/sockets')

combineMiddleware(app)
combineRoutes(app)
combineSockets(httpServer)

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is up!"
    })
})

const portNumber = process.env.PORT || 8080

httpServer.listen(portNumber, () => {
    console.log(`---SERVER LISTENING AT PORT ${portNumber}---`)
    mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("---Connected to DB!---") })
    .catch(() => { console.log("----DB Connection Failed!---")})
})

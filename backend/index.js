require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const combineRoutes = require('./src/routes')
const combineMiddleware = require('./src/utils')

combineMiddleware(app)
combineRoutes(app)

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is up!"
    })
})

const portNumber = process.env.PORT || 8080

app.listen(portNumber, () => {
    console.log(`---SERVER LISTENING AT PORT ${portNumber}---`)
    mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("---Connected to DB!---") })
    .catch(() => { console.log("----DB Connection Failed!---")})
})

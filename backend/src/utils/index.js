const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const combineMiddleware = (app) => {
    app.use(cors())
    app.use(morgan('tiny'))
    app.use(express.json())
}

module.exports = combineMiddleware
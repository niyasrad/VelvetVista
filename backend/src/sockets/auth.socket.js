const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

const authSocket = async (socket, next) => {
        
    const token = socket.handshake.headers.token
    if (!token) {
        return next(new Error("No Token Provided"))
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        socket.username = decoded.username

        const user = await User.findOne({ username: decoded.username })
        if (!user) {
            return next(new Error("Authentication Failed!"))
        }

        socket.userid = user._id
        next()
    } catch (err) {
        console.log(err)
        return next(new Error("Authentication failed!"));
    }
    
}

module.exports = authSocket
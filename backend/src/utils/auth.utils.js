const jwt = require('jsonwebtoken')

const authVer = async (req, res, next) => {

    if (!req.headers["authorization"]) {
        return res.status(403).json({
            message: "You are not authorized to access this resource!"
        })
    }

    try {

        const token = req.headers["authorization"].split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.username = decoded.username

    } catch (err) {
        
        return res.status(400).json({
            message: "Invalid/Expired Token!"
        })

    }
    
    next()

}

module.exports = authVer
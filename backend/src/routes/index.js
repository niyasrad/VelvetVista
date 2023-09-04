const userRoute = require('./user.routes')

const combineRoutes = (app) => {
    app.use('/user', userRoute)
}

module.exports = combineRoutes
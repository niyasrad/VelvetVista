const userRoute = require('./user.routes')
const contactRoute = require('./contact.routes')

const combineRoutes = (app) => {
    app.use('/user', userRoute)
    app.use('/contact', contactRoute)
}

module.exports = combineRoutes
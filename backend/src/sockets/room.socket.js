const roomSocket = (io, socket) => {

    socket.on('joinRoom', ({ userId, secondUserId }) => {

        const roomName = `private_${userId}_${secondUserId}`
        socket.join(roomName)

    })

    socket.on('leaveRoom', ({ userId, secondUserId }) => {

        const roomName = `private_${userId}_${secondUserId}`
        socket.leave(roomName)
        
    })


}

module.exports = roomSocket
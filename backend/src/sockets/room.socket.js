const roomSocket = (io, socket) => {

    socket.on('joinRoom', ({ receiver }) => {

        const sortedUserIds = [socket.userid, receiver].sort()
        const roomName = `private_${sortedUserIds[0]}_${sortedUserIds[1]}`
        socket.join(roomName)

    })

    socket.on('leaveRoom', ({ receiver }) => {

        const sortedUserIds = [socket.userid, receiver].sort()
        const roomName = `private_${sortedUserIds[0]}_${sortedUserIds[1]}`
        socket.leave(roomName)
        
    })
    
    socket.on('joinLobby', () => {

        const roomName = `private_${socket.userid}_lobby`
        socket.join(roomName)

    })

    socket.on('leaveLobby', () => {

        const roomName = `private_${socket.userid}_lobby`
        socket.leave(roomName)
        
    })

}

module.exports = roomSocket
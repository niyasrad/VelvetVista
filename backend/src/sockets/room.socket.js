const roomSocket = (io, socket) => {

    socket.on('joinRoom', async ({ receiver }) => {

        const sortedUserIds = [socket.userid, receiver].sort()
        const roomName = `private_${sortedUserIds[0]}_${sortedUserIds[1]}`
        socket.join(roomName)

    })
    
    socket.on('joinLobby', async () => {

        const roomName = `private_${socket.userid}_lobby`
        socket.join(roomName)
        
    })

}

module.exports = roomSocket
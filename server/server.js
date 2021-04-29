const WebSocket = require('ws')

// Server Peer-Peer

const rooms = new Map()

const server = new WebSocket.Server({
    port: 3000
})

// On connection
server.on('connection', (socket, request) => {

    const room = request.url.replace('/', '').split('room=')[1].slice(0, 7)
    // Get room name

    const maxMembers = request.url.replace('/', '').split('limit=')[1].split(0, 1)
    // Can only be 1-9 Single digit
    
    // Handle messages. peer2peer messaging.
    socket.on('message', (chunk) => {

        const data = chunk

        const json = JSON.parse(data)

        const roomClients = rooms.get(room)['clients']

        for (let i = 0; i < roomClients.length; i++) {

            if (i === json['id']) return
            // -- Only send it to other players.

            roomClients[i].send(data)
            
        }

    })

    if (room.length > 7) {

        socket.send('Room ID Too Long.')

        socket.terminate()

        return
        
    }

    if (rooms.has(room) && rooms.get(room)['clients'].length > rooms.get(room)['limit']) {

        socket.send('Room is full.')

        socket.terminate()

        return
        
    }

    // Accept user.

    if (!rooms.has(room)) rooms.set(room, {
        name: room,
        clients: [],
        limit: maxMembers
    })

    // Add client to list
    rooms.get(room)['clients'].push(socket)

    // Give user their id. (incremental)

    socket.send(JSON.stringify({
        id: rooms.get(room)['clients'].length
    }))

})
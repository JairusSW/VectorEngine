const WebSocket = require('ws')

// Client

const room = '1234567'
// Room ID (Must be 7 char long)

const limit = 2
// Room Limit

let id1 = null

let id2 = null

const client1 = new WebSocket(`ws://localhost:3000/?room=${room}&limit=${limit}`)

const client2 = new WebSocket(`ws://localhost:3000/?room=${room}&limit=${limit}`)

client1.on('message', (chunk) => {

    const data = JSON.parse(chunk.toString())

    if (id1 === null) return id1 = data['id']

    console.log('Client1: ', data)

})

client2.on('message', (chunk) => {

    const data = JSON.parse(chunk.toString())

    if (id2 === null) return id2 = data['id']

    console.log('Client2: ', data)

})

client1.on('open', () => {

    setInterval(() => {
        
        client1.send(JSON.stringify({
            room: room,
            id: id1,
            data: {
                playerPosition: {
                    x: 0,
                    y: 0
                }
            }
        }))

    }, 100);

})

client2.on('open', () => {

    setInterval(() => {
        
        client2.send(JSON.stringify({
            room: room,
            id: id2,
            data: {
                playerPosition: {
                    x: 0,
                    y: 0
                }
            }
        }))

    }, 100);

})
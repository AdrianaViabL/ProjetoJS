//para instalar o nodemon(usado nessa parte) => npm i -D nodemon
import SocketServer from './socket.js'
import Event from 'events'
import { constants } from './constants.js'

const eventEmitter = new Event()

async function testServer(){
    const options = {
        port: 9898,
        host: 'localhost',
        headers:{ 
            Connection: 'Upgrade',
            Upgrade: 'WebSocket'
        }
    }

    const http = await import('http')
    const req = http.request(options)
    req.end()

    req.on('upgrade', (res, socket) => {
        socket.on('data', data => {
            console.log('cliente recebido', data.toString())
        })
        setInterval(() => {
            socket.write('ola!')
        }, 500)
    }) 
}
const port = process.env.PORT || 9898;
const socketServer = new SocketServer({ port })
const server = await socketServer.initialize(eventEmitter)
console.log('ta rodando na porta O.o ', server.address().port)

eventEmitter.on(constants.event.NEW_USER_CONNECTED, (socket) =>{
    console.log('new connectio n!! ', socket.id)
    socket.on('data', data => {
        console.log('server recebido', data.toString())
        socket.write('World!')
    })
})

await testServer()
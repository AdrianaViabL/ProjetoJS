import http from 'http'

export default class SocketServer {
    constructor({port}){
        this.port = port
    }
    async initialize(eventEmitter){
        const server = http.createServer((req, res)=> {
            res.writeHead(200, { 'Content-Type':'text/plain' })
            res.end('deu certo? O.o')
        })

        return new Promise((resolve, reject) => {
            server.on('error', reject)
            server.listen(this.port, () => resolve(server))
        })
        
    }
}
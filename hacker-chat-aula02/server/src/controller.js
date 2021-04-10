//divide a responsabilidade ao mapear os dados que vierem do socket
export default class Controller{
    #users = new Map() //propriedade privada
    constructor({ socketServer }){
        this.socketServer = socketServer
    }
    onNewConnection(socket){
        const { id } = socket
        console.log('conexao estabelecida com ', id)
        const userData = { id, socket }
        this.#updateGlobalUserData(id, userData)

        socket.on('data', this.#onSocketData(id))
        socket.on('erro', this.#onSocketClosed(id))
        socket.on('end', this.#onSocketClosed(id))
    }

    #onSocketClosed(id){//pega o evento que foi disparado
        return data => {
            console.log('socket closed? ', data.toString())
        }
    }

    #onSocketData(id){//pega o evento que foi disparado
        return data => {
            console.log('evento disparado? ', data.toString())
        }
    }
    //controle dos usuarios globais
    #updateGlobalUserData(socketId, userData){
        const users = this.#users
        const user = users.get(socketId) ?? {}//se nao encontrar inicia vazia
        
        const updatedUserData = {
            ...user,
            ...userData
        }
        users.set(socketId, updatedUserData)
        return users.get(socketId)
    }
}
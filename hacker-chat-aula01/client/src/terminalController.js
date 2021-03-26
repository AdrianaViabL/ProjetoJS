//intermediário responsável pela atualização da tela responsavel pelo recebimento das regras de negocio e delegação das atividades(atualizar terminal etc...) mas nao tem permissao para acessar os comandos do terminal
 
import ComponentsBuilder from './components.js'
import { constants } from './constants.js'

export default class TerminalController {

    #usersColors = new Map()
    
    constructor(){}

    #pickCollor(){
        return `#${((1 << 24) * Math.random() | 0).toString(16)}-fg`//criando um RGB randomicamente O.O
    }
    #getUserCollor(username){
        if(this.#usersColors.has(username)) 
            return this.#usersColors.get(username)
        
        const collor = this.#pickCollor()
        this.#usersColors.set(username, collor)

        return collor
    }

    #onInputReceived(eventEmitter){
        return function(){
            const message = this.getValue()
            console.log(message)
            this.clearValue()
        }
    }

    #onMessageReceived({ screen, chat}){
        return msg => {
            const {username, message} = msg
            const collor = this.#getUserCollor(username)
            chat.addItem(`{${collor}}{bold}${username}{/}: ${message}`)
            screen.render()
        }
    }

    #onLogChanged({ screen, activityLog }){
        return msg => {
            const [username] = msg.split(/\s/)
            const collor = this.#getUserCollor(username)
            activityLog.addItem(`{${collor}}{bold}${msg.toString()}{/}`)

            screen.render()
            
        }
    }

    #onStatusChanged({ screen, status }){
        return users => {
            //pegando o primeiro elemento da lista
            const {content} = status.items.shift()
            status.clearItems()
            status.addItem(content)
            users.forEach(username => {
                const collor = this.#getUserCollor(username)
                status.addItem(`{${collor}}{bold}${username}{/}`)
            })
            screen.render()
        }
    }

    #registerEvents(eventEmitter, components){
        eventEmitter.on(constants.events.app.MESSAGE_RECEIVED, this.#onMessageReceived(components))
        eventEmitter.on(constants.events.app.ACTIVITYLOG_UPDATED, this.#onLogChanged(components))
        eventEmitter.on(constants.events.app.STATUS_UPDATED, this.#onStatusChanged(components))

        /* exemplo de captura dos textos digitados
        eventEmitter.emit('turma01', 'hey')//envia a informação 
        eventEmitter.on('turma01', msg => console.log(msg.toString))//recebe a informação*/
    }

    //classe inicializadora central
    async initializeTable(eventEmitter){
        const components = new ComponentsBuilder()
            .setScreen({ title: 'HackerChat - Adriana'})
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .setChatComponent()
            .setActivityLogComponent()
            .setStatusComponent()
            .build()

        this.#registerEvents(eventEmitter, components)
        
        components.input.focus()
        components.screen.render()

        /*setInterval(() => {
            const users = ['Adriana']
            eventEmitter.emit(constants.events.app.STATUS_UPDATED, users)
            users.push('Mariazinha')
            eventEmitter.emit(constants.events.app.STATUS_UPDATED, users)
            users.push('teste1', 'teste02')
            eventEmitter.emit(constants.events.app.STATUS_UPDATED, users)
            users.push('camarão', 'sardinha')
           eventEmitter.emit(constants.events.app.STATUS_UPDATED, users)
        }, 1000)*/
    }
}
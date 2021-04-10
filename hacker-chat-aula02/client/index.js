/* RODAR O COMANDO npm ci (dentro do client) PARA FAZER ELE VOLTAR A FUNCIONAR
como o projeto será rodado
node index.js \
    --username Adriana \
    --room sala \
    --hosturl localhost


*/

import Events from 'events'
import CliConfig from './src/cliConfig.js';
import SocketClient from './src/socket.js'
import TerminalController from "./src/terminalController.js";

 
const [nodePath, filePath, ...commands] = process.argv
const config = CliConfig.parseArguments(commands)
console.log('config', config)

const componentEmitter = new Events()
const socketClient = new SocketClient(config)
await socketClient.initialize()

/*const controller = new TerminalController() //inicializando o objeto
await controller.initializeTable(componentEmitter)*/
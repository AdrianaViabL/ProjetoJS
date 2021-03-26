/* como o projeto será rodado
node index.js \
    --username Adriana \
    --room sala \
    --hosturl localhost
*/

import Events from 'events'
import CliConfig from './src/cliConfig.js';
import TerminalController from "./src/terminalController.js";
 
const [nodePath, filePath, ...commands] = process.argv
const config = CliConfig.parseArguments(commands)
console.log('config', config)

const componentEmitter = new Events()

/*const controller = new TerminalController() //inicializando o objeto
await controller.initializeTable(componentEmitter)*/
import Events from 'events'
import TerminalController from "./src/terminalController.js";

const componentEmitter = new Events()

const controller = new TerminalController() //inicializando o objeto
await controller.initializeTable(componentEmitter)
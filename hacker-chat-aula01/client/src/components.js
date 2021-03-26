//constroi o layout sob demanda
import blessed from 'blessed'
export default class ComponentsBuilder{
    #screen
    #layout
    #input
    #chat
    #status
    #activityLog

    constructor(){}

    #baseComponent(){//método privado
        return {//parametros que sao padrao em qualquer tela que for criada pelo blessed
            border: 'line',
            mouse:true,
            keys:true,
            top:0,
            scrollbar:{
                ch: ' ',
                inverse:true
            },
            //habilitando colocar tags e cores no texto
            tags:true
        }
    }

    setScreen({ title }){
        this.#screen = blessed.screen({
            smartCSR: true,
            title
        })
        this.#screen.key(['escape', 'q', 'C-c'], () => process.exit(0))
        return this
    }

    //componente pai
    setLayoutComponent(){
        this.#layout = blessed.layout({
            parent: this.#screen, //tela inicial
            width: '100%',
            height: '100%',  
        })
        return this
    }

    //componentes filhos
    setInputComponent(onEnterPressed){
        const input = blessed.textarea({
            parent: this.#screen,
            bottom: 0,
            height:"10%",
            inputOnFocus:true,//ja fica disponivel para interação
            padding:{
                top: 1,
                left: 2
            },
            style:{
                fg:'#f6f6f6',
                bg:'#353535'
            }
        })
        input.key('enter', onEnterPressed)
        this.#input = input

        return this
    }

    setChatComponent(){
        this.#chat = blessed.list({
            ...this.#baseComponent(),
            parent: this.#layout,
            align:'left',
            width: '50%',
            height: '90%',
            items:['{bold}Messenger{/}']
        })
        return this
    }

    //registra a quqantidade de usuarios logados
    setStatusComponent(){
        this.#status = blessed.list({
            ...this.#baseComponent(),
            parent: this.#layout,
            width: '25%',
            height: '90%',
            items:['{bold}Users on room{/}']

        })

        return this
    }

    //registra login e logout dos usuarios
    setActivityLogComponent(){
        this.#activityLog = blessed.list({
            ...this.#baseComponent(),
            parent: this.#layout,
            width: '25%',
            height: '90%',
            style:{
                fg:'yellow'//cor da letra
            },
            items:['{bold}Activity log{/}']

        })
        return this
    }

    build(){
        const components = {
            screen:this.#screen,
            input: this.#input,
            chat: this.#chat,
            status: this.#status,
            activityLog: this.#activityLog,
        }
        return components
    }

}
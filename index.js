const { select } = require('@inquirer/prompts')

const start = async () => {

    while (true) {
        
        const opcao = await select ({
            message: "Menu >",
            choices: [
              {
                name: "Cadastrar meta",
                value: "Cadastrar"
              },
              {
                name: "Listar Metas",
                value: "Listar"
              },
              {
                name: "Sair",
                value: "Sair"
              }
            ]
        })

        switch (opcao) {
            case "Cadastrar":
                console.log("vamos cadastrar")
                break
            case "Listar":
                console.log("vamos listar")
                break
            case "Sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()
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
                name: "Sair",
                value: "Sair"
              }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                return
        }
    }
}

start()
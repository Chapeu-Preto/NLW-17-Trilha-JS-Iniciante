const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = " App Metas ";

let metas 

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta: "})

    if (meta.length == 0) {
        mensagem = "A meta não pode ser vazia."
        return listarMetas
    }

    metas.push(
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso !"

}

const listarMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Não Existem metas cadastradas."
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para MARCAR ou DESMARCAR e o ENTER para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada."
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta 
        })

        meta.checked = true
    })

    mensagem = 'Meta(s) marcadas como concluida(s)'
}

const metasRealizadas = async () => {
    if (metas.length == 0) {
        mensagem = "Não Existem metas cadastradas."
        return
    }

    const Realizadas = metas.filter((meta)  => {
        return meta.checked
    })

    if (Realizadas.length == 0) {
        mensagem = 'Não existe metas realizadas ! :( '
        return
    }

    await select({
        message: "Metas Realizadas " + Realizadas.length,
        choices: [...Realizadas]
    })
}

const metasAbertas = async () => {
    if (metas.length == 0) {
        mensagem = "Não Existem metas cadastradas."
        return
    }

    const abertas = metas.filter((meta)=> {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = "Não existem metas abertas"
        return
    }

    await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Não Existem metas cadastradas."
        return
    }
    
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itemsADeletar = await checkbox({
        message: "Selecionar item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itemsADeletar.length == 0) {
        mensagem = "Nenhuma tarefa selecionada."
        return
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta deletada com sucesso."
}

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    
    await carregarMetas()
    
    while (true) {

        mostrarMensagem()
        await salvarMetas()

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
                name: "Metas Realizadas",
                value: "Realizadas"
              },
              {
                name: "Metas Abertas",
                value: "Abertas"
              },
              {
                name: "Deletar Metas",
                value: "Deletar"
              },
              {
                name: "Sair",
                value: "Sair"
              }
            ]
        })

        switch (opcao) {
            case "Cadastrar":
                await cadastrarMeta()
                break
            case "Listar":
                await listarMetas()
                break
            case "Realizadas":
                await metasRealizadas()
                break
                case "Abertas":
                await metasAbertas()
                break
                case "Deletar":
                await deletarMetas()
                break
            case "Sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()
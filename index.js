const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta: "})

    if (meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return listarMetas
    }

    metas.push(
        { value: meta, checked: false}
    )

}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para MARCAR ou DESMARCAR e o ENTER para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta 
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluida(s)')
}

const metasRealizadas = async () => {
    const Realizadas = metas.filter((meta)  => {
        return meta.checked
    })

    if (Realizadas.length == 0) {
        console.log('Não existe metas realizadas ! :( ')
        return
    }

    await select({
        message: "Metas Realizadas " + Realizadas.length,
        choices: [...Realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta)=> {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        console.log("Não existem metas abertas")
        return
    }

    await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itemsADeletar = await checkbox({
        message: "Selecionar item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itemsADeletar.length == 0) {
        console.log("Nenhuma tarefa selecionada.")
        return
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta deletada com sucesso.")
}

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
                console.log(metas)
                break
            case "Listar":
                await listarMetas()
                console.log(listarMetas)
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
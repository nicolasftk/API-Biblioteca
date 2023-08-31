const pool = require("../config/bd")

const cadastrarLivros = async (req, res) => {
    const { id } = req.params
    const { nome, genero, editora, data_publicacao } = req.body

    if (!nome || nome.trim().length === 0)
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' })

    const query = 'insert into livros (nome, genero, editora, data_publicacao, id_autor) values ($1, $2, $3, $4, $5) returning *'
    const body = [nome, genero, editora, data_publicacao, id]

    try {
        const novoLivro = await pool.query(query, body)
        const livroCadastrado = novoLivro.rows[0]
        const data = new Date(livroCadastrado.data_publicacao)
        const dataFormatada = data.toISOString().split('T')[0]

        const livroFormatado = {
            id: livroCadastrado.id,
            nome: livroCadastrado.nome,
            genero: livroCadastrado.genero,
            editora: livroCadastrado.editora,
            data_publicacao: dataFormatada
        };
        // return console.log(dataFormatada);
        return res.status(201).json(livroCadastrado)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro ao cadastrar o livro.' })
    }
}
const listarLivros = async (req, res) => {
    const query = `
        select  livros.id as livro_id, livros.nome as livro_nome,
                livros.genero as livro_genero,
                livros.editora as livro_editora, 
                livros.data_publicacao as livro_data_publicacao,    
                autores.id as autor_id, autores.nome as autor_nome,
                autores.idade as autor_idade
        from    livros join autores on livros.id_autor = autores.id `
    try {
        const livrosEncontrados = await pool.query(query)
        const livrosFormatados = []

        for (let i = 0; i < livrosEncontrados.rows.length; i++) {
            const row = livrosEncontrados.rows[i]
            const data = new Date(row.livro_data_publicacao)
            const dataFormatada = data.toISOString().split('T')[0]
            livrosFormatados.push({
                id: row.livro_id,
                nome: row.livro_nome,
                genero: row.livro_genero,
                editora: row.livro_editora,
                data_publicacao: dataFormatada,
                autor: {
                    id: row.autor_id,
                    nome: row.autor_nome,
                    idade: row.autor_idade
                }
            })

        }
        return res.json(livrosFormatados)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro ao localizar os livros.' })
    }
}

module.exports = {
    cadastrarLivros,
    listarLivros
}
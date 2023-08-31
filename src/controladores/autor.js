const pool = require("../config/bd")

const criarAutor = async (req, res) => {
    const { nome, idade } = req.body

    if (!nome || nome.trim().length === 0)
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' })

    const query = 'insert into autores (nome, idade) values ($1, $2) returning *'
    const body = [nome, idade]

    try {
        const novoAutor = await pool.query(query, body)
        return res.status(201).json(novoAutor.rows[0])

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro ao criar o autor.' })
    }
}

const buscarAutor = async (req, res) => {
    const { id } = req.params

    if (isNaN(id) || !id) {
        return res.status(404).json({ mensagem: 'Autor não encontrado' })
    }
    const query = `
    select  autores.id, autores.nome, autores.idade,
            livros.id as livro_id, livros.nome as livro_nome, livros.genero as livro_genero,
            livros.editora as livro_editora, cast(livros.data_publicacao as date) as livro_data_publicacao
    from    autores 
            join livros on autores.id = livros.id_autor 
    where   autores.id = $1`
    const params = [id]

    try {
        const autorEncontrado = await pool.query(query, params)
        if (autorEncontrado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Autor não encontrado' })
        }
        const livrosDoAutor = []
        for (let i = 0; i < autorEncontrado.rows.length; i++) {
            const row = autorEncontrado.rows[i];
            livrosDoAutor.push({
                id: row.livro_id,
                nome: row.livro_nome,
                genero: row.livro_genero,
                editora: row.livro_editora,
                data_publicacao: row.livro_data_publicacao.toISOString().split('T')[0]
            })
        }
        const autorDados = autorEncontrado.rows[0]
        const autorFormatado = {
            id: autorDados.id,
            nome: autorDados.nome,
            idade: autorDados.idade,
            livros: livrosDoAutor

        }
        return res.json(autorFormatado)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro ao localizar o autor.' })
    }

}



module.exports = {
    criarAutor,
    buscarAutor
}
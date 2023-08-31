const express = require('express')
const { criarAutor, buscarAutor } = require('./controladores/autor')
const { cadastrarLivros, listarLivros } = require('./controladores/livros')
const rotas = express()

rotas.post('/autor', criarAutor)
rotas.post('/autor/:id/livro', cadastrarLivros)
rotas.get('/autor/:id', buscarAutor)
rotas.get('/livro', listarLivros)

module.exports = rotas
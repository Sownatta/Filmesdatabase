const data = require('../models/data.json');
const express = require('express');
const filmesController = express.Router();


filmesController.get('/filmes', (req, res) => {
  res.json(data.filmes);
});

filmesController.get('/', (req, res) => {
  res.redirect('/filmes');
});

filmesController.get('/filmes/top10', (req, res) => {
  res.send("<h1>Top 10 Filmes!</h1>");
});

filmesController.get('/filmes/catalogo', (req, res) => {
  res.render("../views/catalogo.ejs");
});

filmesController.get('/filmes/:id', (req, res) => {
  const filmeId = parseInt(req.params.id);
  const filme = data.filmes.find(f => f.id === filmeId);

  if (!filme) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }

  res.json(filme);
});

filmesController.post('/filmes', (req, res) => {
  const novoFilme = req.body;

  if (!novoFilme.titulo || !novoFilme.ano) {
    return res.status(400).json({ error: 'Título e ano são campos obrigatórios' });
  }

  novoFilme.id = data.filmes.length + 1;
  data.filmes.push(novoFilme);

  res.status(201).json(novoFilme);
});

filmesController.put('/filmes/:id', (req, res) => {
  const filmeId = parseInt(req.params.id);
  const filmeIndex = data.filmes.findIndex(f => f.id === filmeId);

  if (filmeIndex === -1) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }

  const novoFilme = req.body;
  data.filmes[filmeIndex] = { ...data.filmes[filmeIndex], ...novoFilme };

  res.json(data.filmes[filmeIndex]);
});


filmesController.patch('/filmes/:id', (req, res) => {
  const filmeId = parseInt(req.params.id);
  const filmeIndex = data.filmes.findIndex(f => f.id === filmeId);

  if (filmeIndex === -1) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }

  const atualizacaoFilme = req.body;
  data.filmes[filmeIndex] = { ...data.filmes[filmeIndex], ...atualizacaoFilme };

  res.json(data.filmes[filmeIndex]);
});


filmesController.delete('/filmes/:id', (req, res) => {
  const filmeId = parseInt(req.params.id);
  const filmeIndex = data.filmes.findIndex(f => f.id === filmeId);

  if (filmeIndex === -1) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }

  data.filmes.splice(filmeIndex, 1);

  res.json({ message: 'Filme excluído com sucesso' });
});


module.exports = filmesController;

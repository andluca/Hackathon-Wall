// Definir as rotas específicas para o recurso 'ideas'

const { Router } = require('express');
const { getAllIdeas, createIdea } = require('../controllers/idea.controller');

const router = Router();

// GET / - Buscar todas as ideias
router.get('/', getAllIdeas);

// POST / - Criar uma nova ideia
router.post('/', createIdea);

module.exports = router;

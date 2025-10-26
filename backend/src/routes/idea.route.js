// Definir as rotas específicas para o recurso 'ideas'

import { Router } from 'express';
import { getAllIdeas, createIdea } from '../controllers/idea.controller.js';

const router = Router();

// GET / - Buscar todas as ideias
router.get('/', getAllIdeas);

// POST / - Criar uma nova ideia
router.post('/', createIdea);

export default router;

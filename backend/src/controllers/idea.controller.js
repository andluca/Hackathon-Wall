import { getAllIdeasService, createIdeaService } from '../services/idea.service.js';

/**
 * Controller para buscar todas as ideias.
 * @param {Request} req - Objeto de requisição Express
 * @param {Response} res - Objeto de resposta Express
 */
async function getAllIdeas(req, res) {
  console.log('[Controller] Recebida requisição GET /ideas');

  try {
    const ideas = await getAllIdeasService();
    res.status(200).json(ideas);
  } catch (error) {
    console.error('[Controller Error] getAllIdeas:', error.message);
    res.status(500).json({ message: error.message });
  }
}

/**
 * Controller para criar uma nova ideia.
 * @param {Request} req - Objeto de requisição Express
 * @param {Response} res - Objeto de resposta Express
 */
async function createIdea(req, res) {
  console.log('[Controller] Recebida requisição POST /ideas');

  try {
    const { name, ideaText } = req.body;
    const newIdea = await createIdeaService(name, ideaText);
    res.status(201).json(newIdea);
  } catch (error) {
    console.error('[Controller Error] createIdea:', error.message);

    if (error.message === 'Nome e ideia são obrigatórios.') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

export default {
  getAllIdeas,
  createIdea,
};

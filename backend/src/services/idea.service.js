import { findAllIdeasRepo, createIdeaRepo } from '../repositories/idea.repository.js';

/**
 * Busca todas as ideias através do repositório.
 * @returns {Promise<Array>} Array de ideias
 * @throws {Error} Lança erro caso haja falha no serviço
 */
async function getAllIdeasService() {
  try {
    const ideas = await findAllIdeasRepo();
    return ideas;
  } catch (error) {
    console.error('[Service Error] getAllIdeasService:', error.message);
    throw new Error('Falha ao buscar ideias no serviço.');
  }
}

/**
 * Cria uma nova ideia após validar os dados.
 * @param {string} name - Nome do autor da ideia
 * @param {string} ideaText - Texto da ideia
 * @returns {Promise<Array>} Array com o registro criado
 * @throws {Error} Lança erro de validação ou falha no serviço
 */
async function createIdeaService(name, ideaText) {
  // Regra de Negócio: Validação
  if (!name || !ideaText) {
    throw new Error('Nome e ideia são obrigatórios.');
  }

  try {
    const newIdea = await createIdeaRepo(name, ideaText);
    return newIdea;
  } catch (error) {
    console.error('[Service Error] createIdeaService:', error.message);
    throw new Error('Falha ao criar ideia no serviço.');
  }
}

export default {
  getAllIdeasService,
  createIdeaService,
};

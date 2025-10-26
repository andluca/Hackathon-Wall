import { supabase } from '../config/supabaseClient.js';

/**
 * Busca todas as ideias no banco de dados.
 * @returns {Promise<Array>} Array de ideias ordenadas por data de criação (mais recentes primeiro)
 * @throws {Error} Lança erro caso haja problema na consulta
 */
async function findAllIdeasRepo() {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Cria uma nova ideia no banco de dados.
 * @param {string} name - Nome do autor da ideia
 * @param {string} ideaText - Texto da ideia
 * @returns {Promise<Array>} Array com o registro criado
 * @throws {Error} Lança erro caso haja problema na inserção
 */
async function createIdeaRepo(name, ideaText) {
  const { data, error } = await supabase
    .from('ideas')
    .insert({ name: name, idea_text: ideaText })
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export { findAllIdeasRepo, createIdeaRepo };

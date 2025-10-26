// Camada de API do Front-end
// Cria funções reutilizáveis para buscar dados no back-end

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Interface
export interface Idea {
  id: number;
  created_at: string;
  name: string;
  idea_text: string;
}

// Função GET
export async function fetchIdeas(): Promise<Idea[]> {
  const res = await fetch(`${API_URL}/ideas`);
  
  if (!res.ok) {
    throw new Error('Falha ao buscar ideias');
  }
  
  return res.json();
}

// Função POST
export async function postIdea(name: string, ideaText: string): Promise<Idea> {
  const res = await fetch(`${API_URL}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, ideaText }),
  });
  
  if (!res.ok) {
    throw new Error('Falha ao criar ideia');
  }
  
  return res.json();
}

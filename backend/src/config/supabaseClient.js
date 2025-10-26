import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
	throw new Error('Variável de ambiente SUPABASE_URL não encontrada. Defina SUPABASE_URL no .env ou no ambiente.');
}

if (!SUPABASE_ANON_KEY) {
	if (!SUPABASE_SERVICE_ROLE_KEY) {
		throw new Error('Chave do Supabase não encontrada. Defina SUPABASE_ANON_KEY ou SUPABASE_SERVICE_ROLE_KEY no .env ou no ambiente.');
	}
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY, {
	auth: {
		persistSession: false,
	},
	// Timeout e outras opções podem ser adicionadas aqui
});

/**
 * Retorna um cliente Supabase com a Service Role Key (para operações administrativas).
 * Atenção: não exponha esse cliente em código que rode no browser.
 */
function getAdminClient() {
	if (!SUPABASE_SERVICE_ROLE_KEY) {
		throw new Error('SUPABASE_SERVICE_ROLE_KEY não encontrada. Não é possível criar cliente admin.');
	}
	return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: { persistSession: false },
	});
}

export default { supabase, getAdminClient };

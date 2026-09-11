let createClient;
try {
  ({ createClient } = require('@supabase/supabase-js'));
} catch (e) {
  // Stub de fallback caso o desenvolvedor ainda não tenha rodado npm install
  createClient = () => ({
    from: () => ({
      select: () => ({ order: () => ({ data: [], error: null }), maybeSingle: () => ({ data: null, error: null }), ilike: () => ({ data: [], error: null }) }),
      insert: () => ({ select: () => ({ single: () => ({ data: {}, error: null }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ maybeSingle: () => ({ data: {}, error: null }) }) }) }),
      delete: () => ({ eq: () => ({ error: null }) })
    })
  });
}

try {
  require('dotenv').config();
} catch (e) {
  // dotenv opcional se rodado antes do install
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '\n⚠️  [AVISO SUPABASE]: Variáveis SUPABASE_URL ou SUPABASE_ANON_KEY não configuradas no .env.' +
    '\n⚠️  Configure seu arquivo .env com base em .env.example para persistir dados no Supabase.\n'
  );
}

// Inicializa o cliente do Supabase
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

module.exports = supabase;

require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Fake Blog rodando com sucesso na porta ${PORT}!`);
  console.log(`📡 URL da API: http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs\n`);
});

const assert = require('assert');

// 1. Validar lógica de conversão do Model
const PostModel = require('../src/models/postModel');

console.log('🧪 Iniciando testes unitários dos componentes refatorados...');

// Teste de métodos estáticos do PostModel
assert.strictEqual(typeof PostModel.findAll, 'function', 'findAll deve ser uma função');
assert.strictEqual(typeof PostModel.findById, 'function', 'findById deve ser uma função');
assert.strictEqual(typeof PostModel.create, 'function', 'create deve ser uma função');
assert.strictEqual(typeof PostModel.update, 'function', 'update deve ser uma função');
assert.strictEqual(typeof PostModel.delete, 'function', 'delete deve ser uma função');
console.log('✅ PostModel: todos os métodos do CRUD estão definidos.');

// 2. Validar métodos do PostController
const PostController = require('../src/controllers/postController');
assert.strictEqual(typeof PostController.getAll, 'function', 'getAll deve existir no Controller');
assert.strictEqual(typeof PostController.getById, 'function', 'getById deve existir no Controller');
assert.strictEqual(typeof PostController.create, 'function', 'create deve existir no Controller');
assert.strictEqual(typeof PostController.update, 'function', 'update deve existir no Controller');
assert.strictEqual(typeof PostController.delete, 'function', 'delete deve existir no Controller');
assert.strictEqual(typeof PostController.getGamesCategory, 'function', 'getGamesCategory deve existir no Controller');
console.log('✅ PostController: todos os handlers do CRUD e categorias estão definidos.');

// 3. Teste de Validação de Payload no Controller (Simulação de requisição sem campos obrigatórios)
async function testControllerValidation() {
  const req = {
    body: {
      // Sem title, description ou profileName
      thumbImage: 'https://exemplo.com/teste.jpg'
    }
  };

  let capturedStatus = null;
  let capturedResponse = null;

  const res = {
    status(code) {
      capturedStatus = code;
      return this;
    },
    json(data) {
      capturedResponse = data;
      return this;
    }
  };

  await PostController.create(req, res);

  assert.strictEqual(capturedStatus, 400, 'Controller deve retornar 400 para payload sem title');
  assert.strictEqual(capturedResponse.status, 'error', 'Resposta deve indicar status error');
  console.log('✅ PostController.create: validação de payload inválido retornou HTTP 400 como esperado.');

  // Teste de ID inválido (NaN)
  const reqInvalidId = {
    params: { id: 'abc' }
  };

  await PostController.getById(reqInvalidId, res);
  assert.strictEqual(capturedStatus, 400, 'Controller deve retornar 400 para ID que não é número');
  console.log('✅ PostController.getById: validação de ID inválido retornou HTTP 400 como esperado.');
}

testControllerValidation().then(() => {
  console.log('\n🎉 Todos os testes unitários passaram com 100% de sucesso!');
}).catch(err => {
  console.error('❌ Falha no teste:', err);
  process.exit(1);
});

# 🚀 API Fake Blog - Documentação Técnica (v2.0)

API RESTful em **Node.js** e **Express** desenvolvida com arquitetura **MVC (Model-View-Controller)**, integração com o banco de dados relacional **Supabase (PostgreSQL)** e documentação interativa via **Swagger / OpenAPI 3.0**.

---

## 🏛️ Estrutura Arquitetural (MVC)

O projeto segue boas práticas de engenharia de software, com separação estrita de responsabilidades:

```text
api-fake-blog/
├── src/
│   ├── config/
│   │   ├── supabase.js         # Conexão e inicialização do cliente Supabase
│   │   └── swagger.js          # Configuração e esquemas OpenAPI 3.0 do Swagger
│   ├── controllers/
│   │   └── postController.js    # Regras de negócio, validações e status codes HTTP
│   ├── models/
│   │   └── postModel.js        # Camada de dados e interação direta com o Supabase
│   ├── routes/
│   │   └── postRoutes.js       # Definição dos endpoints e anotações JSDoc do Swagger
│   └── app.js                  # Configuração do Express, CORS, middlewares e Swagger UI
├── sql/
│   └── schema.sql              # Script DDL/DML para criação da tabela e seed no Supabase
├── public/
│   └── images/                 # Imagens estáticas e avatars
├── .env.example                # Modelo de variáveis de ambiente
├── .gitignore                  # Arquivos e diretórios ignorados pelo Git
├── package.json                # Gerenciador de dependências e scripts de execução
├── server.js                   # Ponto de entrada do servidor HTTP
└── app.js                      # Bootstrap de inicialização compatível
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18+) & **Express.js**
- **Supabase** (`@supabase/supabase-js`) - PostgreSQL como serviço
- **Swagger / OpenAPI 3.0** (`swagger-ui-express` & `swagger-jsdoc`)
- **Dotenv** - Gerenciamento seguro de variáveis de ambiente
- **CORS** - Compartilhamento de recursos entre origens distintas

---

## 📦 Como Configurar e Executar

### 1. Clonar e Instalar Dependências

Abra o terminal no diretório do projeto e execute:
```bash
npm install
```

### 2. Configurar o Banco de Dados no Supabase

1. Crie uma conta ou acesse seu projeto em [supabase.com](https://supabase.com).
2. Acesse o **SQL Editor** no painel do Supabase.
3. Copie o conteúdo do arquivo [`sql/schema.sql`](./sql/schema.sql) e clique em **Run**.
   - Isso criará a tabela `public.posts`, as políticas de segurança (RLS) e fará a inserção inicial dos dados de exemplo.
4. No painel do Supabase, vá em **Project Settings -> API** e copie:
   - **Project URL**
   - **anon / public key**

### 3. Configurar as Variáveis de Ambiente

Crie ou edite o arquivo `.env` na raiz do projeto:
```env
PORT=8080
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon-key-aqui
```

### 4. Iniciar a Aplicação

```bash
# Modo padrão:
npm start

# Modo desenvolvimento (com auto-reload):
npm run dev
```

O servidor estará acessível em `http://localhost:8080`.

---

## 📖 Documentação Interativa (Swagger)

Acesse a interface interativa do Swagger para visualizar todos os esquemas, parâmetros e testar as requisições em tempo real:

👉 **[http://localhost:8080/api-docs](http://localhost:8080/api-docs)**

---

## 🌐 Endpoints da API

| Método | Endpoint | Descrição | Status de Sucesso | Status de Erro |
| :--- | :--- | :--- | :---: | :---: |
| `GET` | `/postagens` | Lista todas as postagens (suporta `?category=games`) | `200 OK` | `500` |
| `GET` | `/postagens/:id` | Busca uma postagem específica por ID | `200 OK` | `400, 404, 500` |
| `POST` | `/postagens` | Cria uma nova publicação | `201 Created` | `400, 500` |
| `PUT` | `/postagens/:id` | Atualiza os dados de uma postagem por ID | `200 OK` | `400, 404, 500` |
| `DELETE` | `/postagens/:id` | Exclui permanentemente uma postagem | `200 OK` | `400, 404, 500` |
| `GET` | `/postagem/:id` | Alias retrocompatível para busca por ID | `200 OK` | `400, 404, 500` |
| `GET` | `/categoria/games` | Alias retrocompatível para postagens de jogos | `200 OK` | `500` |

### Exemplo de Payload para `POST /postagens`:
```json
{
  "title": "Novidades do Node.js",
  "description": "Explorando os novos recursos do runtime Node.js.",
  "profileName": "Felipe Dev",
  "thumbImage": "https://exemplo.com/imagem.jpg",
  "thumbImageAltText": "Banner Node.js",
  "profileThumbImage": "/images/profile-1.jpg",
  "category": "tecnologia"
}
```

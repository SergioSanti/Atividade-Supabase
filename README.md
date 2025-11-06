# Angular Supabase CRUD

Aplicação Angular completa com operações CRUD (Create, Read, Update, Delete) utilizando Supabase como backend.

## 📋 Estrutura do Projeto

```
angular-supabase-crud/
├─ package.json
├─ angular.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ src/
│ ├─ index.html
│ ├─ main.ts
│ ├─ styles.css
│ └─ app/
│ ├─ app.module.ts
│ ├─ app.component.ts
│ ├─ app.component.html
│ ├─ services/
│ │ └─ supabase.service.ts
│ ├─ models/
│ │ └─ item.ts
│ └─ items/
│ ├─ item-list.component.ts
│ ├─ item-list.component.html
│ ├─ item-form.component.ts
│ └─ item-form.component.html
└─ README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

### Configuração do Supabase

Antes de executar a aplicação, você precisa criar a tabela `items` no seu projeto Supabase:

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Selecione o projeto "Atividade Supabase"
3. Vá em SQL Editor
4. Execute o script SQL do arquivo `supabase-setup.sql` ou o seguinte SQL:

```sql
CREATE TABLE items (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Row Level Security (opcional, mas recomendado)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir todas as operações (para desenvolvimento)
CREATE POLICY "Allow all operations" ON items
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### Executar a Aplicação

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## 🎯 Funcionalidades

- ✅ **Create**: Criar novos itens
- ✅ **Read**: Listar todos os itens
- ✅ **Update**: Editar itens existentes
- ✅ **Delete**: Excluir itens

## 🛠️ Tecnologias Utilizadas

- Angular 17
- Supabase (JavaScript Client)
- TypeScript
- RxJS
- Angular Forms (Reactive Forms)

## 📝 Modelo de Dados

O modelo `Item` possui os seguintes campos:

- `id`: Identificador único (gerado automaticamente)
- `name`: Nome do item (obrigatório, mínimo 3 caracteres)
- `description`: Descrição do item (obrigatório)
- `price`: Preço do item (obrigatório, deve ser >= 0)
- `created_at`: Data de criação (gerado automaticamente)
- `updated_at`: Data de atualização (gerado automaticamente)

## 🔧 Configuração

### Informações do Projeto Supabase

- **URL da API**: `https://dbhxjvzodzaqamcsswsz.supabase.co`
- **Nome do Banco**: Atividade Supabase
- **API Key**: Já configurada no serviço `supabase.service.ts`

A API Key e URL do Supabase já estão configuradas no serviço `supabase.service.ts`. Se precisar alterar:

1. Abra `src/app/services/supabase.service.ts`
2. Atualize as constantes `SUPABASE_URL` e `SUPABASE_KEY`

**Nota**: A senha do banco de dados (`12345`) não é necessária para o cliente JavaScript do Supabase, apenas para acesso direto ao banco via ferramentas de administração.

## 📦 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila a aplicação para produção
- `npm test`: Executa os testes

## 🎨 Interface

A aplicação possui uma interface moderna e responsiva com:
- Design gradiente moderno
- Cards com sombras suaves
- Animações de hover nos botões
- Mensagens de erro e sucesso
- Validação de formulários em tempo real

## 📄 Licença

Este projeto é apenas para fins educacionais.

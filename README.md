# Todo Api

### Used Technical Stacks

- Express.js
- TypeScript
- Sequelize
- PostgreSQL
- Simple data validation using Ajv
- Simple image streaming

### Database Migration

You can reference `.env.example`.

```
NODE_ENV=development
PORT=3000
DB_DIALECT=postgres
DB_HOST=localhost
DB_NAME=todolist
DB_USERNAME=
DB_PASSWORD=
```

You need to change `DB_USERNAME` and `DB_PASSWORD` for your PostgreSQL Database.

Then, you can make `.env` in the root directory.

### 1. Clone Repo

If you want to clone this repo, go to the command line and run:

```bash
git clone git@github.com:aronesura/todo-Betterteam-BE.git
cd todo-Betterteam-BE
```

### 2. Install Dependencies

Prefer to use `pnpm`

```bash
pnpm i # yarn install
```

### 3. Run Development Environment

```bash
pnpm dev # yarn dev
```

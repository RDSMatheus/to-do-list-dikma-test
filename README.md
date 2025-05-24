# To-Do List Fullstack Project

Este projeto é uma aplicação de lista de tarefas (To-Do List) composta por três serviços principais, todos orquestrados via Docker Compose:

- **Frontend:** Aplicação Next.js
- **Backend:** API NestJS
- **Banco de Dados:** MongoDB

---

## Estrutura do Projeto

```
/
├── to-do-list         # Frontend (Next.js)
│   └── Dockerfile
├── to-do-list-api     # Backend (NestJS)
│   └── Dockerfile
├── compose.yaml       # Orquestração dos serviços
```

---

## Como rodar o projeto

1. **Pré-requisitos:**  
   - [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

2. **Suba todos os serviços:**

   ```sh
   docker compose up --build
   ```

3. **Acesse os serviços:**
   - **Frontend:** [http://localhost:3001](http://localhost:3001)
   - **Backend:** [http://localhost:3000](http://localhost:3000)
   - **MongoDB:** Porta 27017 (acesso interno entre containers)

---

## Variáveis de ambiente

- O backend utiliza a variável `MONGODB_URL` para se conectar ao banco de dados MongoDB.  
  Exemplo:  
  ```
  MONGODB_URL=mongodb://mongodb:27017/todolist
  ```

---

## Observações

- Os dados do MongoDB são persistidos no volume Docker `mongodb_data`.
- Certifique-se de que as portas 3000, 3001 e 27017 estejam livres na sua máquina.
- Use o arquivo `.dockerignore` nos diretórios do frontend e backend para evitar copiar arquivos desnecessários para as imagens.

---

## Scripts úteis

- **Parar os containers:**
  ```sh
  docker compose down
  ```
- **Ver logs:**
  ```sh
  docker compose logs -f
  ```

---

## Licença

Este projeto é apenas para fins de estudo.
# Entrega — Jhony Freitas

## Como rodar

Com o Docker instalado, basta rodar na raiz do projeto:

```bash
docker compose up -d
```

Isso sobe tudo de uma vez: banco (`db`), serviço de cadastro (`mock-service`), API (`api`) e front (`app`).

- API: `http://localhost:3000`
- Front: `http://localhost:5173`

## O que foi feito

**API (NestJS + TypeScript)** com 3 rotas:

- `POST /checkin`: recebe o CPF, busca o paciente no `mock-service` e registra o check-in.
- `GET /checkin`: lista a fila, ordenada por horário de chegada.
- `DELETE /checkin`: limpa a fila. Deixei para uso em desenvolvimento, e o front tem um botão equivalente.

Também tratei dois casos importantes:

- CPF não encontrado no cadastro: a API responde 404 com uma mensagem clara.
- Paciente que já fez check-in no mesmo dia: a API responde 409, evitando duplicidade na fila.

**Front (React)** com duas telas, navegáveis por uma sidebar:

- **Check-in:** formulário com máscara de CPF em tempo real.
- **Lista de pacientes:** exibe a fila e tem o botão de limpar.

O formulário é validado com React Hook Form + Zod, e as requisições usam Axios.

## Onde guardei os dados

Usei banco de dados: PostgreSQL, com Prisma como ORM. Escolhi banco em vez de memória porque ele já estava disponível no `docker-compose.yml` do desafio, e assim os dados não se perdem quando a API reinicia.

## Decisões e dificuldades

- Separei o tratamento do CPF (limpeza da máscara e validação) em um `Pipe` do Nest, o `CpfPipe`, dentro de `common/`. Assim posso reaproveitá-lo caso surja outra rota que receba CPF.
- A trava de check-in duplicado considera apenas o dia atual, então o mesmo paciente pode fazer check-in novamente em outro dia sem problemas.
- Optei por utilizar o Prisma como ORM para fazer a manipulação e facilitar a criação do banco com a migration

## O que faria com mais tempo

- Adicionar um indicador de carregamento na lista enquanto a API responde.
- Criar rotas para remover pacientes da fila conforme forem sendo atendidos.
- Incluir um formulário de cadastro de novos pacientes.
- Implementar paginação ou filtro na fila, para o caso de ela crescer muito ao longo do dia.
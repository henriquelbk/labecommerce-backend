-- Active: 1695427087850@@127.0.0.1@3306
CREATE TABLE customers (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	age INTEGER NOT NULL
);

-- comentário (iniciamos comentários com dois traços --)

-- nova query A aqui

-- nova query B aqui

-- opa, esqueci se a coluna age da tabela customers é INTEGER ou TEXT...
-- é só voltar lendo as queries e pronto!
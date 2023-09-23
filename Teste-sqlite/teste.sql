-- Active: 1695427087850@@127.0.0.1@3306
CREATE TABLE customers (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	age INTEGER NOT NULL
);

-- Visualizando dados de uma tabela

SELECT * FROM customers; 

-- Visualizando estrutura de uma tabela

PRAGMA table_info('customers')

-- Inserindo item na tabela

INSERT INTO customers (id, name, email, age)
VALUES ('c001','astrodev', 'astro@email.com', 32);

-- Inserindo múltiplos itens na tabela

INSERT INTO customers (id, name, email, age)
VALUES 
	('c002','astr', 'astr@email.com', 22),
	('c003','rodev', 'ro@email.com', 65);

-- Editando itens na tabela

UPDATE customers 
SET 
	email = 'astrooo@email.com',
	age = 44
WHERE id = 'c001'; -- update sem where é meme

-- Deletar item da tabela

DELETE FROM customers 
WHERE id = 'c002'; -- delete sem where é meme

-- Deletar a tabela

DROP TABLE customers;

-- Fizemos o CRUD do SQL
-- Create
-- Read
-- Update
-- Delete
-- Active: 1695691185516@@127.0.0.1@3306
-- CREATE TABLE customers (
-- 	id TEXT PRIMARY KEY UNIQUE NOT NULL,
-- 	name TEXT NOT NULL,
-- 	email TEXT UNIQUE NOT NULL,
-- 	age INTEGER NOT NULL
-- );

-- -- Visualizando dados de uma tabela

-- SELECT * FROM customers; 

-- -- Visualizando estrutura de uma tabela

-- PRAGMA table_info('customers')

-- -- Inserindo item na tabela

-- INSERT INTO customers (id, name, email, age)
-- VALUES ('c001','astrodev', 'astro@email.com', 32);

-- -- Inserindo múltiplos itens na tabela

-- INSERT INTO customers (id, name, email, age)
-- VALUES 
-- 	('c002','astr', 'astr@email.com', 22),
-- 	('c003','rodev', 'ro@email.com', 65);

-- -- Editando itens na tabela

-- UPDATE customers 
-- SET 
-- 	email = 'astrooo@email.com',
-- 	age = 44
-- WHERE id = 'c001'; -- update sem where é meme

-- -- Deletar item da tabela

-- DELETE FROM customers 
-- WHERE id = 'c002'; -- delete sem where é meme

-- -- Deletar a tabela

-- DROP TABLE customers;

-- -- Fizemos o CRUD do SQL
-- -- Create
-- -- Read
-- -- Update
-- -- Delete

-- Users

CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES ('u001', 'mariano', 'mariano@email.com', 'hjabcs'),
('u002', 'luciano', 'luciano@email.com', 'hasxjabcs'),
('u003', 'adriano', 'adriano@email.com', 'hjabgbvwscs');

SELECT * FROM users;

DROP TABLE users;

-- Products

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES ('P001', 'foguete imenso', 230000, 'foguete de carga imenso', 'https://picsum.photos/seed/Rocket/400'),
('P002', 'foguete colossal', 3800000, 'foguete de carga planetário', 'https://picsum.photos/seed/Rocket/400'),
('P003', 'foguete pequeno', 12000, 'foguete de carga pequeno', 'https://picsum.photos/seed/Rocket/400'),
('P004', 'nave individual', 18000, 'nave para viagens solo', 'https://picsum.photos/seed/Rocket/400'),
('P005', 'nave militar', 340000, 'nave de guerra', 'https://picsum.photos/seed/Rocket/400');

SELECT * FROM products;
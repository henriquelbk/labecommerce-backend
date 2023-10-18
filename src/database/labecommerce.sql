-- Active: 1697146884178@@127.0.0.1@3306

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

-- EXERCICIOS DO PROJETO

-- Users

CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES 
('u001', 'mariano', 'mariano@email.com', 'hjabcs'),
('u002', 'luciano', 'luciano@email.com', 'hasxjabcs'),
('u003', 'adriano', 'adriano@email.com', 'hjabgbvwscs');

SELECT * FROM users;

INSERT INTO users (id, name, email, password)
VALUES ('u004', 'cassiano', 'cassiano@taldoemail.com', 'vsdvsd');

DELETE FROM users
WHERE id = 'u003';

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
VALUES 
('p001', 'foguete imenso', 230000, 'foguete de carga imenso', 'https://picsum.photos/seed/Rocket/400'),
('p002', 'foguete colossal', 3800000, 'foguete de carga planetário', 'https://picsum.photos/seed/Rocket/400'),
('p003', 'foguete pequeno', 12000, 'foguete de carga pequeno', 'https://picsum.photos/seed/Rocket/400'),
('p004', 'nave individual', 18000, 'nave para viagens solo', 'https://picsum.photos/seed/Rocket/400'),
('p005', 'nave militar', 340000, 'nave de guerra', 'https://picsum.photos/seed/Rocket/400');

SELECT * FROM products;

SELECT * FROM products
WHERE name LIKE '%nave%';

INSERT INTO products (id, name, price, description, image_url)
VALUES 
('p006', 'nave de luxo', 420000, 'nave cruzeiro', 'https://picsum.photos/seed/Rocket/400');

DELETE FROM products
WHERE id = 'p003';

UPDATE products
SET
id = 'p002',
name = 'nave colossal',
price = 390000000,
description = 'nave de carga planetária',
image_url = 'https://picsum.photos/seed/Rocket/400'
WHERE id = 'p002';

DROP TABLE products;

-- Exercício de Relações SQL 1

CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
  FOREIGN KEY(buyer) REFERENCES users(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);

INSERT INTO purchases (id, buyer, total_price)
VALUES 
('P001', 'u001', 234764328),
('P002', 'u002', 6432),
('P003', 'u003', 47642),
('P004', 'u004', 76438);

SELECT * FROM purchases;

UPDATE purchases
SET 
total_price = 777777
WHERE id = 'P001';

SELECT purchases.id, purchases.buyer, users.name, users.email, purchases.total_price AS 'Custo', purchases.created_at AS 'Data da Compra' FROM purchases
INNER JOIN users 
ON users.id = purchases.buyer

DROP TABLE purchases;

-- Exercicio relações SQL 2 (m:n)

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id) 
  FOREIGN KEY (product_id) REFERENCES products (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);

INSERT INTO purchases_products
VALUES 
('P001', 'p002', 5),
('P001', 'p004', 4),
('P002', 'p001', 12),
('P003', 'p002', 1);

SELECT purchases_products.*, purchases.*, products.*
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;

DROP TABLE purchases_products;
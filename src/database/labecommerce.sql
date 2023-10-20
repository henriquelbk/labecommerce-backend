-- Active: 1697764975191@@127.0.0.1@3306
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
('u003', 'adriano', 'adriano@email.com', 'hjabgbvwscs')
('u004', 'cassiano', 'cassiano@taldoemail.com', 'vsdvsd');

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
('p005', 'nave militar', 340000, 'nave de guerra', 'https://picsum.photos/seed/Rocket/400')
('p006', 'nave de luxo', 420000, 'nave cruzeiro', 'https://picsum.photos/seed/Rocket/400');

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

SELECT purchases.id, purchases.buyer, users.name, users.email, purchases.total_price AS 'Custo', purchases.created_at AS 'Data da Compra' FROM purchases
INNER JOIN users 
ON users.id = purchases.buyer

DROP TABLE purchases;

-- relações SQL 2 (m:n)

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
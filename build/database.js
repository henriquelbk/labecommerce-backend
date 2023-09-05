"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString(),
    },
    {
        id: "u002",
        name: "Beltrano",
        email: "beltrano@email.com",
        password: "beltrano123",
        createdAt: new Date().toISOString(),
    }
];
exports.products = [
    {
        id: "p001",
        name: "foguete a023",
        price: 35.000,
        description: "foguete pequeno",
        imageUrl: "https://picsum.photos/seed/Rocket/400",
    },
    {
        id: "p002",
        name: "foguete a024",
        price: 85.000,
        description: "foguete médio",
        imageUrl: "https://picsum.photos/seed/Rocket/400",
    }
];
const createUser = (id, name, email, password) => {
    const novoUsuario = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    exports.users.push(novoUsuario);
    console.log("Cadastro realizado com sucesso");
    console.table(exports.users);
    return exports.users;
};
exports.createUser = createUser;
const getAllUsers = () => {
    console.table(exports.users);
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, description, imageUrl) => {
    const novoProduto = { id, name, price, description, imageUrl };
    exports.products.push(novoProduto);
    console.table(exports.products);
    return exports.products;
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    console.table(exports.products);
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const searchProductsByName = (name) => {
    name = name.toLowerCase();
    const matchingProducts = exports.products.filter(product => product.name.toLowerCase().includes(name));
    console.table(matchingProducts);
    return matchingProducts;
};
exports.searchProductsByName = searchProductsByName;

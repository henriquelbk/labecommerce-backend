"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "new Date().toISOString()",
    },
    {
        id: "u002",
        name: "Beltrano",
        email: "beltrano@email.com",
        password: "beltrano123",
        createdAt: "new Date().toISOString()",
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

import { TProducts, TUsers } from './types'

export const users: TUsers[] = [
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
]

export const products: TProducts[] = [
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
]

export const createUser = (id: string, name: string, email: string, password: string): TUsers[] => {

    const novoUsuario = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    }

    users.push(novoUsuario);

    console.log("Cadastro realizado com sucesso");
    console.table(users)

    return users;
}

export const getAllUsers = (): TUsers[] => {

    console.table(users)

    return users
}

export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): TProducts[] => {

    const novoProduto = { id, name, price, description, imageUrl }

    products.push(novoProduto)
    console.table(products)
    
    return products;
}

export const getAllProducts = () => {

    console.table(products)
    return products
}

export const searchProductsByName = (name: string): TProducts[] => {
    name = name.toLowerCase()
    const matchingProducts = products.filter(product => product.name.toLowerCase().includes(name))

    console.table(matchingProducts)

    return matchingProducts
}
import { users, products, createUser, createProduct, getAllUsers, getAllProducts, searchProductsByName} from './database';
import { TProducts, TUsers } from './types'
import express, { Request, Response} from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// Endpoints GET

app.get("/users", (req: Request, res: Response) => {
    const allUsers: TUsers[] = users 
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    const allProducts: TProducts[] = products  
    res.status(200).send(products)
})

// Endpoints POST

app.post("/users", (req: Request, res: Response) => {
    const { id, name, email, password, createdAt }: TUsers = req.body

    const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt,
    }
    users.push(newUser)

    res.status(201).send('Novo usuário registrado com sucesso')
})

app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl }: TProducts = req.body

    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl,
    }
    products.push(newProduct)

    res.status(201).send('Novo produto registrado com sucesso')
})

// console.log("app iniciado");
// console.log(users, products);

// createUser("003", 'Fernando', 'fernando@email.com', 'askfjhap');
// createProduct('p003', 'foguete a025', 335.000, 'Foguete grande', 'https://picsum.photos/seed/Rocket/400');
// getAllUsers();
// getAllProducts();
// searchProductsByName('foguete a024');

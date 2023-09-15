import {
  users,
  products,
  createUser,
  createProduct,
  getAllUsers,
  getAllProducts,
  searchProductsByName,
} from "./database";
import { TProducts, TUsers } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";

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
  const allUsers: TUsers[] = users;
  res.status(200).send(users);
});

app.get("/products", (req: Request, res: Response) => {
  const allProducts: TProducts[] = products;
  res.status(200).send(products);
});

// Endpoints POST

app.post("/users", (req: Request, res: Response) => {
  const { id, name, email, password }: TUsers = req.body;

  // const newUser: TUsers = {
  //     id,
  //     name,
  //     email,
  //     password,
  //     createdAt,
  // }
  const newUser = createUser(id, name, email, password);

  res.status(201).send(newUser);
});

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl }: TProducts = req.body;

  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
  products.push(newProduct);

  res.status(201).send("Novo produto registrado com sucesso");
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const indexToDelete = users.findIndex((user) => user.id === id);

  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
  } else {
    console.log("Deu ruim, não encontrou o index para deletar");
  }

  res.status(200).send("User deletado com sucesso!");
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const indexToDelete = products.findIndex((product) => product.id === id);

  if (indexToDelete !== -1) {
    products.splice(indexToDelete, 1);
  } else {
    console.log("Deu ruim, não encontrou o index para deletar");
  }

  res.status(200).send("Product deletado com sucesso!");
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;

  const product = products.find((product) => product.id === id);

  if (product) {
    product.name = newName || product.name;
    product.price = newPrice || product.price;
    product.description = newDescription || product.description;
    product.imageUrl = newImageUrl || product.imageUrl;
  }

  res.status(200).send("Produto atualizado com sucesso");
});

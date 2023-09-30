import {
  users,
  products,
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

// GET all users

app.get("/users", (req: Request, res: Response) => {
  try {

  const allUsers: TUsers[] = users;
  res.status(200).send(allUsers);

  } catch(err: any) {

      console.log(err) // print do erro no terminal para facilitar o debug
      res.status(400).send(err.message)

  }
});

// GET all products

app.get("/products", (req: Request, res: Response) => {
  try{

  const allProducts: TProducts[] = products;
  res.status(200).send(allProducts);

  } catch(err: any) {

    console.log(err) // print do erro no terminal para facilitar o debug
    res.status(400).send(err.message)

}
});

// Create users

app.post("/users", (req: Request, res: Response) => {
  try {
  const { id, name, email, password }: TUsers = req.body;
  const verificaId: TUsers | undefined =  users.find((user) => user.id === id)
  const verificaEmail: TUsers | undefined =  users.find((user) => user.email === email)

  if (verificaId) {
    res.statusCode = 400;
    throw new Error("Id já cadastrado.")
  }
  if (verificaEmail) {
    res.statusCode = 400;
    throw new Error("E-mail já cadastrado.")
  }
  if (typeof id !== 'string') {
    res.statusCode = 400;
    throw new Error("'id' deve ser uma string")
  }
  if (typeof name !== 'string') {
    res.statusCode = 400;
    throw new Error("'name' deve ser uma string")
  }
  if (typeof email !== 'string') {
    res.statusCode = 400;
    throw new Error("'email' deve ser uma string")
  }
  if (typeof password !== 'string') {
    res.statusCode = 400;
    throw new Error("'password' deve ser uma string")
  }

  const newUser: TUsers = {
      id,
      name,
      email,
      password
  }
  users.push(newUser)

  res.status(201).send("Usuário cadastrado com sucesso");

} catch (err: any) {
  if (err instanceof Error) {
    res.send(err.message);
  }
}

});

// Create products

app.post("/products", (req: Request, res: Response) => {
  try{

  const { id, name, price, description, imageUrl }: TProducts = req.body;
  const verificaId: TProducts | undefined =  products.find((product) => product.id === id)

  if (verificaId) {
    res.statusCode = 400;
    throw new Error("Id já cadastrado.")
  }
  if (typeof id !== 'string') {
    res.statusCode = 400;
    throw new Error("'id' deve ser uma string")
  }
  if (typeof name !== 'string') {
    res.statusCode = 400;
    throw new Error("'name' deve ser uma string")
  }
  if (typeof price !== 'number') {
    res.statusCode = 400;
    throw new Error("'price' deve ser uma number")
  }
  if (typeof description !== 'string') {
    res.statusCode = 400;
    throw new Error("'description' deve ser uma string")
  }
  if (typeof imageUrl !== 'string') {
    res.statusCode = 400;
    throw new Error("'imageUrl' deve ser uma string")
  }

  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
  products.push(newProduct);

  res.status(201).send("Novo produto registrado com sucesso");
} catch (err: any) {

  if (err instanceof Error) {
    res.send(err.message);
  }
}
});

// Delete user by id

app.delete("/users/:id", (req: Request, res: Response) => {
try {

  const id = req.params.id;
  const indexToDelete = users.findIndex((user) => user.id === id);
  const verificaId: TUsers | undefined =  users.find((user) => user.id === id)

  if (!verificaId) {
    res.statusCode = 400;
    throw new Error("Id não cadastrado.")
  }

  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
  } else {
    console.log("Deu ruim, não encontrou o index para deletar");
  }

  res.status(200).send("User deletado com sucesso!");
} catch (err: any) {

  if (err instanceof Error) {
    res.send(err.message);
  }
}

});

// Delete product by id

app.delete("/products/:id", (req: Request, res: Response) => {
  try{

  const id = req.params.id;
  const indexToDelete = products.findIndex((product) => product.id === id);
  const verificaId: TProducts | undefined =  products.find((product) => product.id === id)

  if (!verificaId) {
    res.statusCode = 400;
    throw new Error("Id não cadastrado.")
  }

  if (indexToDelete !== -1) {
    products.splice(indexToDelete, 1);
  } else {
    console.log("Deu ruim, não encontrou o index para deletar");
  }

  res.status(200).send("Product deletado com sucesso!");
} catch (err: any) {

  if (err instanceof Error) {
    res.send(err.message);
  }
}
});

// Update product by id

app.put("/products/:id", (req: Request, res: Response) => {
  try {

  const id: string = req.params.id;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;

  const verificaId: TProducts | undefined =  products.find((product) => product.id === id)

    console.log(newPrice)

  if (!verificaId) {
    res.statusCode = 400;
    throw new Error("Id não cadastrado.")
  }
  if (typeof newName !== "string") {
    res.statusCode = 400;
    throw new Error("Name com tipo errado.")
  }
  if (typeof newPrice !== "number" && typeof newPrice !== "undefined") {
    res.statusCode = 400;
    throw new Error("Price com tipo errado.")
  }
  if (typeof newDescription !== "string") {
    res.statusCode = 400;
    throw new Error("Description com tipo errado.")
  }
  if (typeof newImageUrl !== "string" && typeof newImageUrl !== "undefined") {
    res.statusCode = 400;
    throw new Error("ImageUrl com tipo errado.")
  }

  const product: TProducts | undefined = products.find((product) => product.id === id);

  if (product) {
    product.name = newName || product.name;
    product.price = newPrice || product.price;
    product.description = newDescription || product.description;
    product.imageUrl = newImageUrl || product.imageUrl;
  }

  res.status(200).send("Produto atualizado com sucesso");
} catch (err: any) {

  if (err instanceof Error) {
    res.send(err.message);
  }

  // se chegar ainda valendo 200 sabemos que foi um erro inesperado
  // if (res.statusCode === 200) {
  //   res.status(500) // definimos 500 porque é algo que o servidor não previu
  // }

  
}
});

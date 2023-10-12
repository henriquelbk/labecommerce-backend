import { TProducts, TUsers } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// GET all users

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result: TUsers[] = await db.raw(`SELECT * FROM users`);
    res.status(200).send(result);

  } catch (err: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// GET all products

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result: TProducts[] = await db.raw(`SELECT * FROM products`);
    res.status(200).send(result);

  } catch (err: any) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// Create users

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password }: TUsers = req.body;
    
    if (!id || !name || !email || !password) {
      res.status(400)
      throw new Error('id, name, e-mail ou senha invalidos')
  }

  await db.raw(
      `INSERT INTO users (id, name, email, password)
      VALUES('${id}', '${name}', '${email}', '${password}')`)
      // recebendo os valores pelo body

  res.status(200).send('Usuário cadastrado com sucesso!')

} catch (error: any) {

  // erro padrão

  if (req.statusCode === 200) {
      res.status(500)
  }

  if (error instanceof Error) {
      res.send(error.message)
  } else {
      res.send("Erro inesperado")
  }
}

    // if (verificaId) {
    //   res.statusCode = 400;
    //   throw new Error("Id já cadastrado.");
    // }
    // if (verificaEmail) {
    //   res.statusCode = 400;
    //   throw new Error("E-mail já cadastrado.");
    // }
    // if (typeof id !== "string") {
    //   res.statusCode = 400;
    //   throw new Error("'id' deve ser uma string");
    // }
    // if (typeof name !== "string") {
    //   res.statusCode = 400;
    //   throw new Error("'name' deve ser uma string");
    // }
    // if (typeof email !== "string") {
    //   res.statusCode = 400;
    //   throw new Error("'email' deve ser uma string");
    // }
    // if (typeof password !== "string") {
    //   res.statusCode = 400;
    //   throw new Error("'password' deve ser uma string");
    // }

    // const newUser: TUsers = {
    //   id,
    //   name,
    //   email,
    //   password,
    // };
    // users.push(newUser);
});

// Create products

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: TProducts = req.body;
    
    if (!id || !name || !price || !description || !imageUrl) {
      res.status(400)
      throw new Error('id, name, price, description ou imageUrl inválidos.')
  }

  await db.raw(
      `INSERT INTO products (id, name, price, description, imageUrl)
      VALUES('${id}', '${name}', '${price}', '${description}', '${imageUrl}')`)
      // recebendo os valores pelo body

  res.status(200).send('Produto cadastrado com sucesso!')

} catch (error: any) {

  // erro padrão

  if (req.statusCode === 200) {
      res.status(500)
  }

  if (error instanceof Error) {
      res.send(error.message)
  } else {
      res.send("Erro inesperado")
  }
}
  // try {
  //   const { id, name, price, description, imageUrl }: TProducts = req.body;
  //   const verificaId: TProducts | undefined = products.find(
  //     (product) => product.id === id
  //   );

  //   if (verificaId) {
  //     res.statusCode = 400;
  //     throw new Error("Id já cadastrado.");
  //   }
  //   if (typeof id !== "string") {
  //     res.statusCode = 400;
  //     throw new Error("'id' deve ser uma string");
  //   }
  //   if (typeof name !== "string") {
  //     res.statusCode = 400;
  //     throw new Error("'name' deve ser uma string");
  //   }
  //   if (typeof price !== "number") {
  //     res.statusCode = 400;
  //     throw new Error("'price' deve ser uma number");
  //   }
  //   if (typeof description !== "string") {
  //     res.statusCode = 400;
  //     throw new Error("'description' deve ser uma string");
  //   }
  //   if (typeof imageUrl !== "string") {
  //     res.statusCode = 400;
  //     throw new Error("'imageUrl' deve ser uma string");
  //   }

  //   const newProduct: TProducts = {
  //     id,
  //     name,
  //     price,
  //     description,
  //     imageUrl,
  //   };
  //   products.push(newProduct);

  //   res.status(201).send("Novo produto registrado com sucesso");
  // } catch (err: any) {
  //   if (err instanceof Error) {
  //     res.send(err.message);
  //   }
  // }
});

// Delete user by id

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const indexToDelete = users.findIndex((user) => user.id === id);
    const verificaId: TUsers | undefined = users.find((user) => user.id === id);

    if (!verificaId) {
      res.statusCode = 400;
      throw new Error("Id não cadastrado.");
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
  try {
    const id = req.params.id;
    const indexToDelete = products.findIndex((product) => product.id === id);
    const verificaId: TProducts | undefined = products.find(
      (product) => product.id === id
    );

    if (!verificaId) {
      res.statusCode = 400;
      throw new Error("Id não cadastrado.");
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

    const verificaId: TProducts | undefined = products.find(
      (product) => product.id === id
    );

    console.log(newPrice);

    if (!verificaId) {
      res.statusCode = 400;
      throw new Error("Id não cadastrado.");
    }
    if (typeof newName !== "string") {
      res.statusCode = 400;
      throw new Error("Name com tipo errado.");
    }
    if (typeof newPrice !== "number" && typeof newPrice !== "undefined") {
      res.statusCode = 400;
      throw new Error("Price com tipo errado.");
    }
    if (typeof newDescription !== "string") {
      res.statusCode = 400;
      throw new Error("Description com tipo errado.");
    }
    if (typeof newImageUrl !== "string" && typeof newImageUrl !== "undefined") {
      res.statusCode = 400;
      throw new Error("ImageUrl com tipo errado.");
    }

    const product: TProducts | undefined = products.find(
      (product) => product.id === id
    );

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

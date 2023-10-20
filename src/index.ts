import { TProducts, TUsers } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
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
    const result: TUsers[] = await db("users");
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
    const result: TProducts[] = await db("products");
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

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'Id' inválido, deve ser string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'Name' inválido, deve ser string");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'E-mail' inválido, deve ser string");
    }

    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'Password' inválido, deve ser string");
    }

    if (id.length < 1 || name.length < 1) {
      res.status(400);
      throw new Error("'id' e 'name' devem possuir no mínimo 1 caractere");
    }

    const newUser: TUsers = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);

    res.status(200).send("Usuário cadastrado com sucesso!");
  } catch (error: any) {
    // erro padrão

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

// Create products

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, image_url }: TProducts = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' inválido, deve ser string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' inválido, deve ser string");
    }

    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'Price' inválido, deve ser string");
    }

    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'Description' inválido, deve ser string");
    }

    if (typeof image_url !== "string") {
      res.status(400);
      throw new Error("'image_url' inválido, deve ser string");
    }

    if (id.length < 1 || name.length < 1) {
      res.status(400);
      throw new Error("'id' e 'name' devem possuir no mínimo 1 caractere");
    }

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      image_url,
    };

    await db("products").insert(newProduct);
    res.status(200).send("Produto cadastrado com sucesso!");
  } catch (error: any) {
    // erro padrão

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

// Delete user by id

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("Por Favor, informe o id a ser deletado!");
    }

    const [user] = await db("users").where({ id: id });

    if (user) {
      await db.delete().from("users").where({ id: id });
    } else {
      res.status(404);
      throw new Error("Id não encontrado!");
    }

    res.status(200).send("User deletado com sucesso!");
  } catch (err: any) {
    if (err instanceof Error) {
      res.send(err.message);
    }
  }
});

// Delete product by id

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("Por Favor, informe o id a ser deletado!");
    }

    const [product] = await db("products").where({ id: id });

    if (product) {
      await db.delete().from("products").where({ id: id });
    } else {
      res.status(404);
      throw new Error("Id não encontrado!");
    }

    res.status(200).send("Product deletado com sucesso!");
  } catch (err: any) {
    if (err instanceof Error) {
      res.send(err.message);
    }
  }
});

// Update product by id

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newimage_url = req.body.image_url as string | undefined;

    if (typeof newId !== "string" && typeof newId !== "undefined") {
      res.statusCode = 400;
      throw new Error("'Id' inválido, deve ser string");
    }
    if (typeof newName !== "string" && typeof newName !== "undefined") {
      res.statusCode = 400;
      throw new Error("'Name' inválido, deve ser string");
    }
    if (typeof newPrice !== "number" && typeof newPrice !== "undefined") {
      res.statusCode = 400;
      throw new Error("'Price' inválido, deve ser um number");
    }
    if (
      typeof newDescription !== "string" &&
      typeof newDescription !== "undefined"
    ) {
      res.statusCode = 400;
      throw new Error("'Description' inválido, deve ser string");
    }
    if (typeof newimage_url !== "string" && typeof newimage_url !== "undefined") {
      res.statusCode = 400;
      throw new Error("'image_url' inválido, deve ser string");
    }

    const [product] = await db("products").where({ id: id });

    if (product) {
      const updateProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: newPrice || product.price,
        description: newDescription || product.description,
        image_url: newimage_url || product.image_url,
      };

      await db.update(updateProduct).from("products").where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (err: any) {
    if (err instanceof Error) {
      res.send(err.message);
    }
  }
});

// Update user by id

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (typeof newId !== "string" && typeof newId !== "undefined") {
      res.statusCode = 400;
      throw new Error("'Id' inválido, deve ser string");
    }
    if (typeof newName !== "string" && typeof newName !== "undefined") {
      res.statusCode = 400;
      throw new Error("'Name' inválido, deve ser string");
    }
    if (typeof newEmail !== "string" && typeof newEmail !== "undefined") {
      res.statusCode = 400;
      throw new Error("'Email' inválido, deve ser string");
    }
    if (typeof newPassword !== "string" && typeof newPassword !== "undefined") {
      res.statusCode = 400;
      throw new Error("'Password' inválido, deve ser string");
    }

    const [user] = await db("users").where({ id: id });

    if (user) {
      const updateUser = {
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      };

      await db.update(updateUser).from("users").where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (err: any) {
    if (err instanceof Error) {
      res.send(err.message);
    }
  }
});
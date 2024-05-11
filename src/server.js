const express = require("express");
const app = express();
const port = 3000;

// Importa el router de posts
const postsRouter = require("./routes/posts");

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para los posts
app.use("/posts", postsRouter);

let users = [
    { id: 1, name: "Jaziel", email: "jazcov96@hotmail.com" },
    { id: 2, name: "isai", email: "jazcov96@gmail.com" }
];

// Obtener todos los usuarios
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// Obtener usuario por ID
app.get("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    res.status(200).json(user || {});
});

// Crear un nuevo usuario
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    const id = users.length + 1; // Incrementa el ID
    const user = { id, name, email };
    users.push(user);
    res.status(201).json(user);
});

// Actualizar un usuario existente
app.put("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
    let user = users.find((user) => user.id === userId);
    if (user) {
        user.name = name;
        user.email = email;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Eliminar un usuario por ID
app.delete("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        res.status(200).json(deletedUser);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Ruta raíz
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`The blogger backend is running at localhost:${port}`);
});

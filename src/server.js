const express = require("express");
const app = express();
const port = 3000;

// Importa el router de posts
//const postsRouter = require("./routes/posts");

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para los posts
//app.use("/posts", postsRouter);

let users = [
    { id: 1, name: "Jaziel", email: "jazcov96@hotmail.com" },
    { id: 2, name: "isai", email: "jazcov96@gmail.com" }
];

let posts = [
    { id: 1, title: "Primera Publicacion", content: "esta es la primera publicacion del blog.", userId: 1 },
    { id: 2, title: "Segunda publicacion", content: "este es el contenido de la segunda puyblicacion.", userId: 2 }
];

let comments = [
    { id: 1, postId: 1, text: "buena publicacion!" },
    { id: 2, postId: 1, text: "disfruto leyendo esto." },
    { id: 3, postId: 2, text: "voy a ver mas contenido como este!" }
];

// Obtener todos los usuarios
app.get("/users", (_req, res) => {
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

// Obtener todas las publicaciones
app.get("/posts", (_req, res) => {
    res.status(200).json(posts);
});

// Obtener una publicación por ID
app.get("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    const post = posts.find((post) => post.id === postId);
    res.status(200).json(post || {});
});

// Crear una nueva publicación
app.post("/posts", (req, res) => {
    const { title, content, userId } = req.body;
    const id = posts.length + 1; // Incrementa el ID
    const post = { id, title, content, userId };
    posts.push(post);
    res.status(201).json(post);
});

// Actualizar una publicación existente
app.put("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    const { title, content } = req.body;
    let post = posts.find((post) => post.id === postId);
    if (post) {
        post.title = title;
        post.content = content;
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// Eliminar una publicación por ID
app.delete("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
        const deletedPost = posts.splice(postIndex, 1)[0];
        res.status(200).json(deletedPost);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// Obtener todos los comentarios
app.get("/comments", (_req, res) => {
    res.status(200).json(comments);
});

// Obtener comentarios por ID de publicación
app.get("/comments/:postId", (req, res) => {
    const postId = Number(req.params.postId);
    const postComments = comments.filter((comment) => comment.postId === postId);
    res.status(200).json(postComments);
});

// Crear un nuevo comentario
app.post("/comments", (req, res) => {
    const { postId, text } = req.body;
    const id = comments.length + 1; // Incrementa el ID
    const comment = { id, postId, text };
    comments.push(comment);
    res.status(201).json(comment);
});

// Actualizar un comentario existente
app.put("/comments/:id", (req, res) => {
    const commentId = Number(req.params.id);
    const { text } = req.body;
    let comment = comments.find((comment) => comment.id === commentId);
    if (comment) {
        comment.text = text;
        res.status(200).json(comment);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
});

// Eliminar un comentario por ID
app.delete("/comments/:id", (req, res) => {
    const commentId = Number(req.params.id);
    const commentIndex = comments.findIndex((comment) => comment.id === commentId);
    if (commentIndex !== -1) {
        const deletedComment = comments.splice(commentIndex, 1)[0];
        res.status(200).json(deletedComment);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
});

// Ruta raíz
app.get("/", (_req, res) => {
    res.send("Hello World");
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`The blogger backend is running at localhost:${port}`);
});

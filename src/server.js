const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./blogger.db');

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Obtener todos los usuarios
app.get("/users", (_req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

// Obtener usuario por ID
app.get("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(row || {});
    });
});

// Crear un nuevo usuario
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.run(sql, [name, email], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, name, email });
    });
});

// Actualizar un usuario existente
app.put("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.run(sql, [name, email, userId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ id: userId, name, email });
        }
    });
});

// Eliminar un usuario por ID
app.delete("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    db.run("DELETE FROM users WHERE id = ?", [userId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ id: userId });
        }
    });
});

// Obtener todas las publicaciones
app.get("/posts", (_req, res) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

// Obtener una publicación por ID
app.get("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    db.get("SELECT * FROM posts WHERE id = ?", [postId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(row || {});
    });
});

// Crear una nueva publicación
app.post("/posts", (req, res) => {
    const { title, content, userId } = req.body;
    const sql = "INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)";
    db.run(sql, [title, content, userId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, title, content, userId });
    });
});

// Actualizar una publicación existente
app.put("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    const { title, content } = req.body;
    const sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    db.run(sql, [title, content, postId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: "Post not found" });
        } else {
            res.status(200).json({ id: postId, title, content });
        }
    });
});

// Eliminar una publicación por ID
app.delete("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    db.run("DELETE FROM posts WHERE id = ?", [postId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: "Post not found" });
        } else {
            res.status(200).json({ id: postId });
        }
    });
});

// Obtener todos los comentarios
app.get("/comments", (_req, res) => {
    db.all("SELECT * FROM comments", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

// Obtener comentarios por ID de publicación
app.get("/comments/:postId", (req, res) => {
    const postId = Number(req.params.postId);
    db.all("SELECT * FROM comments WHERE postId = ?", [postId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

// Crear un nuevo comentario
app.post("/comments", (req, res) => {
    const { postId, text } = req.body;
    const sql = "INSERT INTO comments (postId, text) VALUES (?, ?)";
    db.run(sql, [postId, text], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, postId, text });
    });
});

// Actualizar un comentario existente
app.put("/comments/:id", (req, res) => {
    const commentId = Number(req.params.id);
    const { text } = req.body;
    const sql = "UPDATE comments SET text = ? WHERE id = ?";
    db.run(sql, [text, commentId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: "Comment not found" });
        } else {
            res.status(200).json({ id: commentId, text });
        }
    });
});

// Eliminar un comentario por ID
app.delete("/comments/:id", (req, res) => {
    const commentId = Number(req.params.id);
    db.run("DELETE FROM comments WHERE id = ?", [commentId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: "Comment not found" });
        } else {
            res.status(200).json({ id: commentId });
        }
    });
});

// Ruta raíz
app.get("/", (_req, res) => {
    res.send("Hello World");
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`The blogger backend is running at http://localhost:${port}`);
});

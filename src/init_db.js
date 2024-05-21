const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./blogger.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('Conexión establecida a la base de datos.');
    }
});

db.serialize(() => {
    // Crear tabla de usuarios
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla de usuarios', err.message);
        } else {
            console.log('Tabla de usuarios creada exitosamente.');
        }
    });

    // Crear tabla de publicaciones
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id)
        )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla de publicaciones', err.message);
        } else {
            console.log('Tabla de publicaciones creada exitosamente.');
        }
    });

    // Crear tabla de comentarios
    db.run(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            postId INTEGER,
            text TEXT NOT NULL,
            FOREIGN KEY (postId) REFERENCES posts(id)
        )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla de comentarios', err.message);
        } else {
            console.log('Tabla de comentarios creada exitosamente.');
        }
    });
});

db.close((err) => {
    if (err) {
        console.error('Error al cerrar la base de datos', err.message);
    } else {
        console.log('Conexión a la base de datos cerrada.');
    }
});

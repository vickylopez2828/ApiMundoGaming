"use strict";

const getConnection = require('./connection');
let conn;

//obtener todos los juegos
exports.getAllUsers = async () => {
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("SELECT * FROM users");
        return rows;
    } catch (err) {
        console.error('Error al obtener los usuarios:', err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

//obtener 1 usuario
exports.getUser = async (id) => {
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    } catch (err) {
        console.error('Error al obtener el usuario:', err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

//existe usuario con email
exports.getUserEmail = async (email) => {
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    } catch (err) {
        console.error('Error al obtener el usuario:', err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};


//insertar usuario
exports.newUser = async (user, password) => {
    const {name, lastname, email} = user;
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)", [name, lastname, email, password]);
        return rows;
    } catch (err) {
        console.error('Error al obtener los usuarios:', err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

//modificar juego
exports.updateUser = async (id, user, password) =>{
    
    const {name, lastname, email} = user;

    try {
        conn = await getConnection();
        const [rows] = await conn.execute("UPDATE users SET name = ?, lastname = ?, email = ?, password = ? WHERE id = ?", [name, lastname, email, password, id]);
        return rows;
    } catch (err) {
        console.log("error")
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
    
}

//borrar usuario
exports.deleteUser = async (id) =>{
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("DELETE FROM users WHERE id = ?", [id]);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
}
"use strict";
const getConnection = require('./connection');
let conn;

//obtener todos los juegos
exports.getAllGames = async () => {
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("SELECT * FROM games");
        return rows;
    } catch (err) {
        console.error('Error al obtener los juegos:', err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

//obtener 1 juego
exports.getGame = async (id) => {
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("SELECT * FROM games WHERE id = ?", [id]);
        return rows[0];
    } catch (err) {
        console.error('Error al obtener los juegos:', err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

//insertar juego
exports.insertGame = async (game, gameImage) =>{
    //console.log(game, gameImage);
    const { title, price_normal, price_off, 
        description, type, bought, qualification } = game;

    try {
        conn = await getConnection();
        const [rows] = await conn.execute("INSERT INTO games (title, price_normal, price_off, description, gameImage, type, bought, qualification) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", [title, price_normal, price_off, description, gameImage, type, bought, qualification]);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
}

//modificar juego
exports.updateGame = async (id, game, gameImage) =>{
    
    const { title, price_normal, price_off, 
        description, type, bought, qualification} = game;
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("UPDATE games SET title = ?, price_normal = ?, price_off = ?, description = ?, gameImage = ?, type = ?, bought = ?, qualification = ? WHERE id = ?", [title, price_normal, price_off, description, gameImage, type, bought, qualification, id]);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
    
}

//borrar juego
exports.deleteGame = async (id) =>{
    try {
        conn = await getConnection();
        const [rows] = await conn.execute("DELETE FROM games WHERE id = ?", [id]);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
}
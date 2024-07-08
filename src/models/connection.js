"use strict"
const mysql = require('mysql2/promise');

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST || 'localhost',
            user: process.env.USER || 'root',
            database: process.env.DB || 'mundo_gaming',
            password: process.PASSWORD || '12345',
        });
        return connection;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
};

module.exports = getConnection;


// const mysql = require('mysql2/promise')
// // Create the connection to database
// exports.getConnection = async () => {
//     return await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         database: 'mundo_gaming', 
//         password: '12345',
//     });
// } 
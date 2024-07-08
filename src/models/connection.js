"use strict"
const mysql = require('mysql2/promise');

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_ADDON_HOST,
            user: process.env.MYSQL_ADDON_USER,
            database: process.env.MYSQL_ADDON_DB,
            password: process.env.MYSQL_ADDON_PASSWORD,
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
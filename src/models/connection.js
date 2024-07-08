"use strict"
const mysql = require('mysql2/promise');

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'bbbpexsnbs5uae2ixkqi-mysql.services.clever-cloud.com',
            user: 'uzeiismnnrisl2xd',
            database: 'bbbpexsnbs5uae2ixkqi',
            password: 'tWCQGHfX9sAbK5Hi5r1J',
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
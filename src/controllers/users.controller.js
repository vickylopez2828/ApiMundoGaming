"use strict";

const UsersModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    let users = await UsersModel.getAllUsers();
    res.send(users);
   // res.send("get all users")
}

exports.getUser = async (req, res) => {
    let id = req.params.id;
    let user = await UsersModel.getUser(id);
    if(user){
        res.send(user);
    } else {
        res.status(404).send(`No existe un usuario con el id ${id}`);
    }

}
exports.newUser = async (req, res) => {
    
    const { name, lastname, email, password } = req.body;
        
    if(name === undefined || lastname === undefined || email === undefined || password === undefined){
        return res.status(400).send({"status": 400, "msg": "Todos los campos son requeridos"});
    } 

    //validamos si ya existe el usuario en la db
    const user = await UsersModel.getUserEmail(email);

    if(user){
        res.status(400).json({
            msg: `Ya existe el usuario con el email ${email}`
        })
    } else{
        //encripto la password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const result = await UsersModel.newUser(req.body, hashedPassword);
    
            if(result.affectedRows == 1){
                res.status(201).send({"status": 201,"msg": "Usuario creado exitosamente"})
            } else {
                res.status(500).send({"status": 500,"msg": "No se insertó ningún usuario"})
            }
        } catch (error) {
            res.status(500).send({ "status": 500, "msg": "Error al insertar el usuario" });
        }

    }
    
    
}

exports.updateUser = async (req, res) => {
    let id = req.params.id;
    const { name, lastname, email, password } = req.body;
    
    const user = await UsersModel.getUser(id);
    if(!user){
        return res.status(404).send({"status": 404, "msg": `No existe un usuario con el id: ${id}`});
    }
    
    if(name === undefined || lastname === undefined || email === undefined || password === undefined){
        return res.status(400).send({"status": 400, "msg": "Todos los campos son requeridos"});
    }

    try {
         //encripto la password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await UsersModel.updateUser(id, req.body, hashedPassword);
        if(result.affectedRows == 1 && result.changedRows == 1){
            res.status(200).send({"status": 200,"msg": "Usuario modificado exitosamente"})
        } else {
            res.status(500).send({"status": 500,"msg": "No se modificó ningún usuario"})
        }
    } catch (error) {
        res.status(500).send({ "status": 500, "msg": "Error al modificar el usuario" });
    }
}
exports.deleteUser = async (req, res) => {
    let id = req.params.id;
    const user = await UsersModel.getUser(id);
    //chequeo si existe el usuario
    if(!user){
        return res.status(404).send({"status": 404, "msg": `No existe un usuario con el id: ${id}`});
    }
    try {
        const result = await UsersModel.deleteUser(id);
        if(result.affectedRows == 1){
            res.status(200).send({"status": 200,"msg": "Usuario eliminado exitosamente"})
        } else {
            res.status(500).send({"status": 500,"msg": "No se pudo eliminar el usuario"})
        }
    } catch (error) {
        res.status(500).send({ "status": 500, "msg": "Error al eliminar el usuario" });
        
    }
}
exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    //validamos si existe
    const user = await UsersModel.getUserEmail(email);
    if(!user){
        res.status(400).json({
            msg: `No existe un usuario con el email ${email}`,
        });
    } else {
        //validamos password
        const passwordValid = await bcrypt.compare(password, user.password)
        
        if (!passwordValid){
            res.status(400).json({
                msg: `Password incorrecta`
            });
        } else {
            //generamos el token
            //luego de la llave secreta podria colocar opcion 
            //para q expire en cierto tiempo
            const token = jwt.sign({
                email: email
            }, process.env.SECRET_KEY || 'randomword123');
            res.json({token, user});
        }
    }
}



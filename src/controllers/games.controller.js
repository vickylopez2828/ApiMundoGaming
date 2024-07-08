"use strict";
const data = require('../data.json')
const GamesModel = require('../models/games.model');
//devuelve todos los juegos
exports.getAllGames =  (req, res) => {
    
    res.send(data);
}
exports.getAllGames2 = async (req, res) => {
    let games = await GamesModel.getAllGames();
    res.send(games);
}
//devuelve un juego
exports.getGame = async (req, res) => {
    let id = req.params.id;
    let game = await GamesModel.getGame(id);
    if(game){
        res.send(game);
    } else {
        res.status(404).send(`No existe un juego con el id ${id}`);
    }
}
//agrega un juego
exports.insertGame = async (req, res) => {
   
    const img = `http://localhost:3001/static/${req.file.filename}`
    const { title, price_normal, price_off, 
            description, type, bought, qualification } = req.body;
        
    if(title === undefined || price_normal === undefined || price_off === undefined || 
        description === undefined ||  img === undefined || type === undefined ||
        bought === undefined || qualification === undefined){
            return res.status(400).send({"status": 400, "msg": "Todos los campos son requeridos"});
    } 
    try {
        const result = await GamesModel.insertGame(req.body, img);
        if(result.affectedRows == 1){
            let id = result.insertId;
            let game = {
                ...req.body,  
                id,      
                img
            };
            res.status(201).send([{"status": 201,"msg": "Juego creado exitosamente"}, {"game": game }])
        } else {
            res.status(500).send({"status": 500,"msg": "No se insertó ningún juego"})
        }
    } catch (error) {
        res.status(500).send({ "status": 500, "msg": "Error al insertar el juego" });
    }
}

//borrar juego
exports.deleteGame = async (req, res) => {
    let id = req.params.id;
    console.log("id", id)
    let game = await GamesModel.getGame(id);
    //chequeo si existe el juego
    if(!game){
        return res.status(404).send({"status": 404, "msg": `No existe un juego con el id: ${id}`});
    }
    try {
        const result = await GamesModel.deleteGame(id);
        if(result.affectedRows == 1){
            res.status(200).send({"status": 200,"msg": "Juego eliminado exitosamente", "game": game})
        } else {
            res.status(500).send({"status": 500,"msg": "No se pudo eliminar el juego"})
        }
    } catch (error) {
        res.status(500).send({ "status": 500, "msg": "Error al eliminar el juego" });
        
    }
}

//modificar juego
exports.updateGame = async (req, res) => {
    const image = `http://localhost:3001/static/${req.file.filename}`
    //const gameImage = `http://localhost:3001/static/${req.file.filename}`
    let id = req.params.id;
    let game = await GamesModel.getGame(id);
    //chequeo si existe el juego
    if(!game){
        return res.status(404).send({"status": 404, "msg": `No existe un juego con el id: ${id}`});
    }
    const { title, price_normal, price_off, 
        description, type, bought, qualification } = req.body;
    
    if(title === undefined || price_normal === undefined || price_off === undefined || 
        description === undefined ||  image === undefined || type === undefined ||
        bought === undefined || qualification === undefined){
            return res.status(400).send({"status": 400, "msg": "Todos los campos son requeridos"});
    } 
    try {
        const result = await GamesModel.updateGame(id, req.body, image);
        if(result.affectedRows == 1 && result.changedRows == 1){
            res.status(200).send({"status": 200,"msg": "Juego modificado exitosamente", "game": game})
        } else {
            res.status(500).send({"status": 500,"msg": "No se modificó ningún juego"})
        }
    } catch (error) {
        res.status(500).send({ "status": 500, "msg": "Error al modificar el juego" });
    }
}


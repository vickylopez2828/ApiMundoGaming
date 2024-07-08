"use strict";
//controllers
const GamesController = require('./src/controllers/games.controller');
const UsersController = require('./src/controllers/users.controller');

//config
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
//const upload = multer({ dest: 'upload/'});
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './upload')
  },
  filename: (req, file, cb) =>{
    cb(null, file.originalname)
  }
})

const upload = multer({ storage });
//config archivos static
const path = require('path');
app.use('/static', express.static(path.join(__dirname, './upload')));

// app.get('/', (req, res)=>{
//   const htmlResponse =
//     `<html>
//       <head>MUNDO GAMING</head>
//       <body>
//         <h1>Holaaaa mundo gaming</h1>
//       </body>
//     </html>`;
//     res.send(htmlResponse);
// });
//ruteo games

 app.get('/',  GamesController.getAllGames);
app.get('/api/games/:id',  GamesController.getGame);
app.post('/api/games', upload.single('gameImage'), (req, res) => {
    //console.log(req.file)
    GamesController.insertGame(req, res);
} );
app.put('/api/games/:id', upload.single('gameImage'), (req, res) => {
 console.log(req.file, "put")
  GamesController.updateGame(req, res);
} );
app.delete('/api/games/:id', GamesController.deleteGame);

app.post('/api/images', upload.single('gameImage'), (req, res)=>{
  console.log(req.file);
  res.send("okk")
});

//ruteo user
app.get('/api/users',  UsersController.getAllUsers);
app.get('/api/users/:id',  UsersController.getUser);
app.post('/api/users', UsersController.newUser);
app.put('/api/users/:id', UsersController.updateUser)
app.delete('/api/users/:id', UsersController.deleteUser);
app.post('/api/users/login', UsersController.loginUser);

app.listen(port, () => {
  console.log(`Escuchando en el puerto: ${port}`)
})
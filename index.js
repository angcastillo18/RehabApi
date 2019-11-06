//Pedir la informacion de config, y iniciar la comunicacion con Express
//para poder los nuevos tipos de variables de EM6
'use strict'
const mongoose=require('mongoose')
const app=require('./app')
//llamamos a config.js
const config=require('./config')

//iniciamos mongoose
//mongoose.connect(config.db)

mongoose.connect(config.db,(err,res)=>{
    //que lanze el error si es que hay
    if(err) {
        return console.log('Error al conectar a la base de datos')
    }
    //si es exitoso..entonces iniciar node
    console.log('Conexion a la base de datos establecida')
    //creamos nuestro servidor
    //que escuche en el pueerto 3000 y con arrow function que ejecute log
    app.listen(config.port, ()=> {
        console.log(`Example app listening on port ${config.port}!`);
    })
})
//SE MODIFICO EN EL PACKAGE JSON: start:'node index.js' de heroku , por nodemon index.js.para que corra en local


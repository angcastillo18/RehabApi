//configuracion de express
//para poder los nuevos tipos de variables de EM6
'use strict'
const express = require('express')
const bodyParser=require('body-parser')
//llamamos a express
const app = express();
//llamar al api
const api=require('./routes')


//admitir cuerpos de mensaje en formato json(middleware)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//la ruta api use el modulo api de routes
app.use('/api',api)


  module.exports=app

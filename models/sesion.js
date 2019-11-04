'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema
//para traer el esquema de usuario
const User=mongoose.model('User')

const SesionSchema=Schema({
    //este user es para que haga referencia
    user:{ type: Schema.ObjectId, ref: 'User' } ,
    nSesion:Number,
    max:Number,
    min:Number,
    totalHits:Number,
    date: { type: Date, default: Date.now },
    totalFlex:Number,
    score:Number
})
//exportamos el modelo para que pueda ser accesible por toda la aplicacion, solo es necesario importar
module.exports=mongoose.model('Sesion',SesionSchema)
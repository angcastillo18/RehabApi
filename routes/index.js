'use strict'
const express=require('express')
const api=express.Router()
//requerir el controlador de usuario
const userCtrl=require('../controllers/user')
//requerir el controlador de Sesion
const sesionCtrl=require('../controllers/sesion')
//Metodos del controllers USER--RUTAS DIRECCIONAMIENTO
// GET method route----llamamos a la funcion get getUsers
//traer todos los usuarios
  api.get('/user', userCtrl.getUsers)
//traer un usuario por su ID
  api.get('/user/:userId',userCtrl.getUser)
// POST method route
//REGISTRO
  api.post('/user/register',userCtrl.registerUser)
//LOGIN
  api.post('/user/login',userCtrl.loginUser)
  // PUT method route--actualizar valor de un user
  api.put('/user/:userId',userCtrl.updateUser )
  // DELETE method route--Eliminar usuario
  api.delete('/user/:userId', userCtrl.deleteUser)

//Metodos del controllers SESION--RUTAS DIRECCIONAMIENTO
  api.get('/sesion', sesionCtrl.getSesions)

  api.post('/sesion',sesionCtrl.registerSesion)

  module.exports=api
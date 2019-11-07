'use strict'
//importar esquema user
const Sesion=require('../models/sesion')
//importar esquema user
const User=require('../models/user')
//importar objectId
const ObjectId = require('mongodb').ObjectId;
//traer todos las sesiones con sus usuarios
function getSesions (req,res){
    Sesion.find({},(err,sesions)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        //si todo va bien
        //metodo populate para hacer el join de los usuarios dentro de las sesiones
        User.populate(sesions,{path:'user'},function(err,sesions){
            console.log(sesions);
            //Si es que las sesiones no existe
            if(!sesions) return res.status(404).send({message:`No existen usuarios`})
            //res.status(200).send({sesions})
            res.status(200).send(sesions)
        })
      })
}
//traer todas las sesiones de un solo usuario
function getSesion (req,res){
    let userId=req.params.userId
    var o_id = new ObjectId(userId);
    console.log(o_id)
    Sesion.find({'user':o_id},(err,sesions)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        //si la consulta me trae un objeto vacio
        if(Object.keys(sesions).length === 0) return res.status(403).send({message:`No se encontro un usuario`})
        //si todo va bien
        //metodo populate para hacer el join de los usuarios dentro de las sesiones
        User.populate(sesions,{path:'user'},function(err,sesions){
            console.log(sesions);
            //Si es que las sesiones no existe
            if(!sesions) return res.status(404).send({message:`No existe el usuario`})
            //res.status(200).send({sesions})
            res.status(200).send(sesions)
        })
      })
}

//registrar Sesiones POST, el usuario tiene que enviarse si o si su id
function registerSesion(req,res){
    //console.log('POST/api/sesion')
    //console.log(req.body)
    //
    var id = req.body.user;       
    var o_id = new ObjectId(id);
    //var sesionNro=1;
    //db.test.find({_id:o_id})
    let sesion=new Sesion()
            //almacenar en la base de datos 
            sesion.user=req.body.user
            sesion.max=req.body.max
            sesion.min=req.body.min
            sesion.totalHits=req.body.totalHits
            //sesion.date=req.body.date
            sesion.totalFlex=req.body.totalFlex
            sesion.score=req.body.score
    //
    Sesion.find({"user":o_id},null,{sort:{nSesion:'desc'},limit:1},(err,user)=>{
        
        if(err) res.status(500).send({message:`Error al hacer la solicitud: ${err}`})
        //si trae ningun usuario significa que no tiene sesiones,object vacio
        //Me tiene que dar el id existente
        if(Object.keys(user).length === 0 ){
            sesion.nSesion=1
            //return res.status(404).send({message:`el usuario no tiene sesiones`})
        }else{
            sesion.nSesion=user[0].nSesion+1
        }
        
        sesion.save((err,sesionStored)=>{
            if(err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})
            //si es que no hay error...
            //res.status(200).send({sesion:sesionStored})
            res.status(200).send(sesionStored)
        })
        
    })

    //guardar el producto (error, usuarioguardado)
    /*
                //almacenar en la base de datos 
            let sesion=new Sesion()

            sesion.user=req.body.user
            //sesion.nSesion=req.body.nSesion
            sesion.max=req.body.max
            sesion.min=req.body.min
            sesion.totalHits=req.body.totalHits
            //sesion.date=req.body.date
            sesion.totalFlex=req.body.totalFlex
            sesion.score=req.body.score
    sesion.save((err,sesionStored)=>{
        if(err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})
        //si es que no hay error...
        res.status(200).send({sesion:sesionStored})
    })
    */
}
module.exports={
    getSesions,
    getSesion,
    registerSesion
}
'use strict'
//importar esquema user
const User=require('../models/user')


function getUser (req,res){
    let userId=req.params.userId

    User.findById(userId,(err,user)=>{
      if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
      //Si es que el usuario no existe
      if(!user) return res.status(404).send({message:`El usuario no existe`})

      //si si existe y lo encuentra
      //clave y valor en el send({clave:valor}) si son los mismo se simplifica en uno solo
      //res.status(200).send({user})
      res.status(200).send(user)
    })
}
//traer todos los usuarios
function getUsers (req,res){
    User.find({},(err,users)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        //Si es que el usuario no existe
        if(!users) return res.status(404).send({message:`No existen usuarios`})
        //si todo va bien
        //res.status(200).send({users})
        res.status(200).send(users)
      })
}
//registrar usuarios POST
function registerUser(req,res){
    //console.log('POST/api/user')
    //console.log(req.body)

    //buscar al usuario por su correo
    User.findOne({'email':req.body.email},(err,user)=>{
        if(err){return done(err)}
        //si el usuario existe
        if(user){
            return res.status(404).send({message:'El usuario ya ha sido registrado'})
        }else{
            //si el usuario no existe se registra
                        //almacenar en la base de datos 
            let user=new User()

            user.name=req.body.name
            user.lastname=req.body.lastname
            user.age=req.body.age
            user.email=req.body.email
            user.password=req.body.password //bcrypt.hashSync(req.body.password, 10)
            //user.date=req.body.date
            user.gender=req.body.gender
            user.injury=req.body.injury

            //guardar el usuario (error, usuarioguardado)
            user.save((err,userStored)=>{
                if(err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})
                //si es que no hay error...
                //res.status(200).send({user:userStored})
                res.status(200).send(userStored)
            })
        }
    })


}
//Login de usuarios POST
function loginUser(req,res){
    //buscar al usuario en la base de datos por su correo
    User.findOne({'email':req.body.email},(err,user)=>{
        if(err){return done(err)}
        //si el usuario no existe
        if(!user){
            return res.status(400).send({ message: "El correo no ha sido registrado" });
        }
        //si la contraseña que dal usuario no coincide con la base de datos
        if(!user.validatePassword(req.body.password)){
            return res.status(400).send({ message: "La contraseña es incorrecta" });
        }
        //email y password hacen match
        res.status(200).send({ message: "Login exitoso" });

    })
}


function updateUser (req,res){
  //solo se envia el campo a actualizar en el postman
  let userId=req.params.userId
  //se especfican los campos que se quieren actualizar
  let update=req.body
  User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
      if(err) res.status(500).send({message:`Error al actualizar al usuario: ${err}`})
      
      //res.status(200).send({user: userUpdated})
      res.status(200).send(userUpdated)
  })
}
function deleteUser (req,res){
    let userId=req.params.userId
    User.findById(userId,(err,user)=>{
      if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
      //en caso de que no haya error
      user.remove(err=>{
          if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
          res.status(200).send({message: 'El usuario ha sido eliminado'})
      }) 

  })
}



module.exports={
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    registerUser,
    loginUser
}
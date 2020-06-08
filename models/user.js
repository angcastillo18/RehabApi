'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema
//libreria para hashear
const bcrypt = require("bcryptjs");

const UserSchema=Schema({
    name:String,
    lastname:String,
    age:{type:Number,min:12,max:78},
    email:{type:String,unique:true,lowercase:true},
    //se le puede añadir a password , select:false, para que no se envia el password cuando se haga un get de usuario
    password:String,
    //date: { type: Date, default: Date.now },
    date:String,
    gender:{type:String,enum:['male','female']},
    injury: String
})
//Developing Custom Functions and Preprocessing Functions
//Hashear la contraseña antes de ser guardada
UserSchema.pre("save", function(next) {
    //this:usuario
    //si el usuario esta modificando o creando la contraseña error
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
//Methodo validar password
UserSchema.methods.validatePassword=function(password){
    return bcrypt.compareSync(password,this.password)
}


//exportamos el modelo para que pueda ser accesible por toda la aplicacion, solo es necesario importar
module.exports=mongoose.model('User',UserSchema)
import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  username:{
    type:String,
    unique:true,
    required:[true,'El Nombre de usuario es requerido.']
  },
  email:{
    type:String,
    unique:true,
    required:[true,'El Email es requerido.']
  },
  password:{
    type:String,
    required:[true,'El Password es requerido.']
  }
},
{
  timestamps:true
})

//Encriptar password
UserSchema.statics.encryptPassword = async(password) => {
  const salt = await  bcrypt.genSalt();
  return  await bcrypt.hash(password,salt);
}
//Comparar password encriptado
UserSchema.statics.comparePassword = async (password,hash) =>{
   return await bcrypt.compare(password, hash)
}

export default model('User',UserSchema);

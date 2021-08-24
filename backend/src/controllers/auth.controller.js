import 'dotenv/config';
import User from '../models/User.model.js';
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY || "secretKey";

let signup = async(req,res) => {
  try {
    //Obtener Datos del Body
    let {username,email,password} = req.body;
    //Instanciar un nuevo Usuario
    let newUser = new User({username,email,password: await User.encryptPassword(password)});
    //Guardar Usuario
    await newUser.save();
    //Crear Token
    const token = jwt.sign({
      _id:newUser._id,
      username: newUser.username,
      email:newUser.email},
      secret,
      {expiresIn: 60
      });
      res.status(200).json({token});
    } catch (error) {
      res.status(500).json({error:error.message});
    }
  };

  let signin = async(req,res) => {
    try {
      //Obtener Datos del Body
      const {email,password} = req.body;
      //Buscar Usuario por email
      const user = await User.findOne({email:email});
      if(user){
        //Comparar Contraseña
        const passwordMatch = await User.comparePassword(password,user.password);
        if(passwordMatch){
          //Crear Token
          const token = jwt.sign({
            _id:user._id,
            username: user.username,
            email:user.email},
            secret,
            {expiresIn: 60
            });
            res.status(200).json({token});
          }else{
            //Contraseña incorrecta
            res.status(403).json({message:"Contraseña incorrecta."})
          }
        }else{
          //Si no existe usuario
          res.status(404).json({message:"Usuario no encontrado."});
        }
      } catch (error) {
        res.status(500).json({message:error.message});
      }
    }


    const AuthController = {signup, signin};
    export default AuthController;

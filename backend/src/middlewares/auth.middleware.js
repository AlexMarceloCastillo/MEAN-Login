import User from '../models/User.model.js';

const middleware = {};

middleware.existUser = async(req, res, next) => {
  try {
    //Obtener Datos del Body
    let {email,username} = req.body;
    //Buscar por Email
    const userEmail = await User.findOne({email: email});
    if(userEmail)return res.status(400).json({field:"email",message:"El email ya esta en uso"});
    //Buscar por Nombre de Usuario
    const userName = await User.findOne({username:username});
    if(userName) return res.status(400).json({field:"username",message:"El nombre de usuario ya esta en uso"});

    next();
  } catch (error) {
    res.status(500).json({error:error.message});
  }
}
export default middleware;

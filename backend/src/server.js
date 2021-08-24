import Express  from "express";
import Cors from "cors";

import AuthRoute from "./routes/auth.routes.js";


const server = Express();

//Middlewares

//Permitir Solo peticiones de la URL DE ANGULAR
const corsOpt = {
    origin: ['http://localhost:4200'],
    optionsSuccessStatus: 200
}
server.use(Cors(corsOpt));
server.use(Express.json());
server.use(Express.urlencoded({extended:false}));

//Settings
server.set('port', process.env.PORT || 2021);

//Routes
server.use('/api',AuthRoute);

export default server;

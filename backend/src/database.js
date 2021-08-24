import mongoose from "mongoose"

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/login-mean-jwt"

mongoose.connect(URI,{
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=> console.log("Conectado a la base de datos"))
.catch((err) => console.log("Error: ", err))

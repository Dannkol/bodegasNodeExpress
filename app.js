import dotenv  from "dotenv"
import express from "express"

//Modulos propios
import configureApp from "./src/config/express.js";
import routes from './src/routes.js';

dotenv.config()

const app = express();

// Configurar la aplicación Express
configureApp(app);


// Definir las rutas
app.use(routes);

// Variables de entorno
const PORT = process.env.PORT || 8080;



//Get all employees from the database


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })
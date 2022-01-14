import express from "express";
import cors from "cors";
// modulos locales
import { Route } from "./router"

// variables auxiliares
const PORT = process.env.PORT || 3000;
// const HOST = '127.0.0.1';

// iniciando la app de express
const app = express();

// habilitar cors
app.use(cors())

// habilitar json en body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// habilitar las rutas
app.use('/api/v1', Route);
// app.use('/api/v2', Route2);


// levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor levantado en http://127.0.0.1:${PORT}`);
})

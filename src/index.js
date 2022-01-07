import express from "express";
// modulos locales
import { Route } from "./router"

// variables auxiliares
const PORT = process.env.PORT || 3000;
// const HOST = '127.0.0.1';

// iniciando la app de express
const app = express();

// habilitar las rutas
app.use('/api/v1', Route);
// app.use('/api/v2', Route2);


// levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor levantado en http://127.0.0.1:${PORT}`);
})

import { Router } from "express"
/*
import { authController } from "./../controllers/auth.controller"
import { userController } from "./../controllers/user.controller"
// const authCont = new AuthController;
import { auth } from "./../middlewares/auth.middleware"
import * as categoriaController from "./../controllers/categoria.controller"
import { productoController } from "../controllers/producto.controller"
import multer from 'multer'

// config multer (para imagenes o archivos)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
*/
export const Route = Router();

// endpoint
Route.get('/', function(req, res){
    res.json({
        mensaje: "Hola Mundo API",
        error: false
    });
});
/*
// auth
Route.post('/auth/login', authController.login)
Route.post('/auth/register', authController.register)

Route.get('/usuario', auth, userController.lista);

// rutas categoria
Route.get('/categoria', auth, categoriaController.listar);
Route.post('/categoria', auth, categoriaController.guardar);
Route.get('/categoria/:id', auth, categoriaController.mostrar);
Route.put('/categoria/:id', auth, categoriaController.modificar);
Route.delete('/categoria/:id', auth, categoriaController.eliminar);

// rutas producto
Route.get('/producto', auth, productoController.listaPaginacion)
Route.post('/producto', auth, upload.single("imagen"), productoController.guardar)
Route.get('/producto/:id', auth, productoController.mostrar)
*/
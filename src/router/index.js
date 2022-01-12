import { Router } from "express"
import { authController } from "./../controllers/auth.controller"
import { userController } from "./../controllers/user.controller"
// const authCont = new AuthController;
import { auth } from "./../middlewares/auth.middleware"

export const Route = Router();

// endpoint
Route.get('/', function(req, res){
    res.json({
        mensaje: "Hola Mundo API",
        error: false
    });
});

// auth
Route.post('/auth/login', authController.login)
Route.post('/auth/register', authController.register)

Route.get('/usuario', auth, userController.lista);

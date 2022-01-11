import { Router } from "express"
import { authController } from "./../controllers/auth.controller"

// const authCont = new AuthController;

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

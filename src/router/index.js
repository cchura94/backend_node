import { Router } from "express"
import AuthController from "./../controllers/auth.controller"

export const Route = Router();

// endpoint
Route.get('/', function(req, res){
    res.json({
        mensaje: "Hola Mundo API",
        error: false
    });
});

// auth
Route.get('/auth/login', AuthController.login)

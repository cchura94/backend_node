import models from "./../models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_EXPIRACION, JWT_SECRET } from "./../config/config"

class AuthController {

    async login (req, res) {
        
        const { email, password } = req.body

        let user = await models.User.findOne({
            where: {
                email: email
            },
        })
        
        if(!user){
            return res.status(200).send({
                mensaje: "El correo es incorrecto",
                error: true
            })
        }

        // verificar la contraseña
        let correcto = await bcrypt.compare(password, user.password);
        if(correcto){
            // generamos el token
            let payload = {
                email: user.email,
                id: user.id,
                time: new Date()
            }
            let token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: JWT_EXPIRACION
            });

            res.status(200).send({
                access_token: token,
                error: false
            })
        }else{
            return res.status(200).send({mensaje: "Contraseña Incorrecta"});
        }

    }

    async register(req, res){
        console.log(req.body)
        let user = await models.User.findOne({
            where: {
                email: req.body.email
            },
        });

        if(!user){
            req.body.password = await bcrypt.hash(req.body.password, 12)
            console.log(req.body)
            await models.User.create(req.body);
            res.status(200).send({mensaje: "Usuario Registrado"})
        }else{
            res.status(200).send({mensaje: "El correo ya está registrado"})
        }
    }
    
}

export const authController = new AuthController;
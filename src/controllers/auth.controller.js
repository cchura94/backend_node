import models from "./../models"
import bcrypt from "bcrypt"

class AuthController {

    async login (req, res) {
        console.log(req.body)
        let user = await models.User.findOne({
            where: {
                email: req.body.email
            },
        })
        
        if(!user){
            return res.status(200).send({
                mensaje: "El correo es incorrecto",
                error: true
            })
        }

        // verificar la contraseña
        let correcto = await bcrypt.compare(req.body.password, user.password);
        if(correcto){
            res.status(200).send({
                mensaje: 'Autenticado',
                data: user,
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
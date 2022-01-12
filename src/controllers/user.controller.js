class UserController {
    lista(req, res){
        res.send({mensaje: "Listado de Usuarios"})
    }

}

export const userController = new UserController;
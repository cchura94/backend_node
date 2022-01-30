"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

class UserController {
  lista(req, res) {
    res.send({
      mensaje: "Listado de Usuarios"
    });
  }

}

const userController = new UserController();
exports.userController = userController;
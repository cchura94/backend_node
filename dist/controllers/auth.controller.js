"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _models = _interopRequireDefault(require("../models"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("./../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  async login(req, res) {
    const {
      email,
      password
    } = req.body;
    let user = await _models.default.User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(200).send({
        mensaje: "El correo es incorrecto",
        error: true
      });
    } // verificar la contraseña


    let correcto = await _bcrypt.default.compare(password, user.password);

    if (correcto) {
      // generamos el token
      let payload = {
        email: user.email,
        id: user.id,
        time: new Date()
      };

      let token = _jsonwebtoken.default.sign(payload, _config.JWT_SECRET, {
        expiresIn: _config.JWT_EXPIRACION
      });

      res.status(200).send({
        access_token: token,
        error: false
      });
    } else {
      return res.status(200).send({
        mensaje: "Contraseña Incorrecta",
        error: true
      });
    }
  }

  async register(req, res) {
    console.log(req.body);
    let user = await _models.default.User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      req.body.password = await _bcrypt.default.hash(req.body.password, 12);
      console.log(req.body);
      await _models.default.User.create(req.body);
      res.status(200).send({
        mensaje: "Usuario Registrado"
      });
    } else {
      res.status(200).send({
        mensaje: "El correo ya está registrado"
      });
    }
  }

}

const authController = new AuthController();
exports.authController = authController;
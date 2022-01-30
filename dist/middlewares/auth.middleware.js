"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("./../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = function (req, res, next) {
  let token = null;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1]; // token = req.headers['x-access-token'] || req.headers['authorization']
    // token = token.split(" ")[1];
  }

  if (!token) {
    return res.status(403).send({
      auth: false,
      mensaje: "No se proporcionó el token de seguridad"
    });
  }

  _jsonwebtoken.default.verify(token, _config.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        auth: false,
        mensaje: "Error de Autenticación"
      });
    } // correcto


    next();
  });
};

exports.auth = auth;
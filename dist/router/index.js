"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = void 0;

var _express = require("express");

var _auth = require("./../controllers/auth.controller");

var _user = require("./../controllers/user.controller");

var _auth2 = require("./../middlewares/auth.middleware");

var categoriaController = _interopRequireWildcard(require("./../controllers/categoria.controller"));

var _producto = require("../controllers/producto.controller");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// const authCont = new AuthController;
// config multer (para imagenes o archivos)
const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = (0, _multer.default)({
  storage: storage
});
const Route = (0, _express.Router)(); // endpoint

exports.Route = Route;
Route.get('/', function (req, res) {
  res.json({
    mensaje: "Hola Mundo API",
    error: false
  });
}); // auth

Route.post('/auth/login', _auth.authController.login);
Route.post('/auth/register', _auth.authController.register);
Route.get('/usuario', _auth2.auth, _user.userController.lista); // rutas categoria

Route.get('/categoria', _auth2.auth, categoriaController.listar);
Route.post('/categoria', _auth2.auth, categoriaController.guardar);
Route.get('/categoria/:id', _auth2.auth, categoriaController.mostrar);
Route.put('/categoria/:id', _auth2.auth, categoriaController.modificar);
Route.delete('/categoria/:id', _auth2.auth, categoriaController.eliminar); // rutas producto

Route.get('/producto', _auth2.auth, _producto.productoController.listaPaginacion);
Route.post('/producto', _auth2.auth, upload.single("imagen"), _producto.productoController.guardar);
Route.get('/producto/:id', _auth2.auth, _producto.productoController.mostrar);
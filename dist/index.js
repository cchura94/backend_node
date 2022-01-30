"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _router = require("./router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// modulos locales
// variables auxiliares
const PORT = process.env.PORT || 3000; // const HOST = '127.0.0.1';
// iniciando la app de express

const app = (0, _express.default)(); // habilitar cors

app.use((0, _cors.default)()); // carga de archivos estaticos

app.use(_express.default.static('public')); // habilitar json en body

app.use(_express.default.json()); // for parsing application/json

app.use(_express.default.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
// habilitar las rutas

app.use('/api/v1', _router.Route); // app.use('/api/v2', Route2);
// levantar el servidor

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://127.0.0.1:${PORT}`);
});
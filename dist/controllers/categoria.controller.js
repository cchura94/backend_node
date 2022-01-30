"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modificar = exports.listar = exports.guardar = exports.eliminar = void 0;
exports.mostrar = mostrar;

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// funcion flecha
const listar = async (req, res) => {
  try {
    const lista_categorias = await _models.default.Categoria.findAll();
    res.status(200).send(lista_categorias);
  } catch (error) {
    res.status(500).send({
      mensaje: "ocurrió un problema al recuperar la información",
      error: error,
      status: 500
    });
  }
}; // funcion anonima


exports.listar = listar;

const guardar = async function (req, res) {
  try {
    const datos = req.body; // validar

    if (datos.nombre != "") {
      // guardar
      await _models.default.Categoria.create(datos);
      res.status(201).send({
        mensaje: "Categoria registrado",
        error: false,
        status: 201
      });
    } else {
      res.status(422).send({
        mensaje: "El nombre es obligatorio",
        error: true,
        status: 422
      });
    }
  } catch (error) {
    res.status(500).send({
      mensaje: "ocurrió un problema al guardar la información",
      error: error,
      status: 500
    });
  }
}; // funcion simple


exports.guardar = guardar;

async function mostrar(req, res) {
  let id = req.params.id;
  const categoria = await _models.default.Categoria.findByPk(id);

  if (categoria) {
    res.status(200).send(categoria);
  } else {
    res.status(404).send({
      mensaje: "categoria no encontrada",
      error: true,
      status: 404
    });
  }
}

const modificar = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    if (datos.nombre != "") {
      // guardar
      await _models.default.Categoria.update(datos, {
        where: {
          id: id
        }
      });
      res.status(200).send({
        mensaje: "Producto Modificado",
        error: false,
        status: 200
      });
    } else {
      res.status(422).send({
        mensaje: "El nombre es obligatorio",
        error: true,
        status: 422
      });
    }
  } catch (error) {
    res.status(500).send({
      mensaje: "ocurrió un problema al modificar la información",
      error: error,
      status: 500
    });
  }
};

exports.modificar = modificar;

const eliminar = async (req, res) => {
  const id = req.params.id;
  await _models.default.Categoria.destroy({
    where: {
      id: id
    }
  });
  res.status(200).send({
    mensaje: "Producto Eliminado",
    error: false,
    status: 200
  });
};

exports.eliminar = eliminar;
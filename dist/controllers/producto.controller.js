"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productoController = void 0;

var _models = _interopRequireDefault(require("./../models"));

var _sequelize = _interopRequireWildcard(require("sequelize"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models.Sequelize.Op
class ProductoController {
  /**
   * http://127.0.0.1:3000/api/v1/producto?page=2&limit=10
   * paginación
   */
  async listaPaginacion(req, res) {
    try {
      // paginación
      let page = req.query.page;
      let limit = req.query.limit;
      let offset = 0 + (page - 1) * limit;
      let lista_productos = await _models.default.producto.findAndCountAll({
        limit: limit,
        offset: offset
      });
      res.status(200).send(lista_productos);
    } catch (error) {
      res.status(500).send({
        mensaje: "Problemas al recuperar la informacion",
        error: error,
        status: 500
      });
    }
  }

  async guardar(req, res) {
    try {
      const datos = req.body; // validar
      // guardar

      await _models.default.producto.create(datos);
      res.status(201).send({
        mensaje: "Producto registrado",
        error: false,
        status: 201
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "ocurrió un problema al guardar la información",
        error: error,
        status: 500
      });
    }
  }

  async mostrar(req, res) {
    let id = req.params.id;
    /*
    const datos = await models.Producto.findAll({
        where: {
            id:{
                [Op.eq]: id
            }
        }
    })
    */

    try {
      //const [results] = await models.sequelize.query('SELECT * FROM categorias');
      const [results] = await _models.default.sequelize.query("select * from productos where id=:id", {
        replacements: {
          id: id
        },
        type: _sequelize.QueryTypes.SELECT
      });
      res.send(results);
    } catch (e) {
      res.send({
        error: e
      });
    }
  }

}

const productoController = new ProductoController();
exports.productoController = productoController;
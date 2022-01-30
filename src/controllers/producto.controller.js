
import models from "../models"
// models.Sequelize.Op
import { Op } from "sequelize"
import sequelize,{QueryTypes} from "sequelize"
class ProductoController {

    /**
     * http://127.0.0.1:3000/api/v1/producto?page=2&limit=10
     * paginación
     */
    async listaPaginacion(req, res){
        try{
            // paginación
            let page = req.query.page;
            let limit = req.query.limit;
            let offset = 0 + (page-1)*limit

            let lista_productos = await models.producto.findAndCountAll({
                limit: limit,
                offset: offset
            });

            res.status(200).send(lista_productos);

        }catch(error){
            res.status(500).send({
                mensaje: "Problemas al recuperar la informacion",
                error: error,
                status: 500
            });
        }
    }


    async guardar(req, res){
        try{
            const datos = req.body;
            // validar
                // guardar
                await models.producto.create(datos);
                res.status(201).send({
                    mensaje: "Producto registrado",
                    error: false,
                    status: 201 
                })
        }catch(error){
            res.status(500).send({
                mensaje: "ocurrió un problema al guardar la información",
                error: error,
                status: 500
            })
        }
    }
    async mostrar(req, res){
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
       try{
        //const [results] = await models.sequelize.query('SELECT * FROM categorias');
        const [results] = await models.sequelize.query("select * from productos where id=:id", {
            replacements: { id: id },
            type: QueryTypes.SELECT
        });
        
           
           res.send(results);
       }catch(e){
            res.send({error: e})
       }
    }


}

export const productoController = new ProductoController;
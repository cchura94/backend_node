import models from "./../models"

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

            let lista_productos = await models.Producto.findAndCountAll({
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
                await models.Producto.create(datos);
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


}

export const productoController = new ProductoController;
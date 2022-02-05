import PDFDocument from "pdfkit"
import models from "./../models"

function generarCabecera(doc) {
    doc.image('public/logo.png', 20, 20, {width: 250})
    .fillColor('#000')
    .fontSize(20)
    .text('EMPRESA', 250, 30, {align: 'right'})
    .fontSize(10)
    .text('Gestión: 2021', {align: 'right'})
    .text('Reporte #: 20', {align: 'right'})

}

export const generarPdfListaProductos = async function(req, res){
    const doc = new PDFDocument({bufferPages: true});
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            // 'Content-disposition': 'attachment;filename=productos.pdf'

        }).end(pdfData);
    })
    // doc.font('Times-Roman').fontSize(12).text('Hola Mundo');
    
    // generar cabecera
    generarCabecera(doc)
    // salto de linea
    doc.moveDown()

    const TableTop = 150;
    // lista de productos
    doc.fontSize(11)
        .text('ID', 20, TableTop)
        .text('NOMBRE', 50, TableTop, {bold: true})
        .text('PRECIO', 250, TableTop)
        .text('CANTIDAD', 350, TableTop)
        .text('ESTADO', 470, TableTop)
    
        // consulta a la bd
        const productos = await models.producto.findAll();

        for (let i = 0; i < productos.length; i++) {
            const prod = productos[i];
            const y = TableTop + 25 + (i*25)

            doc.fontSize(11)
                .text(prod.id, 20, y)
                .text(prod.nombre, 50, y)
                .text(`Bs. ${prod.precio}`, 250, y)
                .text(prod.stock, 350, y)
                .text((prod.activo)?prod.activo:'INACTIVO', 470, y) 
            doc.moveTo(20, (y+25) - 60 * 0.5)
                .lineTo(20 + 550, (y+25) - 60 * 0.5)
                .lineWidth(2)
                .stroke();     
            
               
        }

    doc.end();
}


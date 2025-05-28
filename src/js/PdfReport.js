const { jsPDF } = window.jspdf;

import DataManager from "./DataManager.js";

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btnPdfReport').addEventListener('click', async () => {
        try {
            const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdkx3qcYXGrHcb4LySPAcNMiBM-z6n_DulyM6xYF1BDzNrieOEdlaIERii_7Yvj3b9WhQ&usqp=CAU";
            const datosImagen = await cargarImagen(url);
            console.log(datosImagen);

            const doc = new jsPDF({
                orientation: 'portrait',
                format: 'letter',
                unit: 'mm'
            });

            encabezado(doc, datosImagen);

            //conectar con localStorage
            const objDataM = new DataManager("productos");
            const articulos = objDataM.readData();
            console.log(articulos);

            //console.log(articulos);

            const cuerpoTabla = articulos.map(articulos => [
                articulos.nombre,
                articulos.marca,
                articulos.descripcion,
                articulos.precio,
                articulos.cantidad,
                articulos.textura,
                articulos.tipoVenta,
                articulos.categoria
            ]);
            //aquí se configura el encabezado de la tabla (color), color de letra etc
            const optionTable = {
                startY: 40,
                theme: 'grid',
                headStyles: {
                    fillColor: [250, 219, 216],
                    textColor: 80,
                    fontSize: 12,
                    font: 'times',//letra
                    fontStyle: 'bold',//letra en negrita
                    halign: 'center',//alineación
                },
                //cuerpo de la tabla
                bodyStyles: {
                    textColor: 50,
                    fontSize: 8,
                    font: 'times'
                }
            };

            doc.autoTable({
                head: [['ID', 'MARCA', 'DESCRIPCIÓN', 'PRECIO', 'CANTIDAD', 'TEXTURA', 'TIPOVENTA', 'CATEGORÍA']],
                body: cuerpoTabla,
                ...optionTable,
                didParseCell: function (data) {
                    if (data.section !== "head" && data.column.index === 3) {
                        const precio = parseFloat(data.cell.raw);
                        if (!isNaN(precio)) {
                            data.cell.text = "$" + precio.toFixed(2);

                        }

                    }
                }
            });

            const categoryCounts = {};
            for (const articulo of articulos) {
                if (categoryCounts.hasOwnProperty(articulo.categoria)) {
                    categoryCounts[articulo.categoria]++;
                } else {
                    categoryCounts[articulo.categoria] = 1;
                }
            }

            doc.addPage();
            encabezado(doc, datosImagen);

            const chartPosx = 10;
            const chartPosy = 200;
            const charWidth = 180;
            const maxBarHeight = 100;
            const barSpacing = 5;

            graficaBarras(doc, categoryCounts, chartPosx, chartPosy, charWidth, maxBarHeight, barSpacing);

            const pageCount = doc.getNumberOfPages();

            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(`${i}-${pageCount}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10, {
                    align: 'right'
                });
            }


            doc.save("Reporte.pdf");//Titulo para nuestro documento pdf

        } catch (error) {
            console.log("Error" + error);
        }
    });
});

function cargarImagen(urlImagen) {
    return new Promise(function (resolve, reject) {
        let img = new Image(); //se crea un objeto tipo img
        img.crossOrigin = "anonymus";

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const contexto = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            contexto.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/JPG');
            resolve(dataURL);
        }

        img.onerror = function () {
            reject(new Error('Faltó la carga de la Imágen'));
        }

        img.src = urlImagen;
    });
}

function encabezado(doc, datosImagen) {
    doc.setFont("times", "bold"); //Esto define el tipo de letra (bold=negrita)
    doc.setFontSize(20);
    doc.setTextColor(187, 143, 206);
    doc.text(['Reporte de Skincare'], doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
    doc.addImage(datosImagen, 'JPEG', 10, 10, 30, 30);

}

function graficaBarras(doc, categoryCounts, chartPosx, chartPosy, charWidth, maxBarHeight, barSpacing) {
    const categoryColors = {
        limpiadores: [251, 209, 220],
        tonicos: [250, 229, 211],
        sueros: [214, 234, 248],
        cremasHidratantes: [243, 209, 251],
        mascarillas: [232, 218, 239]
    };

    const anchoBarra = (charWidth - (barSpacing * (Object.keys(categoryCounts).length - 1))) / Object.keys(categoryCounts).length;

    //esto es para que nos muestre (a quien le va a dar) la gráfica más alta
    let maxCount = 0;
    for (const category in categoryCounts) {
        if (categoryCounts[category] > maxCount) {
            maxCount = categoryCounts[category];

        }
    }

    let barraActual = chartPosx;
    //--------------------------
    /*for (const categoria in categoryCounts) {
         //determinar la altura de la barra
         const barHeigth = (categoryCounts[categoria] / maxCount) * maxBarHeight;
         const colorBarra = categoryColors[categoria];
         doc.setFillColor(colorBarra[0], colorBarra[1], colorBarra[2]);
 
         doc.rect(barraActual, chartPosy, anchoBarra, -barHeigth, "F");
         doc.setTextColor(0);
         doc.setFontSize(12);
         doc.text(barraActual + (anchoBarra / 2) - 5, chartPosy + 5,
             String(categoryCounts[categoria]));
 
         doc.setFont("times", "bold");
         doc.setFontSize(10);
         doc.text(barraActual + (anchoBarra / 2) - 5, chartPosy + 10, categoria, {
             maxWidth: anchoBarra,
             align: "center"
         });
 
         barraActual += anchoBarra + barSpacing;
     }*/
    for (const categoria in categoryCounts) {
        const barHeigth = (categoryCounts[categoria] / maxCount) * maxBarHeight;
        const key = normalizarClaveCategoria(categoria);
        const colorBarra = categoryColors[key] || [200, 200, 200]; // fallback por si no hay color definido
        doc.setFillColor(colorBarra[0], colorBarra[1], colorBarra[2]);

        doc.rect(barraActual, chartPosy, anchoBarra, -barHeigth, "F");

        doc.setTextColor(0);
        doc.setFontSize(12);
        doc.text(String(categoryCounts[categoria]), barraActual + (anchoBarra / 2), chartPosy + 5, { align: "center" });

        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.text(categoria, barraActual + (anchoBarra / 2), chartPosy + 15, {
            maxWidth: anchoBarra,
            align: "center"
        });

        function normalizarClaveCategoria(texto) {
            return texto
                .toLowerCase()
                .normalize("NFD") // elimina acentos
                .replace(/[\u0300-\u036f]/g, "") // elimina los diacríticos
                .replace(/\s+/g, ''); // elimina espacios
        }

        barraActual += anchoBarra + barSpacing;
    }
}
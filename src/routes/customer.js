
const express = require('express');
//--aqui van todas las url que la aplicacion del servidor pueda manejar

const router = express.Router();//metodo de expres,debuelve un objeto de JS(java script), se puede agregan rutas para reutilizarlas
//se almacena todo el codigo modulo llamado router

// 1--importando metodo list, aqui se colocan las rutas del servidor, esta funcion se encargara de hacer algo
const customerController = require('../controller/customerControler');


router.get('/', customerController.list);
//esto sera reemplazaro el  .list (la funcion) de archivo customerControler
//cuando reciba la ruta inicial(al servidor), lo va a manejar una funcion 

router.post('/add', customerController.save);
//router escucha a travez del metodo post, la ruta  llamada "add".
//           RUTA  +  FUNCION
//se encarga de recibir datos.

router.get('/delete/:Id_alt', customerController.delete);
//cuando te pidan atraves del metodo get un '/delete' vas a ejecuTAR la funcion "customerController.delete"
//al concatenar se le conoce como parametro de la ruta

router.get('/update/:Id_alt', customerController.edit);

router.post('/update/:Id_alt', customerController.update);
//en '/update/:Id_alt' la seccion "/:Id_alt" se le conoce como parametro de la ruta.


router.get('/turno', customerController.lista);


    /*document.getElementById("Save").submit();*/
router.post('/addTno', customerController.saveTno);
//router.post('/turno/:Id_tno', customerController.update);


module.exports = router;//se exporta 
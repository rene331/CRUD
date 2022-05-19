
const express = require('express');
const router = express.Router();//metodo de expres
//--aqui van todas las url que la aplicacion del servidor pueda manejar
// 1--importando metodo list, aqui se colocan las rutas del servidor
const customerController = require('../controller/customerControler');


router.get('/', customerController.list);
//cuando reciba la ruta inicial(el servidor), lo va a manejar una funcion 

router.post('/add',customerController.save);
//router escucha a travez del metodo post, la ruta nueva llamada "add" y cuando lo escuches
//se encarga de recibir datos
router.get('/delete/:Id_alt',customerController.delete);
//cuando pidan un '/delete'
//al concatenar se le conoce como parametro de la ruta

router.get('/update/:Id_alt', customerController.edit);
router.post('/update/:Id_alt', customerController.update);



module.exports = router;
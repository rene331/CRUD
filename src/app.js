
const express = require ('express');
const path = require ('path');// el modulo path se encarga de unir directorios
const morgan = require('morgan');
const mysql = require ('mysql')
const myConnection = require ('express-myconnection');//myConnection atravez del middleware esta poblando al 
//objeto req un  metod nuevo llamado "req.getConnection" en customerControler

const app = express();//inicializacion de express

//-------importando rutas
const customerRoutes = require('./routes/customer');


//-------setting
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
//app.set('views',path.join (__dirname, 'views'));//modulo path de los siguientes directorios, 'dirnamen'da la ruta
												//de quien lo ejecuta y despues lo concatena con el 'views'

//middleware (son funciones que se ejecutan antes que lleguen las peticiones de los usuarios)
app.use(morgan('dev'));
app.use(myConnection(mysql,{
	host:		'localhost',
	user:		'bdtecuser',
	password:	'123tecMM456',
	PORT:		3000,
	database:	'prestamo'
},'single'));

/*es mejor que se configure el servidor en esta seccion, la razon es que  cada vez que se envian datos 
el servidor sera el encargado de revisarlos y convertirlos*/

app.use(express.urlencoded({extended : false}));
/*desde el modulo de expres requerimos un metodo que nos va permitir enterdertodos los datos que llegan del formulario.
extended estara en false por que no enviara imagenes, ni datos codificados solo los datos del formulario*/

//-----routers

app.use('/', customerRoutes);
//--aplicacion usa('cada vez que alguien este en la raiz', ejecuta lo siguiente rutas)

//-----static files

app.use(express.static(path.join(__dirname,'public')));
//--son archivos complementos(imagenes, framework)

//----inicializando el servidor
app.listen (app.get('port'), () => {  //inicializar el server
	console.log('server on port 3000');//mensaje en consola
}); 

const controller={};//objeto

controller.list = (req, res) => {//metodo
    //se llama lista por que se hara una consulta a la base de datos de mysql
    req.getConnection((err, conn) =>{//getConnection pedira una conexion a mysql y al hacer eso pueden pasar 2 cosas
   //tener un error o tener la conexion, si tengo un error o la conexion aqui lo procesamos (CALL BACK)           
        conn.query('SELECT * FROM alt_clien', (err, alt_clien) =>{
         //--al tener la conexion se puede hacer una consulta, al hacer esto se puede tener un error o 
            //filas de la tabla(rows).            
             if (err){//se puede tratar el error "si hay un error responde al navegador con un 
                res.json(err);//json y muestrame el error"
            }
           // console.log(alt_clien);//para ver el contenido de la base de datos en consola
            res.render('alt_clien', {//manda al navegador una vista
            data: alt_clien //se pasan a la vista los datos de la  tabla

           });
        });
    });
};



controller.save = (req, res) =>{//funcion de express
    /*console.log(req.body);//aqui se van a estar recibiendo los datos del formulario que vienen del metodo "urlencoded"
    res.send('work')*/ /*para comprobar que le estan llegando los datos, respondemos con un mensaje
    cunado reciba un dato desde una propiedad de req llamada body*/
    const data = req.body;    
    req.getConnection ( (err, conn)=>{
        conn.query('INSERT INTO alt_clien set ?', [data], (err, alt_clien) => {
        /*una forma segura para ingresar datos es utiliza el '?',luego se espesifica por medio de un arreglo
        que dato va ahi, en "data" estan los datos,  el primer [data] hace referencia la primero '?'
        si se tuvieran mas signo seria necesario poner mas [data].
        (err, alt_clien)--> se puede tener un error o se puede tener los datos de "alt_clien"*/     
            //console.log (alt_clien); --> para ver los datos en la consola de "alt_clien"
            //res.send('works') --> envia un mensaje en el navegador, si se ejecuta correctamente. 
        res.redirect('/');//redirecciona a la ruta incial del servido y refresca los campos de formulario
        });
    })
}

controller.edit = (req, res) => {
    const id = req.params.Id_alt ;    
    req.getConnection((err, conn) => {        
        conn.query('SELECT * FROM alt_clien WHERE Id_alt = ?',[id], (err, alt_clien )=> {  
            //console.log(alt_clien);                    
            res.render('clien_update', {
                data: alt_clien [0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id = req.params.Id_alt ; 
    const nCustomer = req.body ;
    req.getConnection((err, conn) => {
        conn.query ( 'UPDATE alt_clien set ? WHERE Id_alt = ?', [nCustomer, id], (err, alt_clien) =>{
            console.log(alt_clien);
            res.redirect('/');
        });
    }); 
};

controller.delete = (req, res) =>{/*para eliminar un dato de la base de datos ya no se pide el dato id del "req.body", por que esta enviando
un parametro atraves de un url*/
    const id = req.params.Id_alt;/*con 'req.params'obtenemos el objetos pero si le agregamos 'Id_alt' (quedando "req.params.Id_alt")
    obtenemos el valor*/
    req.getConnection((err, conn )=>{
        conn.query ( 'DELETE FROM alt_clien WHERE Id_alt = ? ',[id],(err, rows) => {
        res.redirect('/');
        });
    })
};


controller.lista = (req, res) => {//metodo
        req.getConnection((err, conn) =>{          
        conn.query('SELECT * FROM c_tno', (err, c_tno) =>{              
            if (err){//se puede tratar el error "si hay un error responde al navegador con un 
                res.json(err);//json y muestrame el error"
            }
            //console.log(c_tno);//para ver el contenido de la base de datos en consola
           res.render('CTurno', {//manda al navegador una vista
            data1: c_tno //se pasan a la vista los datos de la  tabla
            
            });
        });
    });
};

controller.saveTno = (req, res) =>{
    const data1 = req.body;    
    req.getConnection ( (err, conn)=>{
        conn.query('INSERT INTO c_tno set ?', [data1], (err, c_tno) => {           
        res.redirect('/turno');//redirecciona a la ruta incial del servido y refresca los campos de formulario
        });
    })

}



//tendra una funcion
module.exports = controller;
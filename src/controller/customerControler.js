
const controller={};//objeto

controller.list = (req, res) => {//metodo
    //se llama lista por que se hara una consulta a la base de datos de mysql
    //
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
            data: alt_clien
           });
        });
    });
};



controller.save = (req, res) =>{
    /*console.log(req.body);
    res.send('work')*/ /*para comprobar que le estan llegando los datos al servidor
    cunado reciba un dato desde una propiedad de req llamada body*/
    const data = req.body;
    req.getConnection ( (err, conn)=>{
        conn.query('INSERT INTO alt_clien set ?', [data], (err, alt_clien) => {
        /*una forma segura para ingresar datos es utiliza el '?',luego se espesifica por medio de un arreglo
        que dato va ahi */
        /*console.log(alt_clien);
        res.send ('work')*/
        res.redirect('/');//redirecciona a la ruta incial del servido y resetea los campos de formulario
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

controller.turno = (req, res) => {
    const id = req.params.Id_tno ; 
    const nturno = req.body ;
    req.getConnection((err, conn) => {
        conn.query ( 'UPDATE c_tno set ? WHERE Id_tno = ?', [nturno, id], (err, c_tno) =>{
            console.log(c_tno);
            res.redirect('/');
        });
    }); 
};


controller.delete = (req, res) =>{
    const id = req.params.Id_alt ;
    req.getConnection((err, conn )=>{
        conn.query ( 'DELETE FROM alt_clien WHERE Id_alt = ? ',[id],(err, rows) => {
        res.redirect('/');
        });
    })
};


//tendra una funcion
module.exports = controller;
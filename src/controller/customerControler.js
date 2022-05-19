
const controller={};//objeto

controller.list = (req, res) => {//metodo
    //--este es el encargado de pedir una conexion a mysql y al hacer eso pueden pasar 2 cosas
    //tener un error o tener la conexion
    req.getConnection((err, conn) =>{//getConnection pedira una conexion a mysql
 //si tengo un error o la conexion aqui lo procesamos (CALL BACK)
           
        conn.query('SELECT * FROM alt_clien', (err, alt_clien) =>{
         //--al pedir la consulta a puedo tener un error o la conexion
            //filas de la tabla
             if (err){
                res.json(err);
            }
           // console.log(alt_clien);//para ver el contenido de la base de datos en consola
            res.render('alt_clien', {
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
} ;

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
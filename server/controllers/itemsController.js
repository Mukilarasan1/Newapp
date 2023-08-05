const mysql=require("mysql");

const con=mysql.createPool({
    connectionLimit:10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

exports.view=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                
                res.render("home",{rows});
            }
            else{
                console.log("Error in listing Data"+err);
            }
        });
    });
    
};

exports.additem=(req,res)=>{
    res.render("additem");
}

exports.save=(req,res)=>{
    
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,description}=req.body;
        connection.query("insert into users (NAME1,DESCRIPTION1) values(?,?)",[name,description],(err,rows)=>{
            connection.release();
            if(!err){
                
                res.render("additem",{msg:"user details added success"});
            }
            else{
                console.log("Error in listing Data"+err);
            }
        });
    });
    
}
exports.updateitem=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id=req.params.id
        connection.query("select * from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                
                res.render("updateitem",{rows});
            }
            else{
                console.log("Error in listing Data"+err);
            }
        });
    });
    
}


exports.update=(req,res)=>{
    
    con.getConnection((err,connection)=>{
        if(err) throw err;
        const {name,description}=req.body;
        let id=req.params.id;
        connection.query("UPDATE users SET NAME1=?, DESCRIPTION1=? WHERE ID=?" ,[name,description,id],(err,rows)=>{
            connection.release();
            if(!err){
                
                res.render("updateitem",{msg:"user details updated success"});
            }
            else{
                console.log("Error in listing Data"+err);
            }
        });
    });
    
};

exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id=req.params.id;
        connection.query("delete from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
        }else{
            console.log(err);
        }
        });
    });
};





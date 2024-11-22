const mysql = require("mysql2");

const conn = mysql.createConnection({
    host : 'localhost',
    database : 'contact_book',
    user: 'root',
    password: "T#9758@qlph",
});


conn.connect((err)=>{
    if(err) throw err;
    console.log("DB connected");
});


module.exports = conn;
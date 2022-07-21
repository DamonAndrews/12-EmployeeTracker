const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Arizona31!',
      database: 'badguycorp_db'
    }  );

    db.connect(function(err){
        if(err) throw err;
    });

    module.exports = db;
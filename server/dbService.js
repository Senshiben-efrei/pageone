const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('db ' + db.state);
});

class dbService{
    static logText(){
        return('i have been called')
    }

    static insertAccount(firstName ,lastName , email, password){
        var postQuery = "INSERT INTO users (first_name, last_name, email, password) VALUES ?";
        var values=[[firstName ,lastName , email, password]]
        db.query(postQuery, [values], function(error, result){
            if(!!error) {
                console.log(error.sqlMessage.substring(0,9));
                if(error.sqlMessage.substring(0,9) == 'Duplicate'){
                    console.log("returned Duplicate error")
                    return('Duplicate');
                }

            }else{
                console.log('successful post')
            }
        });
    }
}

module.exports = dbService;
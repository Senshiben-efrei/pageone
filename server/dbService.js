const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

dbConnection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('db ' + dbConnection.state);
});

class dbService{
    static getDbServiceInstance() {
        return instance ? instance : new dbService();
    }

    async insertAccount(firstName ,lastName , email, password){
        try{
            await new Promise(function(resolve, reject){
                const postQuery = "INSERT INTO users (first_name, last_name, email, password) VALUES ?";
                const values=[[firstName ,lastName , email, password]]
                dbConnection.query(postQuery, [values], function(error, result){
                    if(error) {
                        console.log(error.sqlMessage.substring(0,9));
                        reject(new Error(error.message));
                    }
                    resolve(result)
                });
            });
            return {
                email: email
            };
        }
        catch (error){
            console.log('returning after error')
            return {
                err: error.message.substring(0,6),
            };
        }

    }
}

module.exports = dbService;
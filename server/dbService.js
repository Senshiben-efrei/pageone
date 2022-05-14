const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
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
    console.log('data base \x1b[32m' + dbConnection.state + '\x1b[0m');
});

class dbService{
    static getDbServiceInstance() {
        return instance ? instance : new dbService();
    }

    async insertAccount(firstName ,lastName , email, password){
        try{
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(password)
            await new Promise(function(resolve, reject){
                const postQuery = "INSERT INTO users (first_name, last_name, email, password) VALUES ?";
                const values=[[firstName ,lastName , email, hashedPassword]]
                dbConnection.query(postQuery, [values], function(error, result){
                    if(error) {
                        console.log(error.sqlMessage);
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

    async getUsers(){
        try {
            const response = await new Promise((resolve, reject) => {
                const getquery = "SELECT * FROM users;";

                dbConnection.query(getquery, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getBooks(){
        try {
            const response = await new Promise((resolve, reject) => {
                const getquery = "SELECT * FROM books;";

                dbConnection.query(getquery, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async editBook(id, name, price, stars, supply){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = " UPDATE books SET name = ?, price = ?, book_depository_stars = ?, supply = ? WHERE book_id = ?";
                const values=[name, price, stars, supply, id]
                console.log(values)
                dbConnection.query(query, values , (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result)
                })
            })
            console.log('Edited Rows ' + response.affectedRows);
            console.log('\x1b[36medited \x1b[0m' + id)
            return response.affectedRows;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteBook(bookId){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM books WHERE book_id = ?";
    
                dbConnection.query(query, [bookId] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            console.log('Deleted Rows ' + response.affectedRows);
            console.log('\x1b[31mdeleted \x1b[0m' + bookId)
            return response.affectedRows;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async addBook(name, price, stars, supply, author, image, category){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = " INSERT INTO books (name, price, book_depository_stars, supply, author, image, category) VALUES ?";
                const values=[[name, price, stars, supply, author, image, category]]
                console.log(values)
                dbConnection.query(query, [values] , (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result)
                })
            })
            console.log('Edited Rows ' + response.affectedRows);
            console.log('\x1b[36madded \x1b[0m' + name)
            return response.affectedRows;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const searched = '%' + name + '%'
                const query = "SELECT * FROM books WHERE name LIKE ?;"

                dbConnection.query(query, [searched], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = dbService;
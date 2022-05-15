const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const router = express.Router()
const dbService = require('./dbService');
const bcrypt = require('bcrypt');


router.use(express.urlencoded({ extended: false }));
var cors = require('cors');
router.use(cors()); 
router.use(express.json())

router.use(
    session({
        name: 'SESSION_ID',      // cookie name stored in the web browser
        secret: 'my_secret',     // helps to protect session
        cookie: {
            maxAge: 30 * (24 * 60 * 60 * 1000)
        },
        resave: true,
        saveUninitialized: true
    })
);


console.log('\x1b[33mApi loaded\x1b[0m')

var users = []
const db = dbService.getDbServiceInstance();
const result = db.getUsers();
result
.then(data => users = data)
.catch(err => console.log('getting users' + err))

//login account
router.post('/SignIn', async (req, res) => {
    const user = users.find(user => user.email === req.body.logAttempt.email)
    if (user == null) {
        return res.json({result : 'Utilisateur introuvable'})
    }
    try {
        if(await bcrypt.compare(req.body.logAttempt.password, user.password)) {
            console.log(user.first_name + ' logged in')
            res.json({result: 'Bienvenu ' + user.first_name, user: user})
        } else {
            res.json({result : 'Mot de pass inccorect'})
        }
    } catch {
        res.status(500).send('error')
    }
})

//create account
router.post('/post', (req, res) => {
    console.log("\x1b[33mpost request\x1b[0m");
    const db = dbService.getDbServiceInstance();
    const result = db.insertAccount(req.body.newAccount.firstName ,req.body.newAccount.lastName , req.body.newAccount.email, req.body.newAccount.password)
    result
    .then(data => {
        res.json({ data: data })
        const result2 = db.getUsers();
        result2
        .then(data => users = data)
        .catch(err => console.log('getting users' + err))
    })
    .catch(err => console.log(err));
    

});

//request homepage
router.get('/', (req, res) => {
    console.log("\x1b[33mMain page request\x1b[0m");
    res.redirect('http://localhost:8080/')
});

//request book list
router.get('/books', (req, res) => {
    console.log('\x1b[33mBook catalog reqest\x1b[0m')
    const db = dbService.getDbServiceInstance();
    const result = db.getBooks();
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
});

//request book edit
router.patch('/books/:id', (req, res) => {
    console.log('\x1b[33mEdit request \x1b[0m' + req.body.newData.book_id)
    const db = dbService.getDbServiceInstance();
    const result = db.editBook(req.body.newData.book_id, req.body.newData.nameEdit, req.body.newData.priceEdit, req.body.newData.starsEdit, req.body.newData.supplyEdit);
    result
    .then(data => res.json({edited_rows : data}))
    .catch(err => console.log(err));
})

//request book delete
router.delete('/books/:id', (req, res) => {
    console.log('\x1b[33mDelete request \x1b[0m' + req.params.id)
    const db = dbService.getDbServiceInstance();
    const result = db.deleteBook(req.params.id);
    result
    .then(data => res.json({deleted_rows : data}))
    .catch(err => console.log(err));

})

//request book post
router.post('/books', (req, res) => {
    console.log("\x1b[33mAdd request\x1b[0m");
    const db = dbService.getDbServiceInstance();
    const result = db.addBook(req.body.newBook.nameEdit, req.body.newBook.priceEdit, req.body.newBook.starsEdit, req.body.newBook.supplyEdit, req.body.newBook.authorEdit, req.body.newBook.thumbnailEdit, req.body.newBook.categoryEdit);
    result
    .then(data => res.json({added_rows : data}))
    .catch(err => console.log(err));

});

//reqest book search
router.get('/books/:name', (req, res) => {
    console.log('\x1b[33mSearch reqest\x1b[0m')
    const db = dbService.getDbServiceInstance();
    const result = db.searchByName(req.params.name);
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})


module.exports = router;
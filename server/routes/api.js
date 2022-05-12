const express = require('express');
const router = express.Router()

const dbService = require('../dbService');

console.log('\x1b[33mApi loaded\x1b[0m')
//create
router.post('/post', (req, res) => {
    console.log("\x1b[33mpost request\x1b[0m");
    const db = dbService.getDbServiceInstance();
    const result = db.insertAccount(req.body.newAccount.firstName ,req.body.newAccount.lastName , req.body.newAccount.email, req.body.newAccount.password)
    result
    .then(data => res.json({ data: data}))
    .catch(err => console.log(err));

});
//request homepage
router.get('/', (req, res) => {
    console.log("\x1b[33mMain page request\x1b[0m");
    res.redirect('http://192.168.1.74:8080/')
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
router.post('/booksis', (req, res) => {
    console.log("\x1b[33mAdd request\x1b[0m");
    const db = dbService.getDbServiceInstance();
    const result = db.addBook(req.body.newBook.nameEdit, req.body.newBook.priceEdit, req.body.newBook.starsEdit, req.body.newBook.supplyEdit, req.body.newBook.authorEdit, req.body.newBook.thumbnailEdit, req.body.newBook.categoryEdit);
    result
    .then(data => res.json({added_rows : data}))
    .catch(err => console.log(err));

});


module.exports = router;
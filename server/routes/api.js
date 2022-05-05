const express = require('express');
const router = express.Router()

const dbService = require('../dbService');

console.log('api loaded')
//create
router.post('/post', (req, res) => {
    console.log("post request");
    //console.log(req.body)
    const db = dbService.getDbServiceInstance();
    const result = db.insertAccount(req.body.newAccount.firstName ,req.body.newAccount.lastName , req.body.newAccount.email, req.body.newAccount.password)
    result
    .then(data => res.json({ data: data}))
    .catch(err => console.log(err));

});
//request
router.get('/get', (req, res) => {
    console.log("get request");
    res.json({
        success: true
    });
});

module.exports = router;
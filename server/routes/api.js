const express = require('express');
const router = express.Router()

const dbService = require('../dbService');

console.log('api loaded')
//create
router.post('/post', (req, res) => {
    console.log("post request");
    //console.log(req.body)
     (dbService.insertAccount(req.body.newAccount.firstName ,req.body.newAccount.lastName , req.body.newAccount.email, req.body.newAccount.password))
    res.json({
        success: true
    });
});
//request
router.get('/get', (req, res) => {
    console.log("get request");
    res.json({
        success: true
    });
});

module.exports = router;
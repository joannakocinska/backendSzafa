var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Zautoryzowano poprawnie');
});

module.exports = router;

var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.status(200).send('Połączono z API');
});
router.get('/contact', function(req, res, next) {
  res.status(200);
});
//router.get('/szafa', function(req, res, next) {
 // res.status(200);
//});
// router.get('/users', function(req, res, next) {
//   res.status(200);
// });

module.exports = router;

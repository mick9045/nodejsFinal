var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/catalog', function(req, res, next) {
	res.render('catalog');
});

router.get('/addProduct', function(req, res, next) {
	res.render('addProduct');
});

router.get('/cart', function(req, res, next) {
	res.render('cart');
});


module.exports = router;

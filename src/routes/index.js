var express = require('express');
var router : express$Router = express.Router();

/* GET home page. */
router.get('/', function(req : express$Request, res : express$Responce, next: express$NextFunction) {
  res.render('index', { title: 'Express' });
});

router.get('/catalog', function(req : express$Request, res : express$Responce, next: express$NextFunction) {
	res.render('catalog');
});

router.get('/addProduct', function(req : express$Request, res : express$Responce, next: express$NextFunction) {
	res.render('addProduct');
});

router.get('/cart', function(req : express$Request, res : express$Responce, next: express$NextFunction) {
	res.render('cart');
});

router.get('/edit/:id', function(req : express$Request, res : express$Responce, next: express$NextFunction) {
	res.render('addProduct', {
		productId: req.params.id
	});
});


module.exports = router;

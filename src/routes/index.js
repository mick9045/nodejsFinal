var express = require('express');
var router : express$Router = express.Router();

/* GET home page. */
router.get('/', function(req : express$Request, res : express$Responce, next: express$NextFunction) {
  res.render('index', { title: 'Express' });
});

router.get('/catalog', function(req : express$Request, res : express$Responce, next: express$NextFunction) {
	res.render('catalog');
});


module.exports = router;

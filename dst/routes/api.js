var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path');
var router = express.Router();
var coinfig = require('../../appConfig.json');

const getDb = require('../database/db').getDb;
var db = getDb('store');
var products = db.collection("products");
var carts = db.collection("carts");

/* GET home page. */
router.get('/', function(req, res, next) {
	
});

router.route('/goods')
	.get(function(req, res, next) {

	})

router.route('/authenticate')
	.get(async function(req, res, next) {
		let insertionResult = await carts.insertOne({
			products: []
		});
		if (insertionResult)
		{
			let insertedId = insertionResult.indertedId;
			const payload = {
				cart: insertedId
			}
			let token = await jwt.sign(payload, coinfig.jwt.secret, {
					expiresIn: '30m' //24h
				});
			res.json({
				success: true,
				message: 'Enjoy your token',
				token: token
			});
		}
		//let token = jwt.
	})

router.route('/products')
	.post(async function(req, res, next) {
		let image = req.files.image;
		let imagePath = 'public/images/' + image.name;
		console.log(imagePath);
		image.mv(imagePath, function(err) {
			console.log("can't move image: " + err);
		});
		let product = await products.insertOne({
			name: req.body.name,
			price: req.body.price,
			defenition: req.body.defenition,
			image: imagePath
		});
		res.json({

		});
	})

module.exports = router;

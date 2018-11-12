var express = require('express');
var jwt = require('jsonwebtoken');
var uniqueFileName = require('unique-filename');
var router = express.Router();
var path = require('path');
var config = require('../../appConfig.json');
var ObjectId = require('mongodb').ObjectID;

const getDb = require('../database/db').getDb;
var db = getDb('store');
var products = db.collection("products");
var carts = db.collection("carts");

// route middleware to verify a token
router.use(function(req, res, next) {
	if (req.url == '/authenticate') {
		console.log(req.url)
		next();
	}
	else {
	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];
	  // decode token
	  if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, config.jwt.secret, function(err, decoded) {
	    	if (err) {
	    		console.log(err);
		        return res.json({ success: false, message: 'Failed to authenticate token.' });
		    } else {
		        req.decoded = decoded;
		        next();
		    }
	    });

	  } else {
	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });

	  }
	}
});

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
			let insertedId = insertionResult.insertedId;
			const payload = {
				cart: insertedId
			}
			let token = await jwt.sign(payload, config.jwt.secret);
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
		if (req.body.name && req.body.price && req.body.defenition && req.files.image)
		{
			let image = req.files.image;
			let imagePath = 'images/' + uniqueFileName('') + path.extname(image.name);
			image.mv('public/' + imagePath, function(err) {
				console.log("can't move image: " + err);
			});
			let product = await products.insertOne({
				name: req.body.name,
				price: req.body.price,
				defenition: req.body.defenition,
				image: imagePath
			});
			res.json({
				success: true
			});
		}
		else {
			res.json({
				success: false,
				message: "invalid data"
			});
		}
	})
	.get(async function(req, res, next) {
		res.json(await products.find({}).toArray());
	})

router.route('/cart')
	.get(async function(req, res, next) {
		var cart = await carts.findOne({"_id": new ObjectId(req.decoded.cart)});
		/*
		var cartProducts = await products.find({
			"_id": { 
				$in: cart.products
			}
		});
		*/
		if (cart.products.length == 0)
		{
			res.json('');
		}
		else
		{
			try
			{
			var cart = await carts.aggregate([
					{$unwind: "$products"},
					{
						$lookup: {
							from: "products",
							localField: "products",
							foreignField: "_id",
							as: "productObjects"
						}
					},
					{$unwind: "$productObjects"},
					{
						"$group": {
							_id: "$_id",
							"products": { $push: "$products" },
							"productObjects": { $push: "$productObjects"}
						}
					}
				]).toArray();
				res.json(cart[0].productObjects);
			}
			catch (e) {
				res.json({success: "false"});
			}
		}
	})
	.post(async function(req, res, next) {
		console.log(req.body);
		if (req.body.productId) {
			var cart = await carts.findOne({"_id": new ObjectId(req.decoded.cart)});

			await carts.updateOne(
				{ "_id": new ObjectId(req.decoded.cart) },
				{ $push: { products: new ObjectId(req.body.productId) }
			});

			res.json({
				success: true
			});
		} else {
			res.json({
				success: false
			});
		}
	})

router.route('/cart/:id')
	.delete(async function(req, res, next) {
		let cart = await carts.findOne(
			{_id: new ObjectId(req.decoded.cart)}
		);
		var index = cart.products.findIndex(function(element) {
			return element == req.params.id
		});
		cart.products.splice(index, 1);
		await carts.updateOne(
			{_id: new ObjectId(req.decoded.cart)},
			{
				$set: {
					products: cart.products
				}
			}
		);
		/*
		var index = cart.products.findIndex(functtion(element) {
		})
		let result = await carts.updateOne(
			{_id: new ObjectId(req.decoded.cart)},
			{
				$pull: {
					products: new ObjectId(req.params.id)
				}
			},
			{multi: false})
		*/
		res.json({success: true})
	})

router.route('/route/:id')
	.delete(async function(req, res, next) {
		try
		{
			await carts.remove(
				{_id: new ObjectId(req.decoded.cart)}
			);
			res.json({success: true});
		} catch (e) {
			res.json({success: false});
		}
	})


module.exports = router;

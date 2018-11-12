var OptsMixin = {
			// init method is a special one which can initialize
			// the mixin when it's loaded to the tag and is not
			// accessible from the tag its mixed in
			// `opts` here is the option object received by the tag as well
			init: function(opts) {
				this.on('updated', function() { console.log('Updated!') })
			},

			getOpts: function() {
				return this.opts;
			},

			setOpts: function(opts) {
			    this.opts = opts;
			    this.update();
			    return this;
			}
		}

riot.tag2('product', '<div class="card shadow-lg"> <img class="card-img-top" riot-src="{opts.image}" alt="Card Image"> <div class="card-body"> <div class="row"> <div class="btn-group shadow mx-auto" style="text-align: center" role="group" aria-label="Basic example"> <button class="btn btn-primary" onclick="{buy}">Buy</button> <button class="btn btn-warning">Edit</button> <button class="btn btn-danger" onclick="{delete}">Delete</button> </div> </div> <h4 class="card-title">{opts.name}</h4> <p class="card-text">{opts.defenition}</p> <h1 style="font-size: 2rem" class="badge badge-warning">{\'$ \' + opts.price}</h1> </div> </div>', '', 'class="col-sm-6 col-lg-4 col-12 my-2"', function(opts) {
		this.mixin(OptsMixin);
		var self = this;

		this.buy = function(e) {
			auth.getToken(function(result) {
				$.ajax({
	                method: "POST",
	                url: 'api/cart',
	                data: {
	                	productId: self.opts._id
	                },
	                headers: {
	                    'x-access-token' : result.token
	                }
	            })
			})
		}

		this.delete = function(e) {
			auth.getToken(function(result) {
				$.ajax(
				{
					method: "DELETE",
					url: 'api/products/' + e.item._id,
					headers: {
	                    'x-access-token' : result.token
	                }
	            }).done(function(result) {
					var index = self.parent.products.findIndex(function (element) {
						return element._id = e.item_id;
					})
					self.parent.products.splice(index, 1);
					self.parent.update();
				});
			})
		}
});

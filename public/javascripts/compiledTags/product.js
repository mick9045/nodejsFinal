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

riot.tag2('product', '<div class="card" style="width: 400px"> <img class="card-img-top" riot-src="{opts.image}" alt="Card Image"> <div class="card-body"> <h4 class="card-title">{opts.name}</h4> <p class="card-text">{opts.defenition}</p> <h1 class="badge badge-warning">{opt.price}</h1> <button class="btn btn-primary">Buy</button> </div> </div>', '', '', function(opts) {
		this.mixin(OptsMixin);
});

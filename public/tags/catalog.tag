<catalog class='container'>
	<div class='row'>
		<virtual each={ products }>
			<product name={ name } price={ price } defenition={ defenition } image={ image } _id={_id}/>
		</virtual>
	</div>
	<script>
		this.products = [];
		var self = this;
		var token;

		auth.getToken(function (result) {
			token = result.token;
			console.log(result);
			console.log("token" + result.token);
			$.ajax({
                method: "GET",
                url: 'api/products',
                dataType: 'json',
                headers: {
				    'x-access-token' : token
				}
            }).done(function(data) {
				self.products = data;
				self.update();
            })
            /*.fail(function(err) {
            	alert("can't load catalog")
            })
            */
		});

		
	</script>
</catalog>
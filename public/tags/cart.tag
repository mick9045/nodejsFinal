<cart class="container">
	<table class="table">
		<thead>
			<tr>
				<td>Name</td>
				<td>Price</td>
				<td>Defenition</td>
				<td>Action</td>
			</tr>
		</thead>
		<tbody>
			<tr each={products}>
				<td>{ name }</td>
				<td>{ price }</td>
				<td>{ defenition}</td>
				<td><input class="btn btn-danger" type="button" value="remove" onclick="{ remove }"></td>
			</tr>
		</tbody>
	</table>
	<script>
		var self = this;
		this.products = [];
		var token;

		auth.getToken(function (result) {
			token = result.token;
			$.ajax({
                method: "GET",
                url: 'api/cart',
                dataType: 'json',
                headers: {
				    'x-access-token' : token
				}
            }).done(function(data) {
            	self.products = data;
            	console.log(data);
				self.update();
            })
		});

		this.remove = function(e) {
			$.ajax({
                method: "Delete",
                url: 'api/cart/' + e.item._id,
                dataType: 'json',
                headers: {
				    'x-access-token' : token
				}
            }).done(function(data) {
				var index = self.products.indexOf(e.item);
				if (index > -1) {
				  self.products.splice(index, 1);
				}	
				self.update();
            })
			
		}
		
	</script>
</cart>
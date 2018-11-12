<editProduct>
    <div class="form-group px-4 py-4">
        <form onsubmit="{ commit }">
            <h3 class="mx-auto">Product</h6>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Name</span>
                </div>
                <input type="text" class="form-control mr-2" placeholder="product name" ref='name' id="name" name="productName" value={ name }>
                <div class="input-group-prepend">
                    <span class="input-group-text">Price</span>
                </div>
                <input value={ price } type="number" class="form-control" placeholder="0" id="price" ref='price' name="productPrice">
            </div>
            <div class="form-group">
                <label for='customFile'>Image:</label>
                <div class="custom-file mb-3">
                    <input type="file" class="custom-file-input" id="customFile" accept=".jpg, .jpeg, .png" ref='image' name="productImage">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
            </div>
            <div class="form-group">
              <label for="comment">Defenition:</label>
              <textarea value={ defenition } class="form-control" rows="5" id="comment" ref='defenition' name="productDefenition"></textarea>
            </div>
            <input value="Send" class="btn btn-primary" type="submit" name="submitButton">
        </form>
    </div>
    <script>
        this.name = '';
        this.defenition = '';
        this.price = 0;
        this.image = '';

        var token;
        var self = this;


        auth.getToken(function (result) {
            token = result.token;
            if (opts.product_id) {
                $.ajax({
                method: "GET",
                url: '/api/products/' + opts.product_id,
                contentType: 'json',
                headers: {
                    'x-access-token' : token
                }
                }).done(function (result) {
                    console.log(result);
                    self.name = result.name;
                    self.price = result.price;
                    self.image = result.image;
                    self.defenition = result.defenition;
                    self.update();
                }).fail(function (err) {

                });
            }
        });

        this.commit = function(e) {
            e.preventDefault();
            if (opts.product_id) {
                Put();
            } else {
                Post();
            }
        }

        function Put() {
            var data = new FormData();
            var imageProperty = self.refs.image.files[0];
            console.log(imageProperty || self.image);
            data.append("name", self.refs.name.value);
            data.append("price", self.refs.price.value);
            data.append("defenition", self.refs.defenition.value);
            data.append("image", imageProperty);
            data.append("id", self.opts.product_id);

            $.ajax({
                method: "PUT",
                url: '/api/products',
                data: data,
                contentType: false,
                cache: false,
                processData: false,
                headers: {
                    'x-access-token' : token
                }
            }).done(function (result) {
                if (result.success) {
                    window.location.href = '/catalog';
                }
            }).fail(function (err) {
                alert("failed to update the record");
            });
        }

        function Post() {
            var data = new FormData();
            var imageProperty = self.refs.image.files[0];
            data.append("name", self.refs.name.value);
            data.append("price", self.refs.price.value);
            data.append("defenition", self.refs.defenition.value);
            data.append("image", imageProperty);

            $.ajax({
                method: "POST",
                url: '/api/products',
                data: data,
                contentType: false,
                cache: false,
                processData: false,
                headers: {
                    'x-access-token' : token
                }
            }).done(function (result) {
                if (result.success) {
                    window.location.href = '/catalog';
                }
            }).fail(function (err) {
                alert("failed to load image");
            });
        }
    </script>   
</editProduct>
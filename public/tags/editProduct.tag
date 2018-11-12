<editProduct>
    <div class="form-group px-4 py-4">
        <form onsubmit="{ commit }">
            <h3 class="mx-auto">Product</h6>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Name</span>
                </div>
                <input type="text" class="form-control mr-2" placeholder="product name" ref='name' id="name" name="productName">
                <div class="input-group-prepend">
                    <span class="input-group-text">Price</span>
                </div>
                <input type="number" class="form-control" placeholder="0" id="price" ref='price' name="productPrice">
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
              <textarea class="form-control" rows="5" id="comment" ref='defenition' name="productDefenition"></textarea>
            </div>
            <input value="Send" class="btn btn-primary" type="submit" name="submitButton">
        </form>
    </div>
    <script>
        var token;

        auth.getToken(function (result) {
            token = result.token;
        });

        this.commit = function(e) {
            e.preventDefault();
            var data = new FormData();
            var imageProperty = this.refs.image.files[0];
            data.append("name", this.refs.name.value);
            data.append("price", this.refs.price.value);
            data.append("defenition", this.refs.defenition.value);
            data.append("image", imageProperty);

            $.ajax({
                method: "POST",
                url: 'api/products',
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
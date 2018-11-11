riot.tag2('editproduct', '<div class="form-group px-4 py-4"> <form onsubmit="{function(e) {e.preventDefault()}}"> <h3 class="mx-auto">Product</h6> <div class="input-group mb-3"> <div class="input-group-prepend"> <span class="input-group-text">Name</span> </div> <input type="text" class="form-control mr-2" placeholder="product name" id="name" name="productName"> <div class="input-group-prepend"> <span class="input-group-text">Price</span> </div> <input class="form-control" placeholder="0" id="price" name="productPrice" type="number"> </div> <div class="form-group"> <label for="customFile">Image:</label> <div class="custom-file mb-3"> <input type="file" class="custom-file-input" id="customFile" accept=".jpg, .jpeg, .png" name="productImage"> <label class="custom-file-label" for="customFile">Choose file</label> </div> </div> <div class="form-group"> <label for="comment">Defenition:</label> <textarea class="form-control" rows="5" id="comment" name="productDefenition"></textarea> </div> <input value="Send" class="btn btn-primary" type="submit" name="submitButton"> </form> </div>', '', '', function(opts) {
        function commit(e) {
            e.preventDefault();
            var data = new FormData();

            var imageProperty = this.productImage.files[0];
            data.append("name", this.productName);
            data.append("price", this.prodcutPrice);
            data.append("defenition", this.productDefenition);
            data.append("file", property);

            $.ajax({
                method: "POST",
                url: 'api/products',
                data: data,
                contentType: false,
                cache: false,
                processData: false
            }).done(function (result) {
                alert("ura");
            }).fail(function (err) {
                alert("opyt fail");
            });
        }
});
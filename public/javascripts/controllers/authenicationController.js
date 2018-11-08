function AuthenicationController() {
	this.getToken = function(callbackResult) {
		if (callbackResult)
		{
			var auth = window.localStorage.getItem("auth");

			if (auth === null) {
				RequestAuthenication(function (result) {
					console.log("shit");
					auth = JSON.stringify({
						token: result.token
					});
					window.localStorage.setItem("auth", auth)
					callbackResult(auth);
				}, function (jqXHR, textStatus) {
					alert("failed to connect to database");
					console.log("fail");
				});
			} else {
				auth = JSON.parse(auth);
				callbackResult(auth);
			}
		}
	}

	function RequestAuthenication(callbackResult, error) {
		$.ajax({
			method: "GET",
			url: 'api/authenticate',
			dataType: 'json'
		}).done(callbackResult)
		.fail(error);
	}
}
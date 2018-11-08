$(function () {
	var authController  = new AuthenicationController();
	authController.getToken(function (result) {
		console.log(result.token);
	});
});
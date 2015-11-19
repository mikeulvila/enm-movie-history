define(function(require) {
	var $ = require("jquery");
	var authentication = require("authentication");
	var userLogin = require("existing-user-login");


	$("#register-button").click(function() {

		var userEmail = $("#user-email").val();
		var userPassword = $("#user-password").val();

		authentication.createNewUser(userEmail, userPassword);
	});

	$("#login-button").click(function() {

		var userEmail = $("#user-email").val();
		var userPassword = $("#user-password").val();

		userLogin.logUserIn(userEmail, userPassword);
	});


});
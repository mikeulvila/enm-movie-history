define(function(require) {
	var $ = require("jquery");
	var authentication = require("authentication");
	var userLogin = require("existing-user-login");

	// button to register new user
	$("#register-button").click(function() {
		var userEmail = $("#user-email").val();
		var userPassword = $("#user-password").val();
		authentication.createNewUser(userEmail, userPassword);
		// switching views
		$("#main-page").show();
		$("#login-page").hide();
	});

	// button to login existing user
	$("#login-button").click(function() {
		var userEmail = $("#user-email").val();
		var userPassword = $("#user-password").val();
		userLogin.logUserIn(userEmail, userPassword);
		// switching views
		$("#main-page").show();
		$("#login-page").hide();
	});

});
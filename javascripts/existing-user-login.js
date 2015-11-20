define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");

	var loggedinuser;

	return {
		logUserIn: function(userEmail, userPassword) {
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			loggedinuser = ref;
			ref.authWithPassword({
			  email    : userEmail,
			  password : userPassword
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			    $("#main-page").show();
				$("#login-page").hide();
			  }
			});
		},
		logUserOut: function() {
			console.log("loggedinuser", loggedinuser);
			loggedinuser.unauth();
			if (loggedinuser.getAuth() === null) {
				console.log("logged out");
				$("#main-page").hide();
				$("#login-page").show();

			}
		}
	};
});
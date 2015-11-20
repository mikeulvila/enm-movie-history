define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");


	return {
		logUserIn: function(userEmail, userPassword) {
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			ref.authWithPassword({
			  email    : userEmail,
			  password : userPassword
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
			});
		}
	};
});
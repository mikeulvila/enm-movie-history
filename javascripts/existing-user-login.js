define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");

	// var loggedinuser;
	// var currentUserId;
	return {
		logUserIn: function(userEmail, userPassword) {
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			// loggedinuser = ref;
			ref.authWithPassword({
			  email    : userEmail,
			  password : userPassword
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			    // currentUserId = authData.uid;
			    $("#main-page").show();
				$("#login-page").hide();
			  }
			});
		},
		logUserOut: function() {
			// console.log("loggedinuser", loggedinuser);
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			ref.unauth();
			if (ref.getAuth() === null) {
				console.log("logged out");
				$("#main-page").hide();
				$("#login-page").show();

			}
		},
		getUid: function() {
			var ref = new Firebase("https://movie-history-enm.firebaseio.com/");
			var authData = ref.getAuth();
			var thisUser = authData.uid;
			return thisUser;
		}
	};
});
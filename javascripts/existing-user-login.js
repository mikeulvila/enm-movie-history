define(function(require) {
	var $ = require("jquery");
	var firebase = require("firebase");
	var populateAllPage = require("get-users-movie-collection");
	var getposter = require("get-movie-poster-data");

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
			    currentUserId = authData.uid;
			    $("#main-page").show();
				$("#login-page").hide();
				populateAllPage(currentUserId)
        			.then(function(data) {
          				var allUserMovies = Object.keys( data ).map(function(key) { return data[key];});
          				getposter.requestData(allUserMovies);
        		});

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
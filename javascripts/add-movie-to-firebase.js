define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var firebase = require("firebase");
	var login = require("existing-user-login");


	return {
		pushData: function(addedMovieObj) {
			var userid = login.getUid();
			console.log("userid-----", userid);

			var userEmail = login.getUserEmailAddy();
			console.log("user email", userEmail);

			userEmail = userEmail.replace("@", "_");
			userEmail = userEmail.replace(".", "_");
			console.log("user email replaced", userEmail);

			var movieTitle = addedMovieObj.title;
			movieTitle = movieTitle.replace(/ /g, "");
			console.log("movieTitle", movieTitle);


			var newRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userEmail);
			console.log("newRef", newRef);
			newRef.child(movieTitle).set(addedMovieObj);
		}
	};
});
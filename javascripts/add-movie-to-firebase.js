define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var firebase = require("firebase");
	var login = require("existing-user-login");


	return {
		pushData: function(addedMovieObj) {
			var userid = login.getUid();
			console.log("userid-----", userid);

			var newRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid);
			console.log("newRef", newRef);
			newRef.push(addedMovieObj);
		}
	};
});
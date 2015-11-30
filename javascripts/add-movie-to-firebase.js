define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var firebase = require("firebase");
	var login = require("existing-user-login");


	return {
		pushData: function(userid, movieID, addedMovieObj) {
			//creates new firebase reference then sets new movie object
			var newRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid);
			console.log("newRef", newRef);
			newRef.child(movieID).set(addedMovieObj);
		}
	};
});
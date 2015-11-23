define(function(require) {
	var $ = require("jquery");
	var Q = require("q");
	var firebase = require("firebase");
	var login = require("existing-user-login");


	return {
		searchMyMovies: function(searchValue) {
			var userid = login.getUid();
			console.log("userid-----", userid);
			//updating "collections" in firebase with the movie's imdbID as the key
			var newRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid);
			
			
		}
	};
});
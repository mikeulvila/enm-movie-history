define(function(require) {
	var firebase = require("firebase");

	return function (userid, movieID) {

			var userRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid );
			var movieRef = userRef.child(movieID);
			movieRef.update({
  				"Watched": true
			});
	};//--end return
});//--end define 
define(function(require) {
	var firebase = require("firebase");
	// This module updates the value of Rating key when star rating icon has been changed
	return function (userid, movieID, starValue) {
			var userRef = new Firebase("https://movie-history-enm.firebaseio.com/collections/" + userid );
			var movieRef = userRef.child(movieID);
			movieRef.update({
  				"Rating": starValue
			});
	};//--end return
});//--end define 